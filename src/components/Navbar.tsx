"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { tokens } from "@/lib/tokens";
import { assets } from "@/lib/assets";
import { MaxWidth } from "@/components/ui/MaxWidth";
import { NAVBAR_ENTER_SCROLL_Y, NAVBAR_EXIT_SCROLL_Y } from "@/lib/constants";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Nav = styled.header<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  background: var(--color-navbar-bg);
  box-shadow: ${({ $isScrolled }) => ($isScrolled ? "0 8px 24px rgba(0, 0, 0, 0.08)" : tokens.shadow)};
  backdrop-filter: ${({ $isScrolled }) => ($isScrolled ? "blur(8px)" : "none")};
  display: flex;
  align-items: center;
  transition:
    box-shadow var(--dur-base) var(--ease-standard),
    backdrop-filter var(--dur-base) var(--ease-standard),
    background-color var(--dur-base) var(--ease-standard);
`;

const NavInner = styled(MaxWidth)`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;

  @media (max-width: ${tokens.bpTablet}) {
    padding-left: 34px;
    padding-right: 34px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    padding-left: 20px;
    padding-right: 20px;
  }
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
  transition:
    transform var(--dur-fast) var(--ease-snappy),
    box-shadow var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard);

  @media (max-width: ${tokens.bpTablet}) {
    right: 34px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    right: 20px;
  }

  &:focus-visible {
    border-color: var(--color-border);
    outline: 2px solid ${tokens.dark};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px var(--color-navbar-bg);
  }

  &:hover {
    transform: translateY(-50%) scale(1.04);
  }

  &:active {
    transform: translateY(-50%) scale(0.98);
  }
`;

const MoonGlyph = styled(Image)`
  display: block;
`;

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      setIsScrolled((prev) => {
        if (!prev && y >= NAVBAR_ENTER_SCROLL_Y) {
          return true;
        }

        if (prev && y <= NAVBAR_EXIT_SCROLL_Y) {
          return false;
        }

        return prev;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Nav $isScrolled={isScrolled}>
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
