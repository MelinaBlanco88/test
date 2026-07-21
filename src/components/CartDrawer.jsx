import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme, THEMES } from '../context/ThemeContext';
import { X, Trash2, Plus, Minus, ShieldCheck, Truck, Tag, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingCost,
    total,
    totalItemsCount,
    promoCode,
    promoMessage,
    applyPromoCode
  } = useCart();

  const { activeTheme } = useTheme();
  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1500;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const getThemeStyles = () => {
    if (activeTheme === THEMES.OBSIDIAN) {
      return {
        bg: 'bg-[#131313] text-[#e5e2e1] border-l border-[#2a2a2a]',
        headerBg: 'bg-[#0e0e0e] border-b border-[#2a2a2a]',
        buttonPrimary: 'bg-[#e9c349] hover:bg-[#af8d11] text-black font-bold uppercase rounded-none tracking-wider',
        cardBg: 'bg-[#1c1b1b] border border-[#2a2a2a] rounded-none',
        accentText: 'text-[#e9c349]'
      };
    } else if (activeTheme === THEMES.ENERGY) {
      return {
        bg: 'bg-[#fcf9f8] text-[#1c1b1b] border-l border-[#e5e2e1]',
        headerBg: 'bg-[#f0edec] border-b border-[#e5e2e1]',
        buttonPrimary: 'bg-[#ce1126] hover:bg-[#a30019] text-white font-bold rounded-full tracking-wide shadow-lg shadow-red-500/20',
        cardBg: 'bg-white border border-[#e5e2e1] rounded-2xl',
        accentText: 'text-[#ce1126]'
      };
    }
    return {
      bg: 'bg-[#f7faf5] text-[#181d1a] border-l border-[#ebefea]',
      headerBg: 'bg-[#ebefea] border-b border-[#e0e4de]',
      buttonPrimary: 'bg-[#004e34] hover:bg-[#003825] text-white font-bold rounded-xl shadow-md',
      cardBg: 'bg-white border border-[#e0e4de] rounded-xl',
      accentText: 'text-[#004e34]'
    };
  };

  const theme = getThemeStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md ${theme.bg} shadow-2xl flex flex-col`}>
          
          {/* Drawer Header */}
          <div className={`p-6 ${theme.headerBg} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <ShoppingBag className={`w-6 h-6 ${theme.accentText}`} />
              <h2 className="text-lg font-bold tracking-tight uppercase">
                Tu Carrito <span className="text-xs font-normal opacity-70">({totalItemsCount} artículos)</span>
              </h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-black/5 dark:bg-white/5 border-b border-gray-200 dark:border-gray-800">
            {amountToFreeShipping > 0 ? (
              <p className="text-xs font-medium text-center mb-1.5">
                ¡Te faltan <strong className={theme.accentText}>${amountToFreeShipping.toLocaleString('es-MX')} MXN</strong> para <strong>ENVÍO GRATIS</strong>!
              </p>
            ) : (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center mb-1.5 flex items-center justify-center gap-1">
                <Truck className="w-4 h-4" /> ¡Felicidades! Tienes ENVÍO GRATIS asegurado.
              </p>
            )}
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  activeTheme === THEMES.OBSIDIAN ? 'bg-[#e9c349]' :
                  activeTheme === THEMES.ENERGY ? 'bg-[#ce1126]' : 'bg-[#004e34]'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg">Tu carrito está vacío</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explora la nueva piel de la Selección Mexicana y las colecciones Azteca.
                </p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className={`px-6 py-2.5 ${theme.buttonPrimary} text-xs font-bold`}
                >
                  EXPLORAR PRODUCTOS
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartItemId} className={`p-4 ${theme.cardBg} flex gap-4 transition-all duration-200 hover:shadow-sm`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-xs leading-tight line-clamp-2">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Eliminar del carrito"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                        <span className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded font-mono">Talla: {item.size}</span>
                        {item.customName && (
                          <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                            #{item.customNumber} {item.customName}
                          </span>
                        )}
                        {item.patch && item.patch !== 'Ninguno' && (
                          <span className="bg-yellow-50 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded text-[10px]">
                            {item.patch.replace(' (+ $150)', '')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold font-mono">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-extrabold text-sm tracking-tight">
                        ${(item.price * item.quantity).toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Promo Code & Order Summary Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4 bg-black/5 dark:bg-white/5">
              
              {/* Promo Input */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Código de cupón (ej. AZTECA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg uppercase font-mono tracking-wider outline-none focus:ring-2 focus:ring-current"
                    />
                  </div>
                  <button 
                    onClick={() => applyPromoCode(couponInput)}
                    className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Aplicar
                  </button>
                </div>
                {promoMessage.text && (
                  <p className={`text-[11px] font-semibold ${promoMessage.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Descuento ({promoCode})</span>
                    <span>-${discountAmount.toLocaleString('es-MX')} MXN</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-600 dark:text-emerald-400 font-bold">GRATIS</strong> : `$${shippingCost} MXN`}</span>
                </div>
                <div className="pt-2 border-t border-gray-300 dark:border-gray-700 flex justify-between items-center text-base font-extrabold">
                  <span>Total</span>
                  <span className={theme.accentText}>${total.toLocaleString('es-MX')} MXN</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  if (onProceedToCheckout) onProceedToCheckout();
                }}
                className={`w-full py-3.5 px-6 ${theme.buttonPrimary} text-sm flex items-center justify-center gap-2 group transition-all duration-200`}
              >
                <span>PROCEDER AL PAGO</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Pago SSL 256-Bit Encriptado • Devolución Garantizada</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
