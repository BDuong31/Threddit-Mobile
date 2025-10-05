import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    textSecondary: string;
    textButton: string;
    hover: string;
    active: string;
    disabled: string;
    muted: string;
    tag: string;
    icon: string;
    overlay: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@social_app_theme';

// Light theme colors
const lightColors = {
  background: '#ffffff',
  surface: '#f8f9fa',
  primary: '#0a0b0b',
  secondary: '#6b7280',
  text: '#1f2937',
  textSecondary: '#6b7280',
  textButton: '#ffffff',
  border: '#e5e7eb',

  // Màu trạng thái
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#3b82f6',

    // UI interaction
  hover: '#f3f4f6',         
  active: '#e5e7eb',        
  disabled: '#d1d5db',      
  muted: '#9ca3af',         

  // phụ trợ
  tag: '#3b82f6',           
  icon: '#6b7280',          
  overlay: 'rgba(0, 0, 0, 0.4)',
};

// Dark theme colors
const darkColors = {
  background: '#0a0b0b',
  surface: '#39393c',
  primary: '#ffffff',
  secondary: '#9ca3af',
  text: '#ffffff',
  textSecondary: '#bcbdbf',
  textButton: '#1f2937',
  border: '#a6a6a6',

  // Màu trạng thái
  error: '#fe0134',
  success: '#46d246',
  warning: '#facc15',
  info: '#0594f2',

  // UI interaction
  hover: '#1f1e1f',
  active: '#2a2a2c',
  disabled: '#4b4b4d',
  muted: '#6b7280',

  // phụ trợ
  tag: '#0594f2',
  icon: '#cdcccd',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme from storage:', error);
      }
    };

    loadTheme();
  }, []);

  // Update isDark based on theme and system preference
  useEffect(() => {
    const shouldBeDark = 
      theme === 'dark' || 
      (theme === 'system' && systemColorScheme === 'dark');
    
    setIsDark(shouldBeDark);
  }, [theme, systemColorScheme]);

  // Save theme to storage
  const saveTheme = async (newTheme: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme to storage:', error);
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const colors = isDark ? darkColors : lightColors;

  const value: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 