"use client";

import Image from "next/image";
import styled from "styled-components";
import { tokens } from "@/lib/tokens";
import { assets } from "@/lib/assets";

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

const NavInner = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 100%;
  width: min(100%, 1368px);
  margin: 0 auto;
`;

const NavInnerLeft = styled.div`
  width: 1312px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
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

  &:focus-visible {
    outline: 2px solid ${tokens.snow};
    outline-offset: 2px;
  }
`;

export function Navbar() {
  return (
    <Nav>
      <NavInner>
        <NavInnerLeft>
          <LogoWrapper>
            <Image
              src={assets.logomark}
              alt="Okta Logo"
              width={36}
              height={36}
              priority
            />
          </LogoWrapper>
        </NavInnerLeft>
        <ThemeToggle type="button" aria-label="Toggle color theme">
          <Image src={assets.sun} alt="" width={16} height={16} />
        </ThemeToggle>
      </NavInner>
    </Nav>
  );
}
