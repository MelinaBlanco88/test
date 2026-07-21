import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 4242;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// --- Middleware ---
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// --- Stripe Price ID Map ---
// These were created via the Stripe MCP and correspond to all catalog products
const PRICE_MAP = {
  'jersey-local-2024':       'price_1TvebnGyB9LEmtYqoSmJVlaQ',
  'jersey-visitante-2024':   'price_1Tvec6GyB9LEmtYqWVYdBWgu',
  'chamarra-anthem-2024':    'price_1TvecQGyB9LEmtYqWguy4AxJ',
  'tacos-obsidian-pro':      'price_1TvecoGyB9LEmtYqJ8K2gi0o',
  'hoodie-energy-oversized': 'price_1TvecsGyB9LEmtYqMgbje4oi',
  'playera-training-pro':    'price_1TvecxGyB9LEmtYqCj9J5RaN',
  'balon-oficial-world-cup': 'price_1Tved2GyB9LEmtYqiCTodSMQ',
  'mochila-azteca-athletic-35l': 'price_1Tved6GyB9LEmtYqy6ipZx4w',
};

/**
 * POST /api/create-checkout-session
 * Body: {
 *   cartItems: [{ id, name, price, quantity, customName, customNumber, patch, size }],
 *   discountPercent: 0-100,
 *   promoCode: string
 * }
 */
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { cartItems = [], discountPercent = 0, promoCode } = req.body;

    if (!cartItems.length) {
      return res.status(400).json({ error: 'El carrito está vacío.' });
    }

    // Build Stripe line items from cart
    // Items with a known price ID use the catalog price directly;
    // custom items (with name/number/patch fees) are created inline.
    const lineItems = cartItems.map((item) => {
      const stripePriceId = PRICE_MAP[item.id];

      if (stripePriceId && !item.customName && !item.customNumber && item.patch === 'Ninguno') {
        // Standard product - use existing Price ID
        return {
          price: stripePriceId,
          quantity: item.quantity,
        };
      } else {
        // Custom-priced item (personalization / patch fees) — inline price_data
        const unitAmountCents = Math.round(item.price * 100); // item.price is already in MXN
        let description = `Talla: ${item.size}`;
        if (item.customName) description += ` | Estampado: #${item.customNumber} ${item.customName}`;
        if (item.patch && item.patch !== 'Ninguno') description += ` | ${item.patch.replace(' (+ $150)', '')}`;

        return {
          price_data: {
            currency: 'mxn',
            unit_amount: unitAmountCents,
            product_data: {
              name: item.name,
              description: description.trim(),
            },
          },
          quantity: item.quantity,
        };
      }
    });

    // Optional: Create a coupon for discount if promoCode provided
    let discounts = [];
    if (discountPercent > 0 && promoCode) {
      try {
        // Try to find or create the coupon
        const existingCoupons = await stripe.coupons.list({ limit: 20 });
        let coupon = existingCoupons.data.find(c => c.id === promoCode.toUpperCase() || c.name === promoCode.toUpperCase());

        if (!coupon) {
          coupon = await stripe.coupons.create({
            id: promoCode.toUpperCase(),
            percent_off: discountPercent,
            duration: 'once',
            name: `Cupón ${promoCode.toUpperCase()} (${discountPercent}% OFF)`,
          });
        }

        // Create a PromotionCode so it's visible
        const promoCodes = await stripe.promotionCodes.list({ coupon: coupon.id, limit: 1 });
        let promoCodeObj = promoCodes.data[0];
        if (!promoCodeObj) {
          promoCodeObj = await stripe.promotionCodes.create({
            coupon: coupon.id,
            code: promoCode.toUpperCase(),
          });
        }

        discounts = [{ promotion_code: promoCodeObj.id }];
      } catch (couponErr) {
        // Coupon creation is best-effort; fall through without it
        console.warn('Coupon setup warning:', couponErr.message);
      }
    }

    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      currency: 'mxn',
      line_items: lineItems,
      ...(discounts.length > 0 ? { discounts } : { allow_promotion_codes: true }),
      shipping_address_collection: {
        allowed_countries: ['MX', 'US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'mxn' },
            display_name: 'Envío Express Gratis',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 15000, currency: 'mxn' },
            display_name: 'Envío Estándar',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      payment_method_types: ['card'],
      metadata: {
        store: 'azteca-football',
        items_count: cartItems.length.toString(),
      },
      success_url: `${CLIENT_URL}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/?payment=cancelled`,
      locale: 'es-419',
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Stripe Checkout error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/session-status?session_id=xxx
 * Retrieve a Checkout Session status (for success confirmation)
 */
app.get('/api/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id, {
      expand: ['line_items', 'payment_intent'],
    });

    res.json({
      status: session.payment_status,
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true, store: 'Azteca Football Stripe Backend' }));

app.listen(PORT, () => {
  console.log(`\n🟢 Azteca Football Stripe Backend running on http://localhost:${PORT}`);
  console.log(`   Accepting requests from: ${CLIENT_URL}\n`);
});
