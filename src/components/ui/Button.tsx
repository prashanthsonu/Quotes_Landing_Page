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
  transition: background 0.15s ease, color 0.15s ease;
`;

export const PrimaryButton = styled(Base)`
  background: ${tokens.dark};
  color: ${tokens.snow};
  border: none;

  &:hover {
    background: #333;
  }
`;

export const SecondaryButton = styled(Base)`
  background: transparent;
  color: ${tokens.dark};
  border: 1.5px solid ${tokens.dark};

  &:hover {
    background: rgba(25, 25, 25, 0.05);
  }
`;
