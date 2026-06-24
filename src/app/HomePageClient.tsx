'use client';

import { useMemo } from 'react';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import { useCarousel } from '@/hooks/useCarousel';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Carousel, type Slide } from '@/components/Carousel';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { fallbackSlides, faqItems } from '../lib/homepage-content';

const Page = styled.div`
  background-color: var(--color-bg-canvas);
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--color-text-primary);
  overflow-x: hidden;
`;

interface HomePageClientProps {
  slides: Slide[];
  initialPageCount: number;
}

export function HomePageClient({ slides, initialPageCount }: HomePageClientProps) {
  const { isDark, toggleTheme } = useTheme();

  const initialSlides = useMemo(() => (slides.length >= 1 ? slides : fallbackSlides.slice(0, 3)), [slides]);

  const { batchSlides, activeSlide, handlePrev, handleNext } = useCarousel({
    initialSlides,
    initialPageCount,
    fallbackSlides,
  });

  return (
    <Page>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <Hero
        title="Lorem ipsum dolor sit amet consect alora"
        body="Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
        primaryCta="Primary CTA"
        secondaryCta="Secondary CTA"
      />

      <Carousel slides={batchSlides} activeIndex={activeSlide} isDark={isDark} onPrev={handlePrev} onNext={handleNext} />

      <Faq heading="Frequently asked questions" subtitle="Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis." items={faqItems} isDark={isDark} />

      <Footer />
    </Page>
  );
}
