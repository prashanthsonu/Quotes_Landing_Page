'use client';

import styled from 'styled-components';
import { tokens } from '@/lib/tokens';

const Base = styled.button`
  font-family: var(--font-body);
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.2px;
  font-weight: 500;
  padding: 16px 48px;
  border-radius: ${tokens.radius2};
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background var(--dur-fast) var(--ease-standard),
    color var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-base) var(--ease-standard),
    transform var(--dur-fast) var(--ease-snappy);

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--color-border);
    outline-offset: 3px;
  }
`;

export const PrimaryButton = styled(Base)`
  background: var(--color-primary-btn-bg);
  color: var(--color-primary-btn-text);
  border: none;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);

  &:hover {
    background: var(--color-primary-btn-bg-hover);
    box-shadow: 0 12px 22px rgba(0, 0, 0, 0.12);
  }
`;

export const SecondaryButton = styled(Base)`
  background: transparent;
  color: var(--color-secondary-btn-text);
  border: 1.5px solid var(--color-secondary-btn-border);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);

  &:hover {
    background: var(--color-secondary-btn-bg-hover);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  }
`;
