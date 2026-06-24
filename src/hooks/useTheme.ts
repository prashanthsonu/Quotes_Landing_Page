'use client';

import { useEffect, useState } from 'react';

type ThemePreference = 'light' | 'dark';

interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

function getInitialTheme(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem('theme');
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
    window.localStorage.setItem('theme', nextTheme);
  };

  return { isDark, toggleTheme };
}
