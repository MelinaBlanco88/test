import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme, THEMES } from '../context/ThemeContext';
import { Lock, ArrowLeft, Loader2, CheckCircle2, ShoppingBag, AlertCircle } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_STRIPE_BACKEND_URL || 'http://localhost:4242';

export default function CheckoutView({ onNavigate }) {
  const { cartItems, subtotal, discountAmount, shippingCost, total, promoCode, discountPercent, clearCart } = useCart();
  const { activeTheme } = useTheme();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState('');

  // Check for payment success/cancel URL params on mount
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const sessionId = params.get('session_id');

    if (payment === 'success' && sessionId) {
      setPaymentStatus({ state: 'success', sessionId });
      clearCart(); // clear cart after successful Stripe payment
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (payment === 'cancelled') {
      setPaymentStatus({ state: 'cancelled' });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const getThemeAccents = () => {
    if (activeTheme === THEMES.OBSIDIAN) {
      return {
        buttonPrimary: 'bg-[#e9c349] hover:bg-[#af8d11] text-black font-extrabold uppercase tracking-wider rounded-none shadow-lg',
        accentText: 'text-[#e9c349]',
        cardBg: 'bg-[#1c1b1b] border-[#2a2a2a]',
      };
    } else if (activeTheme === THEMES.ENERGY) {
      return {
        buttonPrimary: 'bg-[#ce1126] hover:bg-[#a30019] text-white font-extrabold uppercase rounded-full shadow-lg shadow-red-500/30',
        accentText: 'text-[#ce1126]',
        cardBg: 'bg-white border-[#e5e2e1]',
      };
    }
    return {
      buttonPrimary: 'bg-[#004e34] hover:bg-[#003825] text-white font-extrabold uppercase rounded-xl shadow-lg',
      accentText: 'text-[#004e34]',
      cardBg: 'bg-white border-[#ebefea]',
    };
  };

  const theme = getThemeAccents();

  const handleStripeCheckout = async () => {
    if (!cartItems.length) return;
    setIsRedirecting(true);
    setError('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            customName: item.customName || '',
            customNumber: item.customNumber || '',
            patch: item.patch || 'Ninguno',
          })),
          discountPercent: discountPercent || 0,
          promoCode: promoCode || '',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear la sesión de pago.');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'No se pudo conectar con el servidor de pagos. Verifica que el servidor esté ejecutándose.');
      setIsRedirecting(false);
    }
  };

  // --- Payment Success Screen ---
  if (paymentStatus?.state === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-14 h-14" />
        </div>
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-yellow-400">
            ¡PAGO PROCESADO CON ÉXITO POR STRIPE!
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold uppercase tracking-tight">GRACIAS POR TU COMPRA</h1>
          <p className="text-sm opacity-80 max-w-lg mx-auto">
            Tu pago fue procesado de forma segura a través de Stripe. Recibirás un correo con los detalles de tu pedido y la guía de rastreo en breve.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => onNavigate('profile')}
            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-extrabold rounded-xl"
          >
            VER MI PERFIL Y PEDIDOS
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className={`px-6 py-3 ${theme.buttonPrimary} text-xs font-extrabold`}
          >
            VOLVER A LA TIENDA
          </button>
        </div>
      </div>
    );
  }

  // --- Cancelled Screen ---
  if (paymentStatus?.state === 'cancelled') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-extrabold uppercase">Pago Cancelado</h1>
        <p className="text-sm opacity-80">Cerraste la página de pago. Tus artículos siguen en el carrito.</p>
        <button 
          onClick={() => onNavigate('catalog')}
          className={`px-6 py-3 ${theme.buttonPrimary} text-sm`}
        >
          VOLVER AL CARRITO
        </button>
      </div>
    );
  }

  // --- Main Checkout Summary Screen ---
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => onNavigate('catalog')}
          className="text-xs font-bold flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Seguir comprando
        </button>
        <h1 className="text-xl lg:text-2xl font-extrabold uppercase tracking-tight">RESUMEN Y PAGO</h1>
        <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
          <Lock className="w-4 h-4" />
          SSL Stripe
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Items + Stripe Pay Button */}
        <div className="lg:col-span-2 space-y-6">

          {/* Cart Item Review */}
          <div className={`p-6 ${theme.cardBg} rounded-2xl border space-y-4 shadow-sm`}>
            <h3 className="font-extrabold uppercase text-sm pb-3 border-b border-gray-200 dark:border-gray-800">
              ARTÍCULOS EN TU CARRITO ({cartItems.length})
            </h3>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 text-xs pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold line-clamp-1">{item.name}</h4>
                    <div className="flex flex-wrap gap-2 mt-1 text-[11px]">
                      <span className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded font-mono">Talla: {item.size}</span>
                      <span className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">Cant: {item.quantity}</span>
                      {item.customName && (
                        <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                          #{item.customNumber} {item.customName}
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold block mt-1.5">${(item.price * item.quantity).toLocaleString('es-MX')} MXN</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stripe Trust & Security Banner */}
          <div className="p-5 bg-gradient-to-r from-[#635bff]/10 to-[#635bff]/5 border border-[#635bff]/20 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 60 25" className="h-6 text-[#635bff] fill-[#635bff]" xmlns="http://www.w3.org/2000/svg">
                <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.05-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.87zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.5 0 3 .27 4.45.86v3.85c-1.23-.71-2.78-1.13-4.14-1.13-.46 0-1.3.08-1.3.9 0 1.85 6.29.97 6.29 5.76z"/>
              </svg>
              <div>
                <p className="text-xs font-extrabold">Pago Procesado por Stripe</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Tus datos de tarjeta son cifrados con TLS 1.3 y nunca tocan nuestros servidores.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-[10px] font-bold text-gray-500 dark:text-gray-400 pt-1">
              <div>🔒 Visa / Mastercard</div>
              <div>🔒 American Express</div>
              <div>🔒 Débito Bancario</div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Error al conectar con el servidor de pagos:</strong><br/>
                {error}
                <br/><br/>
                <span className="opacity-80">Asegúrate de que el servidor backend esté corriendo con <code className="bg-black/10 px-1 rounded">cd server && npm run dev</code></span>
              </div>
            </div>
          )}

          {/* Main Stripe Pay Button */}
          <button
            onClick={handleStripeCheckout}
            disabled={isRedirecting || !cartItems.length}
            className={`w-full py-4 px-8 ${theme.buttonPrimary} text-sm font-extrabold flex items-center justify-center gap-3 group transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isRedirecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Redirigiendo a Stripe Checkout…</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>PAGAR AHORA CON STRIPE (${total.toLocaleString('es-MX')} MXN)</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Price Summary */}
        <div className={`p-6 ${theme.cardBg} rounded-2xl border space-y-4 shadow-sm sticky top-24`}>
          <h3 className="font-extrabold uppercase text-sm pb-3 border-b border-gray-200 dark:border-gray-800">
            RESUMEN DEL PEDIDO
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} artículos)</span>
              <span>${subtotal.toLocaleString('es-MX')} MXN</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Descuento ({promoCode})</span>
                <span>-${discountAmount.toLocaleString('es-MX')} MXN</span>
              </div>
            )}

            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Envío</span>
              <span>{shippingCost === 0 
                ? <strong className="text-emerald-600 dark:text-emerald-400">GRATIS</strong> 
                : `$${shippingCost} MXN`}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-base font-black">
              <span>Total</span>
              <span className={theme.accentText}>${total.toLocaleString('es-MX')} MXN</span>
            </div>
          </div>

          <p className="text-[11px] text-center text-gray-400 pt-2">
            Serás redirigido a la página de pago seguro de Stripe. Puedes ingresar código de cupón también allí.
          </p>
        </div>
      </div>
    </div>
  );
}
