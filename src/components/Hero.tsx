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
  background: linear-gradient(
    75deg,
    ${tokens.snow} -65.58%,
    ${tokens.cream} 29.37%,
    ${tokens.sand} 217.98%
  );
  overflow: hidden;
`;

const Inner = styled(MaxWidth)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 0;
  min-height: 548px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  justify-content: center;
  padding: 64px 0;
  flex: 1;
  max-width: 600px;
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
  opacity: 0.66;
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
`;

const Body = styled.p`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0;
  color: ${tokens.bodyMuted};
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const ImageFrame = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
  align-self: stretch;
  overflow: hidden;
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
