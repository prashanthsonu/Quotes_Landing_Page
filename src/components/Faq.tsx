'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { assets } from '@/lib/assets';
import { MaxWidth } from '@/components/ui/MaxWidth';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FaqItem {
  question: string;
  answer?: string;
}

export interface FaqProps {
  heading: string;
  subtitle: string;
  items: FaqItem[];
  isDark?: boolean;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const Section = styled.section`
  padding: 96px 0 80px;

  @media (max-width: 1024px) {
    padding: 63px 0 96px;
  }

  @media (max-width: 767px) {
    padding: 63px 0 73px;
  }
`;

const Inner = styled(MaxWidth)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 80px;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 40px;
    max-width: 706px;
  }

  @media (max-width: 767px) {
    gap: 32px;
    max-width: 358px;
    padding: 0 16px;
  }
`;

const TitleCol = styled.div`
  flex: 1;
  max-width: 560px;
  min-width: 0;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: none;
    padding-right: 0;
  }
`;

const Heading = styled.h2`
  font-size: 40px;
  line-height: 48px;
  letter-spacing: -0.8px;
  font-weight: 400;
  color: ${tokens.dark};
  margin: 0;

  @media (max-width: 767px) {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.32px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.1px;
  color: ${tokens.dark};
  margin: 0;
`;

const AccordionGroup = styled.div`
  flex: 1;
  max-width: 640px;
  min-width: 0;
  padding-left: 40px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: none;
    padding-left: 0;
  }
`;

const AccordionItem = styled.div`
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & + & {
    border-top: none;
  }
`;

const AccordionHeader = styled.button`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  outline: none;

  &:focus-visible {
    outline: 2px solid ${tokens.dark};
    outline-offset: 3px;
  }
`;

const AccordionTitle = styled.p`
  flex: 1;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.1px;
  font-weight: 500;
  color: ${tokens.dark};
  margin: 0;
`;

const AccordionIcon = styled.img<{ $isDark?: boolean }>`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  filter: ${({ $isDark }) => ($isDark ? 'invert(1)' : 'none')};
  transition: transform var(--dur-base) var(--ease-standard);
`;

const AccordionBodyWrap = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows var(--dur-base) var(--ease-standard), opacity var(--dur-base) var(--ease-standard);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
`;

const AccordionBodyInner = styled.div`
  overflow: hidden;
`;

const AccordionBody = styled.p`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.2px;
  color: var(--color-faq-answer);
  margin: 0;
`;

// ─── Accordion row ────────────────────────────────────────────────────────────
interface AccordionRowProps extends FaqItem {
  open: boolean;
  isDark?: boolean;
  onToggle: () => void;
}

function AccordionRow({ question, answer, open, isDark, onToggle }: AccordionRowProps) {
  return (
    <AccordionItem>
      <AccordionHeader onClick={onToggle} aria-expanded={open}>
        <AccordionTitle>{question}</AccordionTitle>
        <AccordionIcon
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          $isDark={isDark}
          src={open ? assets.iconMinus : assets.iconPlus}
          alt={open ? 'Collapse' : 'Expand'}
        />
      </AccordionHeader>
      <AccordionBodyWrap $open={open && Boolean(answer)} aria-hidden={!open}>
        <AccordionBodyInner>{answer && <AccordionBody>{answer}</AccordionBody>}</AccordionBodyInner>
      </AccordionBodyWrap>
    </AccordionItem>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Faq({ heading, subtitle, items, isDark = false }: FaqProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section>
      <Inner>
        <TitleCol>
          <Heading>{heading}</Heading>
          <Subtitle>{subtitle}</Subtitle>
        </TitleCol>
        <AccordionGroup>
          {items.map((item, i) => (
            <AccordionRow
              key={item.question}
              {...item}
              open={openIndex === i}
              isDark={isDark}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </AccordionGroup>
      </Inner>
    </Section>
  );
}
