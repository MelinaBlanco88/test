import React from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, ArrowRight, Zap, Shield, Sparkles, Star, ChevronRight, Check, Flame, Trophy, Award } from 'lucide-react';

export default function HomeView({ onNavigate, onSelectProduct }) {
  const { activeTheme } = useTheme();
  const { addToCart } = useCart();

  const featuredProducts = PRODUCTS.slice(0, 4);

  const getThemeHero = () => {
    if (activeTheme === THEMES.OBSIDIAN) {
      return {
        bg: 'bg-[#050505] text-[#e5e2e1] border-b border-[#2a2a2a]',
        badge: 'bg-[#013220] text-[#e9c349] border border-[#e9c349] font-oswald uppercase tracking-widest px-3 py-1 text-xs',
        title: 'SACRED INTENSITY: OBSIDIAN PITCH',
        subtitle: 'Ingeniería de velocidad envuelta en la oscuridad sagrada de la obsidiana y acentuada con oro metálico de victoria.',
        ctaPrimary: 'bg-[#e9c349] text-black font-oswald uppercase tracking-wider hover:bg-[#af8d11] rounded-none shadow-lg shadow-yellow-500/10',
        ctaSecondary: 'border border-[#e9c349] text-[#e9c349] font-oswald uppercase hover:bg-[#e9c349]/10 rounded-none',
        glow: 'azteca-gold-glow',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmZrJbMPLhf-7MXi3qjT6oou8_uT2gi332d6MQ7whEcUT_D1q0EaHvfZEiEybLtcKb2R25R6vEqATc0neD8Yh0UprEbaEiveEhYk2dpMonFjWFgOHjW9d3uPmijBtrkhhn3WL_434TjBZwVEnjtcTkuReev75eHGijEE4J9CnAuEAqzqaDjvvak7JIc0fTM4FwHryQSDQBebSd1u2ZZagxvUvbi5wZrzpLnvG7pXaFoeGODJskKk9e'
      };
    } else if (activeTheme === THEMES.ENERGY) {
      return {
        bg: 'bg-[#fcf9f8] text-[#1c1b1b]',
        badge: 'bg-[#ce1126] text-white font-inter font-black uppercase tracking-wider rounded-full px-3.5 py-1 text-xs shadow-md shadow-red-500/30',
        title: 'LA NUEVA PIEL: AZTECA RED ENERGY',
        subtitle: 'El espíritu vibrante del fútbol urbano. Estilo de alta velocidad diseñado para la nueva generación de aficionados.',
        ctaPrimary: 'bg-[#ce1126] text-white font-inter font-extrabold uppercase hover:bg-[#a30019] rounded-full shadow-xl shadow-red-500/30',
        ctaSecondary: 'bg-black text-white font-inter font-extrabold uppercase hover:bg-gray-800 rounded-full',
        glow: 'azteca-red-glow',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnKOGg05GXI2Y5SsMzFolJjHqYZrANoEiA1EE_oo1xf8qLiXGzuBVrkkSzt5gRKDbkYOInxvrbdZYyqFciXT_7riNH85jQk5F8R47BTfOgnpkh0eFrm4UWhNWq5r5aIP3drlYqsF9tb7gqDbpVKVZHPKKHMjqbGNFku2Etn1nlSI9k5g-Q0vdCJExSM4OlxobcjIuIL9x92tbCCeRZ9Wa8LP7dfZHCEX7ru15ZsWwd-E_sHWwd9_Ie'
      };
    }
    // Classic Azteca
    return {
      bg: 'bg-[#f7faf5] text-[#181d1a]',
      badge: 'bg-[#004e34] text-white font-montserrat font-extrabold uppercase tracking-wider rounded-lg px-3.5 py-1 text-xs shadow-md shadow-emerald-900/20',
      title: 'SELECCIÓN MEXICANA 2024: PLUMAJE GUERRERO',
      subtitle: 'La armadura oficial confeccionada con tecnología HEAT.RDY de secado rápido y patrones aztecas en alto relieve.',
      ctaPrimary: 'bg-[#004e34] text-white font-montserrat font-extrabold uppercase hover:bg-[#003825] rounded-xl shadow-xl shadow-emerald-900/20',
      ctaSecondary: 'bg-[#bb001e] text-white font-montserrat font-extrabold uppercase hover:bg-[#900015] rounded-xl shadow-xl shadow-red-900/20',
      glow: 'azteca-emerald-glow',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmK7IpHlmNVkSDzR1x8rLCEt6VD5kwABSzmiMjhLSjwR1SEgRDBN1GHS2a9pHwngsvRiPHmMiKAmJvimGLl1av4RL1ebzeHbf8i6paSgHZHh2WgoImCBD-FDsf65-V1ZGAwzaC8GtwakSSKyPGlXMAb0fCnDJGNk1cPvE39nlv3cVPqBvrH96V0HqxapAH278q0HTVbpYHOfaTiz9KWz2P9yGZA3K5HJ8LRi934IaC4t1Sr8f7eP6u'
    };
  };

  const hero = getThemeHero();

  return (
    <div className="space-y-16 pb-16 azteca-pattern-bg">
      
      {/* Hero Section */}
      <section className={`${hero.bg} transition-colors duration-300 relative overflow-hidden py-12 lg:py-20 border-b border-gray-200 dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className={hero.badge}>EDICIÓN OFICIAL 2024</span>
                <span className="text-xs font-bold opacity-75 uppercase tracking-wider flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-yellow-400" /> Licencia FMF
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.03] tracking-tight">
                {hero.title}
              </h1>

              <p className="text-sm lg:text-base opacity-85 max-w-xl leading-relaxed">
                {hero.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button 
                  onClick={() => onNavigate('catalog')}
                  className={`px-8 py-4 ${hero.ctaPrimary} text-xs lg:text-sm flex items-center gap-2 group transition-transform active:scale-95`}
                >
                  <span>EXPLORAR CATÁLOGO</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button 
                  onClick={() => {
                    const jersey = PRODUCTS.find(p => p.id === 'jersey-local-2024');
                    if (jersey && onSelectProduct) onSelectProduct(jersey);
                  }}
                  className={`px-8 py-4 ${hero.ctaSecondary} text-xs lg:text-sm flex items-center gap-2 transition-transform active:scale-95`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>PERSONALIZAR MI JERSEY</span>
                </button>
              </div>

              {/* Stats Highlights */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10 grid grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 bg-white/40 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 backdrop-blur-sm">
                  <span className="block font-black text-xl text-emerald-600 dark:text-yellow-400">100%</span>
                  <span className="opacity-70 text-[11px]">Original Licenciado</span>
                </div>
                <div className="p-3 bg-white/40 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 backdrop-blur-sm">
                  <span className="block font-black text-xl text-emerald-600 dark:text-yellow-400">HEAT.RDY</span>
                  <span className="opacity-70 text-[11px]">Tecnología Transpirable</span>
                </div>
                <div className="p-3 bg-white/40 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 backdrop-blur-sm">
                  <span className="block font-black text-xl text-emerald-600 dark:text-yellow-400">24 HORAS</span>
                  <span className="opacity-70 text-[11px]">Envío Express México</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="relative group">
              <div className={`absolute -inset-4 rounded-3xl blur-2xl opacity-60 group-hover:opacity-85 transition-opacity ${hero.glow}`} />
              
              <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 shadow-2xl bg-black/5">
                <img 
                  src={hero.image} 
                  alt="Azteca Football Premium"
                  className="w-full h-[420px] lg:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Interactive Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md text-white rounded-2xl border border-white/20 flex items-center justify-between shadow-2xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider block">Edición Especial</span>
                    <h4 className="font-extrabold text-sm line-clamp-1">Jersey Local Selección Mexicana 2024</h4>
                  </div>
                  <button 
                    onClick={() => {
                      const jersey = PRODUCTS.find(p => p.id === 'jersey-local-2024');
                      if (jersey && onSelectProduct) onSelectProduct(jersey);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Category Banner Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-yellow-400 uppercase tracking-widest mb-1">
              <Trophy className="w-4 h-4" />
              <span>Líneas de Diseño</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold uppercase tracking-tight">COLECCIONES EXCLUSIVAS</h2>
          </div>
          <button 
            onClick={() => onNavigate('catalog')}
            className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Selección Mexicana */}
          <div 
            onClick={() => onNavigate('catalog', 'Selección Mexicana')}
            className="group relative h-88 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmK7IpHlmNVkSDzR1x8rLCEt6VD5kwABSzmiMjhLSjwR1SEgRDBN1GHS2a9pHwngsvRiPHmMiKAmJvimGLl1av4RL1ebzeHbf8i6paSgHZHh2WgoImCBD-FDsf65-V1ZGAwzaC8GtwakSSKyPGlXMAb0fCnDJGNk1cPvE39nlv3cVPqBvrH96V0HqxapAH278q0HTVbpYHOfaTiz9KWz2P9yGZA3K5HJ8LRi934IaC4t1Sr8f7eP6u"
              alt="Selección Mexicana"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/90 border border-emerald-500/30 px-2.5 py-1 rounded-full w-fit mb-2">Colección Oficial FMF</span>
              <h3 className="text-2xl font-extrabold uppercase">Selección Mexicana 2024</h3>
              <p className="text-xs opacity-80 mt-1">Jerseys de Local, Visitante y Anthem Jackets</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1.5 transition-transform">
                <span>EXPLORAR COLECCIÓN</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Obsidian Pitch */}
          <div 
            onClick={() => onNavigate('catalog', 'Obsidian Pitch')}
            className="group relative h-88 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu_30EFOyeKSgF9eFe9454Y3p0TupBaU43p44ckLXxXxerxuL7rJeiNX_Sy8TmsMt-WbA-64qM5VcPcPesqxJ1zyLrUydu21JYGTor_lLUvdeYOdN4Eq9IQi7uV-X8iwMW14ays7KJ_EHYQIJIsP1wZXV0_lAmCUq3zI_iIZWDA6WlxNmSNxSNQRzOEcz17w9ihaGLYAsFbFfK1NgFga5wzEBjKyruzPmlRS-4tHRLM4jT2EjKu7Vj"
              alt="Obsidian Pitch"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 bg-yellow-950/90 border border-yellow-500/30 px-2.5 py-1 rounded-full w-fit mb-2">Edición Limitada Gold</span>
              <h3 className="text-2xl font-extrabold uppercase">Obsidian Pitch Pro</h3>
              <p className="text-xs opacity-80 mt-1">Tacos FG de Fibra de Carbono y Obsidiana</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-yellow-400 group-hover:translate-x-1.5 transition-transform">
                <span>VER EDICIÓN OBSIDIANA</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: Azteca Energy */}
          <div 
            onClick={() => onNavigate('catalog', 'Azteca Energy')}
            className="group relative h-88 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9bwOph2J9cMAcW1K8s0R45xGNN_5B9aaLZiRuDbYi068MsIbgUZ9JWBbOzPEq6Kl3T6BSSd5Y1WVoe6A66sOxoBxQsES6ae-fflmwHJ_k1vRqnCQFkcw2T781wV7kvKzoeK3jEN-SqumhzsDMXiOs65zfBwK-Wi-BmcDXm89akHQ6nV3Tetq2l-SEcIxLrioSfXM900yBE0b8C7W2oHxofyN_2dLS9B5vdvtJ-0xfSAAngaNGuNGl"
              alt="Azteca Energy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-950/90 border border-red-500/30 px-2.5 py-1 rounded-full w-fit mb-2">Streetwear Football</span>
              <h3 className="text-2xl font-extrabold uppercase">Azteca Energy Red</h3>
              <p className="text-xs opacity-80 mt-1">Hoodies Oversized y ropa urbana futbolera</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-red-400 group-hover:translate-x-1.5 transition-transform">
                <span>COMPRAR STREETWEAR</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-yellow-400 uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Lo Más Codiciado</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold uppercase tracking-tight">PRODUCTOS ESTRELLA</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Box */}
              <div 
                onClick={() => onSelectProduct && onSelectProduct(product)}
                className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Product Tag */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.tag}
                </div>

                {/* Quick Add Overlay Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="absolute bottom-3 right-3 p-3 bg-[#004e34] dark:bg-[#e9c349] text-white dark:text-black rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 flex items-center gap-1.5 text-xs font-bold"
                  title="Añadir al Carrito"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div 
                  onClick={() => onSelectProduct && onSelectProduct(product)}
                  className="cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{product.category}</span>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-sm group-hover:text-emerald-700 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through mr-2">${product.originalPrice}</span>
                    <span className="text-base font-extrabold text-emerald-700 dark:text-yellow-400">
                      ${product.price.toLocaleString('es-MX')} MXN
                    </span>
                  </div>

                  <button 
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="text-xs font-bold hover:underline flex items-center gap-1 text-emerald-600 dark:text-yellow-400"
                  >
                    Detalles
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Customization Feature Altar */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-r from-[#004e34] via-[#013220] to-black text-white p-8 lg:p-14 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>TALLER DE ESTAMPADO OFICIAL FMF</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold uppercase tracking-tight">
              PERSONALIZA TU DORSAL PARA EL MUNDIAL 2026
            </h2>
            <p className="text-xs lg:text-sm opacity-80 leading-relaxed">
              Elige tu nombre y número preferido con la tipografía oficial. Añade el parche de la FIFA World Cup 2026 o CONCACAF Nations League.
            </p>
            <button 
              onClick={() => {
                const jersey = PRODUCTS.find(p => p.id === 'jersey-local-2024');
                if (jersey && onSelectProduct) onSelectProduct(jersey);
              }}
              className="px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>PERSONALIZAR MI JERSEY AHORA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-yellow-400/40 shadow-2xl">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiRB4vU-DN14Grjb0IkBJvQEtQxSaaoYZFg7uSIe1EN_8889q2tmlidKHwRQJEQKiuqbGvDKj9t8TD1CW6rgV_cka_VSPw3VSGZFKaruD0A5D-V2-_vpohJ5urEKDT-YgLrMv0TnRYKubg9m6Z7AtRH5rxkZvsklfFW5s86fSzG95nHTYKC4bJ67hwWD8Q_t8YORsbKlK8A-C1wDiUkLhberGSNBuL0F1M1c1OmUTJQ5wPPHS1J8hs" 
                alt="Personalización Jersey Azteca"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
