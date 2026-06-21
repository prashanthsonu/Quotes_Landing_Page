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
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const Section = styled.section`
  padding: 96px 0 80px;
`;

const Inner = styled(MaxWidth)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 80px;
`;

const TitleCol = styled.div`
  flex: 1;
  max-width: 560px;
  min-width: 0;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Heading = styled.h2`
  font-size: 40px;
  line-height: 48px;
  letter-spacing: -0.8px;
  font-weight: 400;
  color: ${tokens.dark};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.1px;
  color: ${tokens.bodyMuted};
  margin: 0;
`;

const AccordionGroup = styled.div`
  flex: 1;
  max-width: 640px;
  min-width: 0;
  padding-left: 40px;
`;

const AccordionItem = styled.div`
  border-top: 1px solid ${tokens.dark};
  border-bottom: 1px solid ${tokens.dark};
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

const AccordionIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const AccordionBody = styled.p`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.2px;
  color: ${tokens.dark};
  margin: 0;
`;

// ─── Accordion row ────────────────────────────────────────────────────────────
interface AccordionRowProps extends FaqItem {
  open: boolean;
  onToggle: () => void;
}

function AccordionRow({ question, answer, open, onToggle }: AccordionRowProps) {
  return (
    <AccordionItem>
      <AccordionHeader onClick={onToggle} aria-expanded={open}>
        <AccordionTitle>{question}</AccordionTitle>
        <AccordionIcon
          src={open ? assets.iconMinus : assets.iconPlus}
          alt={open ? 'Collapse' : 'Expand'}
        />
      </AccordionHeader>
      {open && answer && <AccordionBody>{answer}</AccordionBody>}
    </AccordionItem>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Faq({ heading, subtitle, items }: FaqProps) {
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
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </AccordionGroup>
      </Inner>
    </Section>
  );
}
