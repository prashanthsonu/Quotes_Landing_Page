'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { assets } from '@/lib/assets';
import { MaxWidth } from '@/components/ui/MaxWidth';

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  background: ${tokens.snow};
  box-shadow: ${tokens.shadow};
  display: flex;
  align-items: center;
`;

const NavInner = styled(MaxWidth)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoImg = styled(Image)`
  display: block;
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  background: linear-gradient(313deg, #ffffff 1.28%, #e4e0e0 98.72%);
  border: none;
  cursor: pointer;
`;

export function Navbar() {
  return (
    <Nav>
      <NavInner>
        <LogoWrapper>
          <LogoImg src={assets.logomark} alt="Acme logo" width={36} height={36} priority />
        </LogoWrapper>
        <ThemeToggle aria-label="Toggle theme">
          <Image src={assets.sun} alt="" width={16} height={16} />
        </ThemeToggle>
      </NavInner>
    </Nav>
  );
}
