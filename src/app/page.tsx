'use client';

import { useEffect, useSyncExternalStore, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Carousel, type Slide } from '@/components/Carousel';
import { Faq, type FaqItem } from '@/components/Faq';
import { Footer } from '@/components/Footer';

const Page = styled.div`
  background-color: ${tokens.snow};
  min-height: 100vh;
  font-family: var(--font-body);
  color: ${tokens.dark};
  overflow-x: hidden;
`;

// ─── Page data ───────────────────────────────────────────────────────────────
const slides: Slide[] = [
  {
    quote:
      'There are only two kinds of programming languages: those people always complain about and those nobody uses.',
    author: 'Bjarne Stroustrup',
  },
  {
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
  },
  {
    quote: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
];

const FAQ_ANSWER =
  'Aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis.';

const faqItems: FaqItem[] = [
  {
    question: 'Temporibus autem quibusdam et aut officiis debitis?',
    answer: FAQ_ANSWER,
  },
  {
    question: 'Repudiandae sint et molestiae non recusandae?',
    answer: FAQ_ANSWER,
  },
  {
    question: 'Itaque earum rerum hic tenetur a sapiente delectus?',
    answer: FAQ_ANSWER,
  },
];

type ThemePreference = 'light' | 'dark';

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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
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

  const prev = () => setActiveSlide((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActiveSlide((i) => (i + 1) % slides.length);

  return (
    <Page>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <Hero
        title="Lorem ipsum dolor sit amet consect alora"
        body="Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
        primaryCta="Primary CTA"
        secondaryCta="Secondary CTA"
      />

      <Carousel slides={slides} activeIndex={activeSlide} isDark={isDark} onPrev={prev} onNext={next} />

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
