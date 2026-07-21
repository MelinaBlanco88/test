import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CMS_STORAGE_KEY = 'azteca_cms_products';

const CMSContext = createContext();

export function CMSProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [isModified, setIsModified] = useState(false);

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const createProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `product-${Date.now()}`,
      rating: productData.rating || 4.5,
      reviewsCount: productData.reviewsCount || 0,
      images: productData.images || [],
      specs: productData.specs || [],
      sizes: productData.sizes || ['S', 'M', 'L', 'XL'],
      inStockSizes: productData.inStockSizes || ['S', 'M', 'L', 'XL'],
    };
    setProducts(prev => [newProduct, ...prev]);
    setIsModified(true);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    setIsModified(true);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setIsModified(true);
  };

  const duplicateProduct = (id) => {
    const source = products.find(p => p.id === id);
    if (!source) return;
    const copy = {
      ...source,
      id: `${source.id}-copy-${Date.now()}`,
      name: `${source.name} (Copia)`,
      tag: 'BORRADOR',
    };
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    setIsModified(true);
    return copy;
  };

  const reorderProducts = (fromIndex, toIndex) => {
    setProducts(prev => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
    setIsModified(true);
  };

  const resetToDefault = () => {
    setProducts(PRODUCTS);
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(PRODUCTS));
    setIsModified(false);
  };

  return (
    <CMSContext.Provider value={{
      products,
      isModified,
      createProduct,
      updateProduct,
      deleteProduct,
      duplicateProduct,
      reorderProducts,
      resetToDefault,
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}
