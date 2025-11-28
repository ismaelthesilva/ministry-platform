// Theme utility for dark mode management
export const THEME_KEY = 'theme';

export type Theme = 'light' | 'dark' | 'system';

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(THEME_KEY) as Theme;
    return stored || 'system';
  } catch {
    return 'system';
  }
}

export function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore storage errors
  }
}

export function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

export function applyTheme(theme: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function initializeTheme(): 'light' | 'dark' {
  const storedTheme = getStoredTheme();
  const effectiveTheme = getEffectiveTheme(storedTheme);
  applyTheme(effectiveTheme);
  return effectiveTheme;
}

export function toggleTheme(): 'light' | 'dark' {
  const currentTheme = getStoredTheme();
  const currentEffective = getEffectiveTheme(currentTheme);
  const newTheme = currentEffective === 'dark' ? 'light' : 'dark';
  
  setStoredTheme(newTheme);
  applyTheme(newTheme);
  
  return newTheme;
}
