import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme, THEMES } from '../context/ThemeContext';
import { PLAYER_PATCHES, PRESET_CUSTOMIZATIONS, PRODUCTS } from '../data/products';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, Check, ChevronRight, Sparkles, Heart } from 'lucide-react';

export default function ProductDetailView({ product = PRODUCTS[0], onSelectProduct, onNavigate }) {
  const { addToCart } = useCart();
  const { activeTheme } = useTheme();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || 'M');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [selectedPatch, setSelectedPatch] = useState(PLAYER_PATCHES[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const currentPatchObj = PLAYER_PATCHES.find(p => p.name === selectedPatch) || PLAYER_PATCHES[0];
  const customFee = (customName || customNumber) ? 250 : 0;
  const totalPrice = (product.price + customFee + currentPatchObj.price) * quantity;

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      customName: customName.toUpperCase(),
      customNumber,
      patch: selectedPatch,
      quantity
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const applyPreset = (preset) => {
    setCustomName(preset.name);
    setCustomNumber(preset.number);
  };

  const getThemeStyles = () => {
    if (activeTheme === THEMES.OBSIDIAN) {
      return {
        buttonPrimary: 'bg-[#e9c349] hover:bg-[#af8d11] text-black font-extrabold uppercase rounded-none tracking-wider shadow-lg',
        accentText: 'text-[#e9c349]',
        badgeBg: 'bg-[#013220] text-[#e9c349] border border-[#e9c349]',
        activeTab: 'border-[#e9c349] text-[#e9c349] font-bold',
        previewBox: 'bg-[#1c1b1b] border-2 border-[#e9c349] text-white'
      };
    } else if (activeTheme === THEMES.ENERGY) {
      return {
        buttonPrimary: 'bg-[#ce1126] hover:bg-[#a30019] text-white font-extrabold uppercase rounded-full shadow-lg shadow-red-500/30',
        accentText: 'text-[#ce1126]',
        badgeBg: 'bg-[#ce1126] text-white',
        activeTab: 'border-[#ce1126] text-[#ce1126] font-bold',
        previewBox: 'bg-[#f0edec] border-2 border-[#ce1126] text-black'
      };
    }
    return {
      buttonPrimary: 'bg-[#004e34] hover:bg-[#003825] text-white font-extrabold uppercase rounded-xl shadow-lg shadow-emerald-900/20',
      accentText: 'text-[#004e34]',
      badgeBg: 'bg-[#004e34] text-white',
      activeTab: 'border-[#004e34] text-[#004e34] font-bold',
      previewBox: 'bg-[#ebefea] border-2 border-[#004e34] text-[#181d1a]'
    };
  };

  const theme = getThemeStyles();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>¡Añadido al carrito con éxito!</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold opacity-70">
        <button onClick={() => onNavigate('home')} className="hover:underline">Inicio</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate('catalog')} className="hover:underline">{product.category}</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-black dark:text-white truncate">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery Left + Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-[450px] lg:h-[550px] bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
            <img 
              src={product.images[selectedImageIndex] || product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
            
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>

            <div className={`absolute bottom-4 left-4 ${theme.badgeBg} text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider`}>
              {product.tag}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-emerald-600 dark:border-yellow-400 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Vista previa" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Customization */}
        <div className="space-y-6">
          
          {/* Header */}
          <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-yellow-400">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>{product.rating} ({product.reviewsCount} opiniones)</span>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">{product.name}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{product.subtitle}</p>

            <div className="pt-2 flex items-baseline gap-3">
              <span className={`text-3xl font-black ${theme.accentText}`}>
                ${totalPrice.toLocaleString('es-MX')} MXN
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">${product.originalPrice} MXN</span>
              )}
              {customFee > 0 && <span className="text-xs font-semibold text-emerald-600">(+$250 personalización)</span>}
            </div>
          </div>

          {/* Size Picker */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>SELECCIONA TU TALLA:</span>
              <button className="text-xs text-emerald-600 dark:text-yellow-400 hover:underline">Guía de tallas</button>
            </div>

            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl text-xs font-bold border flex items-center justify-center transition-all ${
                    selectedSize === size
                      ? 'border-emerald-600 bg-emerald-600 text-white font-black scale-105 shadow-md'
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Jersey Personalization Panel */}
          <div className="p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <h3 className="text-xs font-black uppercase tracking-wider">PERSONALIZACIÓN OFICIAL EN ESPALDA</h3>
            </div>

            {/* Presets */}
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">Jugadores Populares:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_CUSTOMIZATIONS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="px-2.5 py-1 bg-white dark:bg-[#201f1f] border border-gray-300 dark:border-gray-700 text-[11px] font-mono font-bold rounded-lg hover:border-emerald-500 transition-colors"
                  >
                    #{preset.number} {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-gray-500 block mb-1">Nombre (Máx 12 letras)</label>
                <input 
                  type="text" 
                  maxLength={12}
                  placeholder="Ej. SANTIAGO"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 bg-white dark:bg-[#201f1f] border border-gray-300 dark:border-gray-700 text-xs font-mono font-bold uppercase rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-gray-500 block mb-1">Número (1 a 99)</label>
                <input 
                  type="text" 
                  maxLength={2}
                  placeholder="Ej. 11"
                  value={customNumber}
                  onChange={(e) => setCustomNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#201f1f] border border-gray-300 dark:border-gray-700 text-xs font-mono font-bold rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Patch Picker */}
            <div>
              <label className="text-[11px] font-bold uppercase text-gray-500 block mb-1">Parche Oficial en Manga</label>
              <select
                value={selectedPatch}
                onChange={(e) => setSelectedPatch(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#201f1f] border border-gray-300 dark:border-gray-700 text-xs font-bold rounded-lg outline-none cursor-pointer"
              >
                {PLAYER_PATCHES.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Live Jersey Badge Preview */}
            {(customName || customNumber) && (
              <div className={`p-4 ${theme.previewBox} rounded-xl text-center shadow-inner space-y-1 animate-pulse`}>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Vista Previa Estampado Oficial:</span>
                <div className="font-mono font-black text-xl tracking-widest uppercase">{customName || 'TU NOMBRE'}</div>
                <div className="font-mono font-black text-4xl">{customNumber || '00'}</div>
              </div>
            )}

          </div>

          {/* Add to Cart Actions */}
          <div className="flex gap-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold"
              >
                -
              </button>
              <span className="px-4 font-mono font-extrabold text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold"
              >
                +
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-6 ${theme.buttonPrimary} text-xs lg:text-sm font-extrabold flex items-center justify-center gap-2 group transition-transform active:scale-98`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>AÑADIR AL CARRITO</span>
            </button>
          </div>

          {/* Service Guarantees */}
          <div className="grid grid-cols-3 gap-3 text-center text-[11px] pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-1">
              <Truck className="w-5 h-5 mx-auto text-emerald-600" />
              <span className="font-bold block">Envío Express</span>
              <span className="opacity-70">24-48 horas hábiles</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-1">
              <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600" />
              <span className="font-bold block">100% Original</span>
              <span className="opacity-70">Licencia Oficial FMF</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-1">
              <RefreshCw className="w-5 h-5 mx-auto text-emerald-600" />
              <span className="font-bold block">Devolución</span>
              <span className="opacity-70">30 días sin costo</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Tech Specs & Reviews */}
      <div className="pt-8 border-t border-gray-200 dark:border-gray-800 space-y-6">
        <div className="flex border-b border-gray-200 dark:border-gray-800 text-sm font-bold uppercase gap-8">
          <button 
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'specs' ? theme.activeTab : 'border-transparent opacity-60'}`}
          >
            Especificaciones Técnicas
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'reviews' ? theme.activeTab : 'border-transparent opacity-60'}`}
          >
            Opiniones de Aficionados ({product.reviewsCount})
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm opacity-90 leading-relaxed">{product.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {product.specs?.map((spec, i) => (
                <div key={i} className="p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between text-xs">
                  <span className="font-bold text-gray-500">{spec.label}:</span>
                  <span className="font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl">
            <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">Carlos M. - Ciudad de México</span>
                <div className="flex text-yellow-400"><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /></div>
              </div>
              <p className="text-xs opacity-80">La calidad del estampado oficial es perfecta. Llegó en 24 horas y la tela HEAT.RDY se siente hiper ligera.</p>
            </div>

            <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">Mariana V. - Guadalajara</span>
                <div className="flex text-yellow-400"><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /></div>
              </div>
              <p className="text-xs opacity-80">Hermoso diseño azteca en el tejido. Compré el estampado de Santi Giménez y quedó espectacular.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
