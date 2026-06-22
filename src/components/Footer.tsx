'use client';

import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { MaxWidth } from '@/components/ui/MaxWidth';

// ─── Styles ───────────────────────────────────────────────────────────────────
const FooterEl = styled.footer`
  background: var(--color-footer-bg);
  height: 68px;
  display: flex;
  align-items: center;
`;

const Inner = styled(MaxWidth)`
  display: flex;
  justify-content: center;

  @media (max-width: ${tokens.bpTablet}) {
    max-width: 900px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    max-width: 390px;
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.21px;
  color: var(--color-footer-text);
  margin: 0;
  text-align: center;
`;

// ─── Component ────────────────────────────────────────────────────────────────
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <FooterEl>
      <Inner>
        <Copyright>Copyright &copy; {CURRENT_YEAR} Acme. All rights reserved.</Copyright>
      </Inner>
    </FooterEl>
  );
}
