import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useTheme, THEMES } from '../context/ThemeContext';
import { Filter, Search, ShoppingBag, Star, X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';

export default function CatalogView({ initialCategory, onSelectProduct }) {
  const { addToCart } = useCart();
  const { activeTheme } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Todas');
  const [selectedSize, setSelectedSize] = useState('Todas');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState('popular');
  const [searchFilter, setSearchFilter] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['Todas', 'Selección Mexicana', 'Azteca Energy', 'Obsidian Pitch', 'Rendimiento Athletic', 'Accesorios'];
  const sizes = ['Todas', 'S', 'M', 'L', 'XL', '2XL'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'Todas' && product.category !== selectedCategory) return false;
      // Size filter
      if (selectedSize !== 'Todas' && !product.sizes.includes(selectedSize)) return false;
      // Price filter
      if (product.price > maxPrice) return false;
      // Search filter
      if (searchFilter && !product.name.toLowerCase().includes(searchFilter.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default popular
    });
  }, [selectedCategory, selectedSize, maxPrice, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory('Todas');
    setSelectedSize('Todas');
    setMaxPrice(5000);
    setSearchFilter('');
    setSortBy('popular');
  };

  const getThemeAccents = () => {
    if (activeTheme === THEMES.OBSIDIAN) {
      return {
        activeChip: 'bg-[#e9c349] text-black font-bold rounded-none',
        buttonPrimary: 'bg-[#e9c349] text-black font-bold rounded-none hover:bg-[#af8d11]',
        accentText: 'text-[#e9c349]'
      };
    } else if (activeTheme === THEMES.ENERGY) {
      return {
        activeChip: 'bg-[#ce1126] text-white font-bold rounded-full',
        buttonPrimary: 'bg-[#ce1126] text-white font-bold rounded-full hover:bg-[#a30019]',
        accentText: 'text-[#ce1126]'
      };
    }
    return {
      activeChip: 'bg-[#004e34] text-white font-bold rounded-xl',
      buttonPrimary: 'bg-[#004e34] text-white font-bold rounded-xl hover:bg-[#003825]',
      accentText: 'text-[#004e34]'
    };
  };

  const theme = getThemeAccents();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#004e34] to-[#013220] text-white p-8 lg:p-12 shadow-xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            Catálogo Oficial 2024
          </span>
          <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tight">
            SELECCIÓN MEXICANA & COLECCIONES AZTECA
          </h1>
          <p className="text-xs lg:text-sm opacity-80 leading-relaxed">
            Descubre todos los modelos originales, camisetas de jugador HEAT.RDY, ropa de entrenamiento y calzado Obsidian Pitch Gold.
          </p>
        </div>
      </div>

      {/* Top Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        
        {/* Left: Active Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? theme.activeChip
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right: Search + Sort Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar producto..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 dark:bg-[#201f1f] border border-gray-200 dark:border-gray-700 rounded-xl outline-none"
            />
          </div>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs bg-gray-50 dark:bg-[#201f1f] border border-gray-200 dark:border-gray-700 rounded-xl font-bold outline-none cursor-pointer"
          >
            <option value="popular">Más Populares</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Calificados</option>
          </select>
        </div>

      </div>

      {/* Main Content: Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 font-extrabold uppercase text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros Avanzados</span>
            </div>
            <button 
              onClick={resetFilters} 
              className="text-xs text-red-500 hover:underline font-bold"
            >
              Limpiar
            </button>
          </div>

          {/* Filter 1: Size */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider block">Talla Disponible</label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                    selectedSize === s
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-extrabold'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Max Price */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Precio Máximo</span>
              <span className={theme.accentText}>${maxPrice.toLocaleString('es-MX')} MXN</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="5000" 
              step="250"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Guarantee Box */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-2 text-xs opacity-80">
            <p className="font-bold">✓ Envío Express Gratis desde $1,500 MXN</p>
            <p>✓ Garantía de Autenticidad FMF</p>
            <p>✓ Personalización Oficial</p>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Mostrando {filteredProducts.length} productos</span>
            {(selectedCategory !== 'Todas' || selectedSize !== 'Todas' || maxPrice < 5000) && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Filtros activos:</span>
                <span className="bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded text-[11px]">{selectedCategory}</span>
                {selectedSize !== 'Todas' && <span className="bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded text-[11px]">Talla: {selectedSize}</span>}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4">
              <p className="text-base font-bold">No se encontraron productos con estos filtros</p>
              <button 
                onClick={resetFilters}
                className={`px-6 py-2.5 ${theme.buttonPrimary} text-xs font-bold`}
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div 
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                      {product.tag}
                    </div>

                    {/* Quick Add Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="absolute bottom-3 right-3 p-3 bg-[#004e34] dark:bg-[#e9c349] text-white dark:text-black rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 flex items-center gap-1 text-xs font-bold"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Agregar</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div 
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                        <span>{product.category}</span>
                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-sm group-hover:text-emerald-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 line-through mr-2">${product.originalPrice}</span>
                        <span className={`text-base font-extrabold ${theme.accentText}`}>
                          ${product.price.toLocaleString('es-MX')} MXN
                        </span>
                      </div>

                      <button 
                        onClick={() => onSelectProduct && onSelectProduct(product)}
                        className="text-xs font-bold hover:underline"
                      >
                        Detalles
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
