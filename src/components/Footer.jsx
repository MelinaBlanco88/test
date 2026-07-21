import React, { useState } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import { Shield, Mail, ArrowRight, CheckCircle2, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { activeTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const getFooterStyle = () => {
    if (activeTheme === THEMES.OBSIDIAN) {
      return {
        bg: 'bg-[#0e0e0e] text-[#e5e2e1] border-t border-[#2a2a2a]',
        accent: 'text-[#e9c349]',
        cardBg: 'bg-[#1c1b1b] border border-[#2a2a2a]'
      };
    } else if (activeTheme === THEMES.ENERGY) {
      return {
        bg: 'bg-[#1c1b1b] text-white border-t border-red-900/30',
        accent: 'text-[#ce1126]',
        cardBg: 'bg-[#262525] border border-gray-800'
      };
    }
    return {
      bg: 'bg-[#004e34] text-white border-t border-emerald-800',
      accent: 'text-emerald-300',
      cardBg: 'bg-[#003825] border border-emerald-800'
    };
  };

  const style = getFooterStyle();

  return (
    <footer className={`${style.bg} pt-16 pb-12 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Benefits Banner */}
        <div className={`p-8 lg:p-12 ${style.cardBg} rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl`}>
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Legión Azteca Club VIP</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight uppercase">
              ÚNETE Y RECIBE <span className={style.accent}>15% DE DESCUENTO</span> EN TU PRIMERA COMPRA
            </h3>
            <p className="text-xs opacity-80 max-w-lg">
              Sé el primero en acceder a preventas exclusivas de camisetas de la Selección Mexicana, ediciones limitadas Obsidian Pitch y promociones relámpago.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
                <span>¡Gracias por unirte! Revisa tu correo para tu cupón.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input 
                  type="email"
                  placeholder="Tu correo electrónico..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-xl outline-none focus:ring-2 focus:ring-current text-sm flex-1"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <span>SUSCRIBIRME</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-black text-lg">A</div>
              <span className="font-extrabold text-lg tracking-wider">AZTECA FOOTBALL</span>
            </div>
            <p className="opacity-70 leading-relaxed">
              La plataforma oficial de indumentaria deportiva de alto rendimiento y streetwear futbolero en México. Pasión, historia y tecnología en cada costura.
            </p>
            <div className="pt-2 flex items-center gap-4 text-lg">
              <a href="#" className="hover:opacity-100 opacity-70 transition-opacity"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:opacity-100 opacity-70 transition-opacity"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:opacity-100 opacity-70 transition-opacity"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Col 2: Colecciones */}
          <div className="space-y-3">
            <h4 className={`font-extrabold uppercase text-sm tracking-wider ${style.accent}`}>Colecciones</h4>
            <ul className="space-y-2 opacity-80">
              <li><button onClick={() => onNavigate && onNavigate('catalog', 'Selección Mexicana')} className="hover:underline">Selección Mexicana 2024</button></li>
              <li><button onClick={() => onNavigate && onNavigate('catalog', 'Azteca Energy')} className="hover:underline">Azteca Energy Streetwear</button></li>
              <li><button onClick={() => onNavigate && onNavigate('catalog', 'Obsidian Pitch')} className="hover:underline">Obsidian Pitch Gold Edition</button></li>
              <li><button onClick={() => onNavigate && onNavigate('catalog', 'Rendimiento Athletic')} className="hover:underline">Rendimiento Athletic Compression</button></li>
              <li><button onClick={() => onNavigate && onNavigate('catalog')} className="hover:underline">Tacos & Calzado FG</button></li>
            </ul>
          </div>

          {/* Col 3: Servicio al Cliente */}
          <div className="space-y-3">
            <h4 className={`font-extrabold uppercase text-sm tracking-wider ${style.accent}`}>Servicio al Cliente</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="#" className="hover:underline">Rastrear mi pedido</a></li>
              <li><a href="#" className="hover:underline">Guía oficial de tallas HEAT.RDY</a></li>
              <li><a href="#" className="hover:underline">Política de Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:underline">Personalización de Jerseys</a></li>
              <li><a href="#" className="hover:underline">Preguntas Frecuentes (FAQ)</a></li>
            </ul>
          </div>

          {/* Col 4: Contacto & Theme Switcher */}
          <div className="space-y-3">
            <h4 className={`font-extrabold uppercase text-sm tracking-wider ${style.accent}`}>Contacto & Edición</h4>
            <div className="space-y-2 opacity-80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 opacity-70" />
                <span>+52 55 8000 AZTECA</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 opacity-70" />
                <span>Estadio Azteca, CDMX, México</span>
              </div>
            </div>

            <div className="pt-3">
              <span className="block text-[11px] opacity-70 mb-2 font-semibold uppercase">Cambiar Estilo Visual:</span>
              <ThemeSwitcher />
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] opacity-60">
          <p>© 2026 Azteca Football Premium Store. Todos los derechos reservados. Licencia Oficial FMF.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Términos de Servicio</a>
            <a href="#" className="hover:underline">Aviso de Privacidad</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
