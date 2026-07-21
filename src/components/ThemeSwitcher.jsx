import React from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { Sparkles, Moon, Zap } from 'lucide-react';

export default function ThemeSwitcher() {
  const { activeTheme, setActiveTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5 p-1 bg-black/5 dark:bg-white/10 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md">
      <button
        onClick={() => setActiveTheme(THEMES.CLASSIC)}
        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          activeTheme === THEMES.CLASSIC
            ? 'bg-[#004e34] text-white shadow-md'
            : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
        }`}
        title="Edición Clásica Verde Azteca"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Azteca Classic</span>
      </button>

      <button
        onClick={() => setActiveTheme(THEMES.OBSIDIAN)}
        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold transition-all duration-200 ${
          activeTheme === THEMES.OBSIDIAN
            ? 'bg-[#e9c349] text-[#131313] font-bold shadow-md rounded-none'
            : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white rounded-full'
        }`}
        title="Edición Obsidiana Dorado Nocturno"
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Obsidian Pitch</span>
      </button>

      <button
        onClick={() => setActiveTheme(THEMES.ENERGY)}
        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          activeTheme === THEMES.ENERGY
            ? 'bg-[#ce1126] text-white shadow-md'
            : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
        }`}
        title="Edición Azteca Red Energy Streetwear"
      >
        <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
        <span className="hidden sm:inline">Azteca Energy</span>
      </button>
    </div>
  );
}
