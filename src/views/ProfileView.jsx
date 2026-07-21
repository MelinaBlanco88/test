import React, { useState } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { User, Package, Heart, MapPin, Settings, Shield, Award, ChevronRight, Truck, CheckCircle, Clock, ShoppingBag } from 'lucide-react';

export default function ProfileView({ onNavigate, onSelectProduct }) {
  const { activeTheme } = useTheme();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('orders');

  // Sample User Orders
  const orders = [
    {
      id: 'AZT-98421',
      date: '20 Julio 2026',
      total: 2699,
      status: 'En Camino',
      statusStep: 3, // 1 to 4
      trackingNumber: 'DHL-MX-8849201',
      estimatedDelivery: 'Mañana, 22 Julio 2026',
      items: [
        {
          name: 'Jersey Local Selección Mexicana 2024',
          size: 'M',
          customName: 'SANTIAGO',
          customNumber: '11',
          patch: 'Patch FIFA World Cup 2026',
          price: 2699,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmK7IpHlmNVkSDzR1x8rLCEt6VD5kwABSzmiMjhLSjwR1SEgRDBN1GHS2a9pHwngsvRiPHmMiKAmJvimGLl1av4RL1ebzeHbf8i6paSgHZHh2WgoImCBD-FDsf65-V1ZGAwzaC8GtwakSSKyPGlXMAb0fCnDJGNk1cPvE39nlv3cVPqBvrH96V0HqxapAH278q0HTVbpYHOfaTiz9KWz2P9yGZA3K5HJ8LRi934IaC4t1Sr8f7eP6u'
        }
      ]
    },
    {
      id: 'AZT-74120',
      date: '10 Junio 2026',
      total: 3899,
      status: 'Entregado',
      statusStep: 4,
      trackingNumber: 'ESTAFETA-994102',
      estimatedDelivery: 'Entregado 12 Junio',
      items: [
        {
          name: 'Tacos Azteca Obsidian Pitch Gold Pro',
          size: '27 MX',
          customName: '',
          customNumber: '',
          price: 3899,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu_30EFOyeKSgF9eFe9454Y3p0TupBaU43p44ckLXxXxerxuL7rJeiNX_Sy8TmsMt-WbA-64qM5VcPcPesqxJ1zyLrUydu21JYGTor_lLUvdeYOdN4Eq9IQi7uV-X8iwMW14ays7KJ_EHYQIJIsP1wZXV0_lAmCUq3zI_iIZWDA6WlxNmSNxSNQRzOEcz17w9ihaGLYAsFbFfK1NgFga5wzEBjKyruzPmlRS-4tHRLM4jT2EjKu7Vj'
        }
      ]
    }
  ];

  // Sample Saved Addresses
  const addresses = [
    {
      id: 1,
      title: 'Casa Principal',
      isDefault: true,
      name: 'Juan Pérez Guerrero',
      address: 'Calzada de Tlalpan 3456, Col. Coapa',
      city: 'Ciudad de México, CDMX 14390',
      phone: '55 1234 5678'
    },
    {
      id: 2,
      title: 'Oficina / Trabajo',
      isDefault: false,
      name: 'Juan Pérez Guerrero',
      address: 'Paseo de la Reforma 222, Piso 14',
      city: 'Cuauhtémoc, CDMX 06600',
      phone: '55 9876 5432'
    }
  ];

  const getThemeAccents = () => {
    if (activeTheme === THEMES.OBSIDIAN) {
      return {
        cardBg: 'bg-[#1c1b1b] border-[#2a2a2a]',
        activeTab: 'bg-[#e9c349] text-black font-bold rounded-none',
        accentText: 'text-[#e9c349]',
        badgeBg: 'bg-[#013220] text-[#e9c349] border border-[#e9c349]'
      };
    } else if (activeTheme === THEMES.ENERGY) {
      return {
        cardBg: 'bg-white border-[#e5e2e1]',
        activeTab: 'bg-[#ce1126] text-white font-bold rounded-full',
        accentText: 'text-[#ce1126]',
        badgeBg: 'bg-[#ce1126] text-white'
      };
    }
    return {
      cardBg: 'bg-white border-[#ebefea]',
      activeTab: 'bg-[#004e34] text-white font-bold rounded-xl',
      accentText: 'text-[#004e34]',
      badgeBg: 'bg-[#004e34] text-white'
    };
  };

  const theme = getThemeAccents();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="p-6 lg:p-8 bg-gradient-to-r from-[#004e34] via-[#013220] to-[#131313] text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white/20">
            JP
          </div>

          <div className="space-y-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-extrabold uppercase">JUAN PÉREZ GUERRERO</h1>
              <span className="px-3 py-0.5 bg-yellow-400 text-black text-[11px] font-black uppercase rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> SOCIO ORO VIP
              </span>
            </div>
            <p className="text-xs opacity-75">Miembro Azteca desde Enero 2024 • juan.perez@ejemplo.com</p>
          </div>
        </div>

        {/* Loyalty Points Counter */}
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center min-w-[200px]">
          <span className="text-[11px] uppercase font-bold tracking-widest text-yellow-300 block">Puntos Azteca Acumulados</span>
          <span className="text-3xl font-black text-white">2,450 PTS</span>
          <div className="mt-2 w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div className="bg-yellow-400 h-full w-[75%]" />
          </div>
          <span className="text-[10px] opacity-70 mt-1 block">Próximo Nivel: Leyenda Azteca (550 pts faltantes)</span>
        </div>

      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'orders' ? theme.activeTab : 'hover:bg-black/5 dark:hover:bg-white/10 rounded-xl'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Mis Pedidos ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'wishlist' ? theme.activeTab : 'hover:bg-black/5 dark:hover:bg-white/10 rounded-xl'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Lista de Deseos</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'addresses' ? theme.activeTab : 'hover:bg-black/5 dark:hover:bg-white/10 rounded-xl'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Direcciones</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'settings' ? theme.activeTab : 'hover:bg-black/5 dark:hover:bg-white/10 rounded-xl'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Ajustes de Perfil</span>
        </button>
      </div>

      {/* Tab 1: Mis Pedidos */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className={`p-6 ${theme.cardBg} rounded-2xl border space-y-6 shadow-sm`}>
              
              {/* Order Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm">{order.id}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      order.status === 'Entregado' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-gray-400 mt-1 block">Realizado el {order.date}</span>
                </div>

                <div className="text-right">
                  <span className="text-gray-400 block text-[11px]">Guía de Rastreo: {order.trackingNumber}</span>
                  <span className="font-extrabold text-sm ${theme.accentText}">${order.total.toLocaleString('es-MX')} MXN</span>
                </div>
              </div>

              {/* Tracking Progress Timeline */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase block">Estado del Envío:</span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                  <div className={`p-2 rounded-lg border ${order.statusStep >= 1 ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'opacity-40'}`}>
                    1. Recibido
                  </div>
                  <div className={`p-2 rounded-lg border ${order.statusStep >= 2 ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'opacity-40'}`}>
                    2. Estampado
                  </div>
                  <div className={`p-2 rounded-lg border ${order.statusStep >= 3 ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'opacity-40'}`}>
                    3. En Camino (DHL)
                  </div>
                  <div className={`p-2 rounded-lg border ${order.statusStep >= 4 ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'opacity-40'}`}>
                    4. Entregado
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 pt-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100" />
                    <div className="flex-1 text-xs space-y-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-gray-500 text-[11px]">Talla: {item.size}</p>
                      {item.customName && (
                        <span className="inline-block bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                          #{item.customNumber} {item.customName}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => onNavigate('catalog')}
                      className="px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs font-bold rounded-xl"
                    >
                      Volver a comprar
                    </button>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Lista de Deseos */}
      {activeTab === 'wishlist' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((product) => (
            <div key={product.id} className={`p-4 ${theme.cardBg} rounded-2xl border space-y-3`}>
              <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-xl bg-gray-100" />
              <div className="space-y-1">
                <h4 className="font-bold text-xs line-clamp-1">{product.name}</h4>
                <span className="font-extrabold text-sm block">${product.price.toLocaleString('es-MX')} MXN</span>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="w-full py-2.5 bg-[#004e34] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Mover al Carrito</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Direcciones */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div key={addr.id} className={`p-6 ${theme.cardBg} rounded-2xl border space-y-3`}>
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm">{addr.title}</h4>
                {addr.isDefault && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">Predeterminada</span>}
              </div>
              <p className="text-xs font-semibold">{addr.name}</p>
              <p className="text-xs text-gray-500">{addr.address}</p>
              <p className="text-xs text-gray-500">{addr.city}</p>
              <p className="text-xs text-gray-400">Tel: {addr.phone}</p>
              <div className="pt-2 flex gap-3 text-xs font-bold">
                <button className="text-emerald-600 hover:underline">Editar</button>
                <button className="text-red-500 hover:underline">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Ajustes */}
      {activeTab === 'settings' && (
        <div className={`p-6 ${theme.cardBg} rounded-2xl border max-w-2xl space-y-4 text-xs`}>
          <h3 className="font-extrabold uppercase text-sm pb-2 border-b border-gray-200 dark:border-gray-800">
            Ajustes Personales
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Nombre</label>
              <input type="text" defaultValue="Juan" className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl" />
            </div>
            <div>
              <label className="font-bold block mb-1">Apellidos</label>
              <input type="text" defaultValue="Pérez Guerrero" className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl" />
            </div>
          </div>
          <div>
            <label className="font-bold block mb-1">Correo Electrónico</label>
            <input type="email" defaultValue="juan.perez@ejemplo.com" className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl" />
          </div>
          <button className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl">Guardar Cambios</button>
        </div>
      )}

    </div>
  );
}
