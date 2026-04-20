"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import enTranslations from "../locales/en.json";
import brTranslations from "../locales/br.json";
import enRevelationTranslations from "../locales/revelation/en.json";
import brRevelationTranslations from "../locales/revelation/br.json";
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  tr: (key: string, fallback?: string) => string;
  tObj: (key: string, fallback?: unknown) => unknown;
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
  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("language");
    return saved && translations[saved] ? saved : "en";
  });

  const setLanguage = (lang: string) => {
    localStorage.setItem("language", lang);
    setLanguageState(lang);
  };
  const t = (key: string, fallback?: string): string => {
    try {
      const keys = key.split(".");
      let value: unknown = translations[language];
      for (const k of keys) {
        if (value === null || value === undefined) return fallback ?? key;
        if (Array.isArray(value)) {
          const idx = Number(k);
          if (!Number.isNaN(idx) && idx < (value as unknown[]).length) {
            value = (value as unknown[])[idx];
          } else {
            return fallback ?? key;
          }
        } else if (typeof value === "object" && k in (value as object)) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return fallback ?? key;
        }
      }
      return typeof value === "string" ? value : fallback ?? key;
    } catch {
      return fallback ?? key;
    }
  };
  const tObj = (key: string, fallback?: unknown): unknown => {
    try {
      const keys = key.split(".");
      let value: unknown = translations[language];
      for (const k of keys) {
        if (value === null || value === undefined) return fallback;
        if (Array.isArray(value)) {
          const idx = Number(k);
          if (!Number.isNaN(idx) && idx < (value as unknown[]).length) {
            value = (value as unknown[])[idx];
          } else {
            return fallback;
          }
        } else if (typeof value === "object" && k in (value as object)) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return fallback;
        }
      }
      return value !== null && value !== undefined ? value : fallback;
    } catch {
      return fallback;
    }
  };
  const tr = (key: string, fallback?: string): string => {
    try {
      const keys = key.split(".");
      let value: unknown = revelationTranslations[language];
      for (const k of keys) {
        if (value === null || value === undefined) return fallback ?? key;
        if (Array.isArray(value)) {
          const idx = Number(k);
          if (!Number.isNaN(idx) && idx < (value as unknown[]).length) {
            value = (value as unknown[])[idx];
          } else {
            return fallback ?? key;
          }
        } else if (typeof value === "object" && k in (value as object)) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return fallback ?? key;
        }
      }
      return typeof value === "string" ? value : fallback ?? key;
    } catch {
      return fallback ?? key;
    }
  };
  const trObj = (key: string, fallback?: unknown): unknown => {
    try {
      const keys = key.split(".");
      let value: unknown = revelationTranslations[language];
      for (const k of keys) {
        if (value === null || value === undefined) return fallback;
        if (Array.isArray(value)) {
          const idx = Number(k);
          if (!Number.isNaN(idx) && idx < (value as unknown[]).length) {
            value = (value as unknown[])[idx];
          } else {
            return fallback;
          }
        } else if (typeof value === "object" && k in (value as object)) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return fallback;
        }
      }
      return value !== null && value !== undefined ? value : fallback;
    } catch {
      return fallback;
    }
  };
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    tr,
    tObj,
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
