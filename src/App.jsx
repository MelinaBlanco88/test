import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SEOHead from './components/SEOHead';
import HomeView from './views/HomeView';
import CatalogView from './views/CatalogView';
import ProductDetailView from './views/ProductDetailView';
import CheckoutView from './views/CheckoutView';
import ProfileView from './views/ProfileView';
import { PRODUCTS } from './data/products';

function AppContent() {
  const [activeView, setActiveView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  const handleNavigate = (view, categoryFilter = null) => {
    setActiveView(view);
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // On mount: detect Stripe redirect params and go to checkout view
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success' || params.get('payment') === 'cancelled') {
      setActiveView('checkout');
    }
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActiveView('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine dynamic SEO Meta values per View
  const getSEOPrompts = () => {
    if (activeView === 'catalog') {
      return {
        title: `Catálogo ${selectedCategory} 2024 | Azteca Football`,
        description: `Explora el catálogo oficial de ${selectedCategory} en Azteca Football. Camisetas con estampado personalizado, tacos de fútbol y accesorios.`,
        product: null
      };
    }
    if (activeView === 'product_detail' && selectedProduct) {
      return {
        title: `${selectedProduct.name} - Estampado Oficial | Azteca Football`,
        description: selectedProduct.description,
        product: selectedProduct
      };
    }
    if (activeView === 'checkout') {
      return {
        title: `Checkout Seguro | Azteca Football Store`,
        description: `Paga de forma 100% segura tus jerseys de la Selección Mexicana con envío express gratis desde $1,500 MXN.`,
        product: null
      };
    }
    if (activeView === 'profile') {
      return {
        title: `Mi Perfil Azteca VIP | Azteca Football`,
        description: `Accede a tus puntos de lealtad Azteca Gold, rastrea el envío de tus pedidos y gestiona tu colección.`,
        product: null
      };
    }
    return {
      title: `Azteca Football | La Nueva Piel de la Selección Mexicana 2024`,
      description: `Tienda oficial de indumentaria deportiva Azteca Football. Compra los jerseys oficiales de la Selección Mexicana 2024 con tecnología HEAT.RDY.`,
      product: null
    };
  };

  const seo = getSEOPrompts();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <SEOHead 
        title={seo.title}
        description={seo.description}
        product={seo.product}
      />

      <div>
        <Navbar 
          activeView={activeView}
          setActiveView={handleNavigate}
          onSelectCategory={(cat) => handleNavigate('catalog', cat)}
        />

        <main>
          {activeView === 'home' && (
            <HomeView 
              onNavigate={handleNavigate}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {activeView === 'catalog' && (
            <CatalogView 
              initialCategory={selectedCategory}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {activeView === 'product_detail' && (
            <ProductDetailView 
              product={selectedProduct}
              onSelectProduct={handleSelectProduct}
              onNavigate={handleNavigate}
            />
          )}

          {activeView === 'checkout' && (
            <CheckoutView 
              onNavigate={handleNavigate}
            />
          )}

          {activeView === 'profile' && (
            <ProfileView 
              onNavigate={handleNavigate}
              onSelectProduct={handleSelectProduct}
            />
          )}
        </main>
      </div>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer onProceedToCheckout={() => handleNavigate('checkout')} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}
