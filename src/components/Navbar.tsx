"use client";

import Image from "next/image";
import styled from "styled-components";
import { tokens } from "@/lib/tokens";
import { assets } from "@/lib/assets";
import { MaxWidth } from "@/components/ui/MaxWidth";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  background: var(--color-navbar-bg);
  box-shadow: ${tokens.shadow};
  display: flex;
  align-items: center;
`;

const NavInner = styled(MaxWidth)`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;

const LogoWrapper = styled.div`
  padding: 6px 0 6px 0;
`;

const ThemeToggle = styled.button`
  width: 32px;
  height: 32px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--color-toggle-bg);
  border: 1px solid transparent;
  cursor: pointer;
  position: absolute;
  right: -56px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 1400px) {
    right: 0;
  }

  &:focus-visible {
    border-color: var(--color-border);
    outline: 2px solid ${tokens.dark};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px var(--color-navbar-bg);
  }
`;

const MoonGlyph = styled(Image)`
  display: block;
`;

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  return (
    <Nav>
      <NavInner>
        <LogoWrapper>
          <Image
            src={isDark ? assets.logomarkDark : assets.logomark}
            alt="Okta Logo"
            width={36}
            height={36}
            priority
          />
        </LogoWrapper>
        <ThemeToggle
          type="button"
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={isDark}
          onClick={onToggleTheme}
        >
          {isDark ? (
            <MoonGlyph src={assets.moon} alt="" width={16} height={16} aria-hidden="true" />
          ) : (
            <Image src={assets.sun} alt="" width={16} height={16} />
          )}
        </ThemeToggle>
      </NavInner>
    </Nav>
  );
}
