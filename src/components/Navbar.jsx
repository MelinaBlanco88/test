import React, { useState } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import ThemeSwitcher from './ThemeSwitcher';
import { ShoppingBag, User, Search, Menu, X, Shield, ChevronRight, Sparkles, Flame } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onSelectCategory }) {
  const { activeTheme } = useTheme();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const getBrandColors = () => {
    if (activeTheme === THEMES.OBSIDIAN) {
      return {
        bannerBg: 'bg-[#013220] text-[#e9c349] border-b border-[#e9c349]/30',
        navBg: 'bg-[#131313]/90 text-[#e5e2e1] border-b border-[#2a2a2a] backdrop-blur-xl',
        logoText: 'text-[#e9c349] font-oswald uppercase tracking-widest',
        badgeBg: 'bg-[#e9c349] text-black font-bold',
        activeLink: 'text-[#e9c349] font-bold border-b-2 border-[#e9c349]'
      };
    } else if (activeTheme === THEMES.ENERGY) {
      return {
        bannerBg: 'bg-[#ce1126] text-white shadow-md',
        navBg: 'bg-[#fcf9f8]/90 text-[#1c1b1b] border-b border-[#e5e2e1] backdrop-blur-xl',
        logoText: 'text-[#ce1126] font-inter font-black tracking-tight',
        badgeBg: 'bg-[#ce1126] text-white font-bold',
        activeLink: 'text-[#ce1126] font-black'
      };
    }
    // Classic Azteca
    return {
      bannerBg: 'bg-[#004e34] text-white shadow-sm',
      navBg: 'bg-[#f7faf5]/90 text-[#181d1a] border-b border-[#ebefea] backdrop-blur-xl',
      logoText: 'text-[#004e34] font-montserrat font-black tracking-wide',
      badgeBg: 'bg-[#bb001e] text-white font-bold',
      activeLink: 'text-[#004e34] font-bold border-b-2 border-[#004e34]'
    };
  };

  const colors = getBrandColors();

  const handleNavClick = (view, categoryFilter = null) => {
    setActiveView(view);
    if (categoryFilter && onSelectCategory) {
      onSelectCategory(categoryFilter);
    }
    setMobileMenuOpen(false);
  };

  const trendingSearches = ['Jersey Local 2024', 'Santi Giménez #11', 'Tacos Obsidian Gold', 'Chamarra Anthem'];

  return (
    <header className="sticky top-0 z-40 transition-colors duration-300">
      {/* Top Announcement Bar */}
      <div className={`${colors.bannerBg} text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 tracking-wide`}>
        <Shield className="w-3.5 h-3.5" />
        <span>ENVÍO GRATIS EN COMPRAS MAYORES A $1,500 MXN | CÓDIGO <strong className="underline">AZTECA10</strong> (10% OFF)</span>
      </div>

      {/* Main Navbar */}
      <nav className={`${colors.navBg} transition-colors duration-300 py-3.5 px-4 lg:px-8 shadow-sm`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 shadow-md ${
              activeTheme === THEMES.OBSIDIAN ? 'bg-[#013220] border border-[#e9c349] text-[#e9c349]' :
              activeTheme === THEMES.ENERGY ? 'bg-[#ce1126] text-white shadow-red-500/30' : 'bg-[#004e34] text-white shadow-emerald-900/20'
            }`}>
              <span className="font-extrabold text-2xl font-mono">A</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl lg:text-2xl ${colors.logoText}`}>
                AZTECA <span className="font-light">FOOTBALL</span>
              </span>
              <span className="text-[10px] tracking-widest opacity-7 font-mono -mt-1 uppercase flex items-center gap-1">
                {activeTheme === THEMES.OBSIDIAN ? 'OBSIDIAN PITCH EDITION' :
                 activeTheme === THEMES.ENERGY ? 'AZTECA ENERGY STREETWEAR' : 'PREMIUM STORE'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            <button 
              onClick={() => handleNavClick('home')}
              className={`py-1 transition-colors hover:opacity-80 ${activeView === 'home' ? colors.activeLink : ''}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'Selección Mexicana')}
              className={`py-1 transition-colors hover:opacity-80 flex items-center gap-1 ${activeView === 'catalog' ? colors.activeLink : ''}`}
            >
              <span>Selección Mexicana</span>
              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-mono">2024</span>
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'Azteca Energy')}
              className="py-1 hover:text-[#ce1126] transition-colors"
            >
              Azteca Energy
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'Obsidian Pitch')}
              className="py-1 hover:text-[#e9c349] transition-colors"
            >
              Obsidian Pitch
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'Rendimiento Athletic')}
              className="py-1 hover:opacity-80 transition-colors"
            >
              Performance
            </button>
          </div>

          {/* Controls: Theme Switcher, Search, Profile, Cart */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher Widget */}
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>

            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Buscar productos"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Profile Button */}
            <button 
              onClick={() => handleNavClick('profile')}
              className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                activeView === 'profile' ? 'ring-2 ring-current' : ''
              }`}
              title="Mi Perfil Azteca"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button with Count Badge */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${colors.badgeBg} text-[11px] flex items-center justify-center font-bold animate-pulse shadow-md`}>
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Quick Search Drawer */}
        {searchOpen && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Buscar jerseys, tacos, chaquetas, accesorios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNavClick('catalog');
                    setSearchOpen(false);
                  }
                }}
                className="w-full bg-transparent outline-none text-sm font-medium placeholder-gray-400"
                autoFocus
              />
              <button 
                onClick={() => {
                  if (searchQuery) handleNavClick('catalog');
                  setSearchOpen(false);
                }}
                className="px-4 py-1.5 bg-[#004e34] dark:bg-[#e9c349] text-white dark:text-black rounded-lg text-xs font-bold"
              >
                Buscar
              </button>
              <button onClick={() => setSearchOpen(false)} className="p-1 hover:opacity-70">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Trending Suggestions */}
            <div className="flex items-center gap-2 text-xs opacity-80 pt-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-semibold text-gray-500">Tendencias:</span>
              <div className="flex flex-wrap gap-1.5">
                {trendingSearches.map((term) => (
                  <button 
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleNavClick('catalog');
                      setSearchOpen(false);
                    }}
                    className="px-2 py-0.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[11px] rounded font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#131313] border-b border-gray-200 dark:border-gray-800 px-6 py-6 space-y-4 shadow-2xl">
          <div className="pb-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <span className="text-xs font-bold tracking-widest uppercase opacity-60">Cambiar Edición de Diseño</span>
            <ThemeSwitcher />
          </div>

          <div className="space-y-3 font-semibold uppercase text-sm tracking-wide">
            <button 
              onClick={() => handleNavClick('home')}
              className="w-full flex justify-between items-center py-2 text-left border-b border-gray-100 dark:border-gray-800"
            >
              <span>Inicio</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'Selección Mexicana')}
              className="w-full flex justify-between items-center py-2 text-left border-b border-gray-100 dark:border-gray-800"
            >
              <span>Selección Mexicana 2024</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'Azteca Energy')}
              className="w-full flex justify-between items-center py-2 text-left border-b border-gray-100 dark:border-gray-800"
            >
              <span>Azteca Energy Streetwear</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'Obsidian Pitch')}
              className="w-full flex justify-between items-center py-2 text-left border-b border-gray-100 dark:border-gray-800"
            >
              <span>Obsidian Pitch Gold</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'Rendimiento Athletic')}
              className="w-full flex justify-between items-center py-2 text-left"
            >
              <span>Rendimiento Athletic</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleNavClick('profile')}
              className="w-full flex justify-between items-center py-2 text-left text-emerald-700 dark:text-yellow-400 font-bold"
            >
              <span>Mi Perfil Azteca VIP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
