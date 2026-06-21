"use client";

import Image from "next/image";
import styled from "styled-components";
import { tokens } from "@/lib/tokens";
import { assets } from "@/lib/assets";
import { MaxWidth } from "@/components/ui/MaxWidth";

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
  background: linear-gradient(313deg, #ffffff 1.28%, #e4e0e0 98.72%);
  border: none;
  cursor: pointer;
  position: absolute;
  right: -56px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 1400px) {
    right: 0;
  }

  &:focus-visible {
    outline: 2px solid ${tokens.dark};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px ${tokens.snow};
  }
`;

export function Navbar() {
  return (
    <Nav>
      <NavInner>
        <LogoWrapper>
          <Image
            src={assets.logomark}
            alt="Okta Logo"
            width={36}
            height={36}
            priority
          />
        </LogoWrapper>
        <ThemeToggle type="button" aria-label="Toggle color theme">
          <Image src={assets.sun} alt="" width={16} height={16} />
        </ThemeToggle>
      </NavInner>
    </Nav>
  );
}
