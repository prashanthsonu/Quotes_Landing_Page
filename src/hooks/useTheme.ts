'use client';

import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '@/lib/constants';

type ThemePreference = 'light' | 'dark';

interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

function getInitialTheme(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<ThemePreference>(getInitialTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggleTheme = () => {
    const nextTheme: ThemePreference = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return { isDark, toggleTheme };
}
