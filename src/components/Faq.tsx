'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { MaxWidth } from '@/components/ui/MaxWidth';
import { AccordionRow } from '@/components/Accordion';

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

  @media (max-width: ${tokens.bpTablet}) {
    padding: 63px 0 96px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    padding: 63px 0 73px;
  }
`;

const Inner = styled(MaxWidth)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 80px;

  @media (max-width: ${tokens.bpTablet}) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 40px;
    max-width: 706px;
  }

  @media (max-width: ${tokens.bpMobile}) {
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

  @media (max-width: ${tokens.bpTablet}) {
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

  @media (max-width: ${tokens.bpMobile}) {
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

  @media (max-width: ${tokens.bpTablet}) {
    width: 100%;
    max-width: none;
    padding-left: 0;
  }
`;



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
