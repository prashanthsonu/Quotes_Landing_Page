'use client';

import { useEffect, useMemo, useSyncExternalStore, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Carousel, type Slide } from '@/components/Carousel';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { fallbackSlides, faqItems } from '../lib/homepage-content';

const Page = styled.div`
  background-color: ${tokens.snow};
  min-height: 100vh;
  font-family: var(--font-body);
  color: ${tokens.dark};
  overflow-x: hidden;
`;

interface HomePageClientProps {
  slides: Slide[];
}

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
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return null;
}

function getServerThemePreferenceSnapshot(): ThemePreference | null {
  return null;
}

function getSystemPrefersDarkSnapshot() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getServerSystemPrefersDarkSnapshot() {
  return false;
}

export function HomePageClient({ slides }: HomePageClientProps) {
  const effectiveSlides = useMemo(() => {
    if (slides.length >= 1) {
      return slides;
    }

    return fallbackSlides;
  }, [slides]);

  const [activeSlide, setActiveSlide] = useState(0);

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

  const prev = () => setActiveSlide((i) => (i - 1 + effectiveSlides.length) % effectiveSlides.length);
  const next = () => setActiveSlide((i) => (i + 1) % effectiveSlides.length);

  return (
    <Page>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <Hero
        title="Lorem ipsum dolor sit amet consect alora"
        body="Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
        primaryCta="Primary CTA"
        secondaryCta="Secondary CTA"
      />

      <Carousel slides={effectiveSlides} activeIndex={activeSlide} isDark={isDark} onPrev={prev} onNext={next} />

      <Faq
        heading="Frequently asked questions"
        subtitle="Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis."
        items={faqItems}
        isDark={isDark}
      />

      <Footer />
    </Page>
  );
}
