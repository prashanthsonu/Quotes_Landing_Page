'use client';

import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { tokens } from '@/lib/tokens';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Carousel, type Slide } from '@/components/Carousel';
import { Faq, type FaqItem } from '@/components/Faq';
import { Footer } from '@/components/Footer';

// ─── Global font variable ────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  :root {
    --font-body: ${tokens.font};
  }
`;

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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const prev = () => setActiveSlide((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActiveSlide((i) => (i + 1) % slides.length);

  return (
    <>
      <GlobalStyle />
      <Page>
        <Navbar />

        <Hero
          title="Lorem ipsum dolor sit amet consect alora"
          body="Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
          primaryCta="Primary CTA"
          secondaryCta="Secondary CTA"
        />

        <Carousel slides={slides} activeIndex={activeSlide} onPrev={prev} onNext={next} />

        <Faq
          heading="Frequently asked questions"
          subtitle="Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis."
          items={faqItems}
        />

        <Footer />
      </Page>
    </>
  );
}
