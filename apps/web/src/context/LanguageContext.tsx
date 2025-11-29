"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import enTranslations from "../locales/en.json";
import brTranslations from "../locales/br.json";
import enRevelationTranslations from "../locales/revelation/en.json";
import brRevelationTranslations from "../locales/revelation/br.json";
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  tr: (key: string, fallback?: string) => string;
  trObj: (key: string, fallback?: unknown) => unknown;
}
type Translations = Record<string, unknown>;
const translations: { [key: string]: Translations } = {
  en: enTranslations,
  br: brTranslations,
};
const revelationTranslations: { [key: string]: Translations } = {
  en: enRevelationTranslations,
  br: brRevelationTranslations,
};
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
interface LanguageProviderProps {
  children: ReactNode;
}
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en");
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  const t = (key: string, fallback?: string): string => {
    try {
      const keys = key.split(".");
      let value: unknown = translations[language];
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return fallback || key;
        }
      }
      return typeof value === "string" ? value : fallback || key;
    } catch (error) {
      return fallback || key;
    }
  };
  const tr = (key: string, fallback?: string): string => {
    try {
      const keys = key.split(".");
      let value: unknown = revelationTranslations[language];
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return fallback || key;
        }
      }
      if (typeof value === "string") {
        return value;
      } else if (value !== null && value !== undefined) {
        return fallback || "";
      } else {
        return fallback || key;
      }
    } catch (error) {
      return fallback || key;
    }
  };
  const trObj = (key: string, fallback?: unknown): unknown => {
    try {
      const keys = key.split(".");
      let value: unknown = revelationTranslations[language];
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return fallback;
        }
      }
      return value !== null && value !== undefined ? value : fallback;
    } catch (error) {
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
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
export default LanguageContext;
