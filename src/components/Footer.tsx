'use client';

import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { MaxWidth } from '@/components/ui/MaxWidth';

// ─── Styles ───────────────────────────────────────────────────────────────────
const FooterEl = styled.footer`
  background: ${tokens.dark};
  height: 68px;
  display: flex;
  align-items: center;
`;

const Inner = styled(MaxWidth)`
  display: flex;
  justify-content: center;
`;

const Copyright = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.21px;
  color: ${tokens.snow};
  margin: 0;
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
