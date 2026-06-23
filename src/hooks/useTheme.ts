'use client';

import { useEffect, useSyncExternalStore } from 'react';

type ThemePreference = 'light' | 'dark' | null;

function subscribeToThemeChanges(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  window.addEventListener('storage', onStoreChange);
  window.addEventListener('themechange', onStoreChange);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener('themechange', onStoreChange);
    mediaQuery.removeEventListener('change', onStoreChange);
  };
}

function getThemePreferenceSnapshot(): ThemePreference | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedTheme = window.localStorage.getItem('theme');
  return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
}

function getServerThemePreferenceSnapshot(): ThemePreference | null {
  return null;
}

function getSystemPrefersDarkSnapshot(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getServerSystemPrefersDarkSnapshot(): boolean {
  return false;
}

interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const themePreference = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemePreferenceSnapshot,
    getServerThemePreferenceSnapshot,
  );

  const systemPrefersDark = useSyncExternalStore(
    subscribeToThemeChanges,
    getSystemPrefersDarkSnapshot,
    getServerSystemPrefersDarkSnapshot,
  );

  const isDark = themePreference === 'dark' || (themePreference === null && systemPrefersDark);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggleTheme = () => {
    const nextTheme: ThemePreference = isDark ? 'light' : 'dark';
    window.localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new Event('themechange'));
  };

  return { isDark, toggleTheme };
}
