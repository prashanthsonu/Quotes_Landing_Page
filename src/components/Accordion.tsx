'use client';

import { useId } from 'react';
import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { assets } from '@/lib/assets';
import type { FaqItem } from '@/components/Faq';

// ─── Styles ───────────────────────────────────────────────────────────────────
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

// ─── Component ────────────────────────────────────────────────────────────────
interface AccordionRowProps extends FaqItem {
  open: boolean;
  isDark?: boolean;
  onToggle: () => void;
}

export function AccordionRow({ question, answer, open, isDark, onToggle }: AccordionRowProps) {
  const panelId = useId();
  const triggerId = `${panelId}-trigger`;

  return (
    <AccordionItem>
      <AccordionHeader
        id={triggerId}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <AccordionTitle>{question}</AccordionTitle>
        <AccordionIcon
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          $isDark={isDark}
          src={open ? assets.iconMinus : assets.iconPlus}
          alt={open ? 'Collapse' : 'Expand'}
        />
      </AccordionHeader>
      <AccordionBodyWrap
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        $open={open && Boolean(answer)}
        aria-hidden={!open}
      >
        <AccordionBodyInner>{answer && <AccordionBody>{answer}</AccordionBody>}</AccordionBodyInner>
      </AccordionBodyWrap>
    </AccordionItem>
  );
}
