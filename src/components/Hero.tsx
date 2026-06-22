'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { assets } from '@/lib/assets';
import { MaxWidth } from '@/components/ui/MaxWidth';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface HeroProps {
  kicker?: { platform: string; feature: string };
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const Section = styled.section`
  background: var(--color-hero-gradient);
  overflow: hidden;

  @media (max-width: ${tokens.bpTablet}) {
    margin: 0 33px;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    margin: 0;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const Inner = styled(MaxWidth)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 0;
  min-height: 548px;

  @media (max-width: ${tokens.bpTablet}) {
    flex-direction: column;
    min-height: auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  justify-content: center;
  padding: 64px 0;
  flex: 1;
  max-width: 600px;

  @media (max-width: ${tokens.bpTablet}) {
    flex: none;
    gap: 48px;
    max-width: none;
    padding: 48px 64px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    gap: 40px;
    padding: 40px 16px;
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const KickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.1px;
  color: ${tokens.dark};

  @media (max-width: ${tokens.bpMobile}) {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.1px;
  }
`;

const KickerSep = styled.span`
  display: inline-flex;
  align-items: center;
  opacity: 0.66;
`;

const Title = styled.h1`
  font-size: 56px;
  line-height: 64px;
  letter-spacing: -1.12px;
  font-weight: 400;
  color: ${tokens.dark};
  margin: 0;

  @media (max-width: ${tokens.bpTablet}) {
    font-size: 48px;
    line-height: 56px;
    letter-spacing: -0.96px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -0.8px;
  }
`;

const Body = styled.p`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0;
  color: ${tokens.bodyMuted};
  margin: 0;

  @media (max-width: ${tokens.bpMobile}) {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.1px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: ${tokens.bpTablet}) {
    flex-direction: column;
    width: 100%;

    > button {
      width: 100%;
    }
  }
`;

const ImageFrame = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
  align-self: stretch;
  overflow: hidden;

  @media (max-width: ${tokens.bpTablet}) {
    flex: none;
    width: 100%;
    max-width: none;
    height: 560px;
    min-height: 560px;
    max-height: 560px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    height: 390px;
    min-height: 390px;
    max-height: 390px;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export function Hero({
  kicker = { platform: 'Platform or Solution', feature: 'Feature or Page Title' },
  title,
  body,
  primaryCta,
  secondaryCta,
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  return (
    <Section>
      <Inner>
        <Content>
          <Copy>
            <div>
              <KickerRow>
                <span>{kicker.platform}</span>
                <KickerSep aria-hidden="true">
                  <Image src={assets.chevronRight} alt="" width={16} height={16} />
                </KickerSep>
                <span>{kicker.feature}</span>
              </KickerRow>
              <Title>{title}</Title>
            </div>
            <Body>{body}</Body>
          </Copy>
          <ButtonGroup>
            <PrimaryButton onClick={onPrimaryClick}>{primaryCta}</PrimaryButton>
            <SecondaryButton onClick={onSecondaryClick}>{secondaryCta}</SecondaryButton>
          </ButtonGroup>
        </Content>
        <ImageFrame>
          <Image
            src={assets.heroImage}
            alt="Hero preview"
            fill
            style={{ objectFit: 'contain', pointerEvents: 'none' }}
            priority
          />
        </ImageFrame>
      </Inner>
    </Section>
  );
}
