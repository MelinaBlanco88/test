import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 'jersey-local-2024',
      cartItemId: 'item-initial-1',
      name: 'Jersey Local Selección Mexicana 2024',
      subtitle: 'Edición Profesional Jugador',
      price: 2699,
      size: 'M',
      color: 'Verde Azteca / Plumaje Canario',
      customName: 'SANTIAGO',
      customNumber: '11',
      patch: 'Patch Oficial FIFA World Cup 2026',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmK7IpHlmNVkSDzR1x8rLCEt6VD5kwABSzmiMjhLSjwR1SEgRDBN1GHS2a9pHwngsvRiPHmMiKAmJvimGLl1av4RL1ebzeHbf8i6paSgHZHh2WgoImCBD-FDsf65-V1ZGAwzaC8GtwakSSKyPGlXMAb0fCnDJGNk1cPvE39nlv3cVPqBvrH96V0HqxapAH278q0HTVbpYHOfaTiz9KWz2P9yGZA3K5HJ8LRi934IaC4t1Sr8f7eP6u'
    },
    {
      id: 'chamarra-anthem-2024',
      cartItemId: 'item-initial-2',
      name: 'Chamarra Anthem Selección Mexicana',
      subtitle: 'Colección Azteca Energy',
      price: 2199,
      size: 'L',
      color: 'Negro Obsidiana',
      customName: '',
      customNumber: '',
      patch: 'Ninguno',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnKOGg05GXI2Y5SsMzFolJjHqYZrANoEiA1EE_oo1xf8qLiXGzuBVrkkSzt5gRKDbkYOInxvrbdZYyqFciXT_7riNH85jQk5F8R47BTfOgnpkh0eFrm4UWhNWq5r5aIP3drlYqsF9tb7gqDbpVKVZHPKKHMjqbGNFku2Etn1nlSI9k5g-Q0vdCJExSM4OlxobcjIuIL9x92tbCCeRZ9Wa8LP7dfZHCEX7ru15ZsWwd-E_sHWwd9_Ie'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ type: '', text: '' });

  const addToCart = (product, options = {}) => {
    const { size = 'M', customName = '', customNumber = '', patch = 'Ninguno', quantity = 1 } = options;
    
    // Add extra price for custom printing if present
    const customFee = (customName || customNumber) ? 250 : 0;
    const patchFee = patch !== 'Ninguno' ? 150 : 0;
    const unitPrice = product.price + customFee + patchFee;

    const cartItemId = `${product.id}-${size}-${customName}-${customNumber}-${patch}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        cartItemId,
        name: product.name,
        subtitle: product.subtitle || product.category || 'Edición Oficial',
        price: unitPrice,
        size,
        color: product.color || 'Verde Azteca',
        customName,
        customNumber,
        patch,
        quantity,
        image: product.image
      }];
    });

    setIsCartOpen(true);
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    setPromoMessage({ type: '', text: '' });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    ));
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    setPromoCode(cleanCode);
    if (cleanCode === 'AZTECA10') {
      setDiscountPercent(10);
      setPromoMessage({ type: 'success', text: '¡Cupón AZTECA10 aplicado! 10% de descuento.' });
    } else if (cleanCode === 'ELITEVIP') {
      setDiscountPercent(15);
      setPromoMessage({ type: 'success', text: '¡Cupón VIP aplicado! 15% de descuento.' });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ type: 'error', text: 'Cupón no válido. Prueba "AZTECA10".' });
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal > 1500 ? 0 : 150;
  }, [subtotal]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost);
  }, [subtotal, discountAmount, shippingCost]);

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountPercent,
    discountAmount,
    shippingCost,
    total,
    totalItemsCount,
    promoCode,
    promoMessage,
    applyPromoCode,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
