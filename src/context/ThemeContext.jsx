import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  CLASSIC: 'classic',    // Verde Esmeralda Azteca (#004e34)
  OBSIDIAN: 'obsidian',  // Obsidian Pitch Dark Gold (#131313 & #e9c349)
  ENERGY: 'energy'       // Azteca Red Energy Streetwear (#ce1126)
};

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(THEMES.CLASSIC);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-classic', 'theme-obsidian', 'theme-energy', 'dark', 'light');

    if (activeTheme === THEMES.OBSIDIAN) {
      root.classList.add('dark', 'theme-obsidian');
      document.body.style.backgroundColor = '#131313';
      document.body.style.color = '#e5e2e1';
    } else if (activeTheme === THEMES.ENERGY) {
      root.classList.add('light', 'theme-energy');
      document.body.style.backgroundColor = '#fcf9f8';
      document.body.style.color = '#1c1b1b';
    } else {
      root.classList.add('light', 'theme-classic');
      document.body.style.backgroundColor = '#f7faf5';
      document.body.style.color = '#181d1a';
    }
  }, [activeTheme]);

  const value = {
    activeTheme,
    setActiveTheme,
    THEMES
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
