import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import main translation files
import enTranslations from '@/locales/en.json';
import brTranslations from '@/locales/br.json';

// Import revelation translation files
import enRevelationTranslations from '@/locales/revelation/en.json';
import brRevelationTranslations from '@/locales/revelation/br.json';

// Define the shape of our context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  tr: (key: string, fallback?: string) => string; // Always return string for React compatibility
  trObj: (key: string, fallback?: unknown) => unknown; // Return objects for complex data structures
}

// Define the translations type
type Translations = Record<string, unknown>;

// Available translations
const translations: { [key: string]: Translations } = {
  en: enTranslations,
  br: brTranslations,
};

// Available revelation translations
const revelationTranslations: { [key: string]: Translations } = {
  en: enRevelationTranslations,
  br: brRevelationTranslations,
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string, fallback?: string): string => {
    try {
      const keys = key.split('.');
      let value: unknown = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          // Key not found, return fallback or key
          console.warn(`Translation key not found: ${key} for language: ${language}`);
          return fallback || key;
        }
      }
      
      // Return the found value or fallback
      return typeof value === 'string' ? value : (fallback || key);
    } catch (error) {
      console.error('Translation error for key:', key, error);
      return fallback || key;
    }
  };

  // Revelation translation function
  const tr = (key: string, fallback?: string): string => {
    try {
      const keys = key.split('.');
      let value: unknown = revelationTranslations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          // Key not found, return fallback or key as string
          console.warn(`Revelation translation key not found: ${key} for language: ${language}`);
          return fallback || key;
        }
      }
      
      // Always return a string - convert objects to JSON if needed
      if (typeof value === 'string') {
        return value;
      } else if (value !== null && value !== undefined) {
        // If it's an object, return fallback or empty string
        return fallback || '';
      } else {
        return fallback || key;
      }
    } catch (error) {
      console.error('Revelation translation error for key:', key, error);
      return fallback || key;
    }
  };

  // Revelation translation function that returns objects
  const trObj = (key: string, fallback?: unknown): unknown => {
    try {
      const keys = key.split('.');
      let value: unknown = revelationTranslations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          // Key not found, return fallback or undefined
          console.warn(`Revelation translation key not found: ${key} for language: ${language}`);
          return fallback;
        }
      }
      
      // Return the found value (could be string, object, etc.) or fallback
      return value !== null && value !== undefined ? value : fallback;
    } catch (error) {
      console.error('Revelation translation error for key:', key, error);
      return fallback;
    }
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    tr,
    trObj,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;