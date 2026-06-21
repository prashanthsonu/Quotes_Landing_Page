'use client';

import styled from 'styled-components';
import { tokens } from '@/lib/tokens';
import { assets } from '@/lib/assets';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Slide {
  quote: string;
  author: string;
}

export interface CarouselProps {
  slides: Slide[];
  activeIndex?: number;
  onPrev?: () => void;
  onNext?: () => void;
}


// ─── Styles ───────────────────────────────────────────────────────────────────
const Section = styled.section`
  padding: 96px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  align-items: center;
`;

const PEEK_WIDTH = 64;
const PEEK_HEIGHT = 558;

/**
 * Outer wrapper for the left peek.
 * rotate(180deg) × scaleY(-1) = net scaleX(-1): horizontally mirrors the card peek.
 * The flip is applied outside the overflow-clip container so clipping isn't affected.
 */
const LeftPeekFlip = styled.div`
  flex-shrink: 0;
  width: ${PEEK_WIDTH}px;
  height: ${PEEK_HEIGHT}px;
  overflow: hidden;
  transform: scaleX(-1);
`;

const RightPeekClip = styled.div`
  flex-shrink: 0;
  width: ${PEEK_WIDTH}px;
  height: ${PEEK_HEIGHT}px;
  overflow: hidden;
`;

const PeekImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;


const Slide = styled.div`
  width: 1312px;
  height: 628px;
  border-radius: ${tokens.radius6};
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-image: url('${assets.rectangle4}');
  background-size: cover;
  background-position: center;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 1312px;
  height: 628px;
  background: linear-gradient(
    to bottom,
    rgba(25, 25, 25, 0) 71.576%,
    rgba(25, 25, 25, 0.3) 100%
  );
`;

const SlideInner = styled.div`
  position: absolute;
  left: 32px;
  top: 32px;
  width: 1248px;
  height: 564px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
`;

const TextCard = styled.div`
  backdrop-filter: blur(50px);
  background: ${tokens.cream};
  border-radius: ${tokens.radius5};
  padding: 32px 24px;
  width: 496px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
`;

const Testimonial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
`;

const QuoteText = styled.p`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.1px;
  color: ${tokens.bodyMuted};
  margin: 0;
  width: 100%;
`;

const QuoteAuthor = styled.p`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0;
  color: ${tokens.dark};
  margin: 0;
  width: 100%;
`;

const SlideBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  flex-shrink: 0;
`;

/** Takes up remaining horizontal space so arrows stay pinned to the right. */
const BottomLeft = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: row;
  align-items: flex-end;
  align-self: stretch;
`;

const WayfindingWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  height: 100%;
  min-width: 1px;
  align-items: center;
  justify-content: center;
  padding-left: 90px;
`;

const Wayfinding = styled.div`
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
  width: 250px;
  flex-shrink: 0;
`;

const WayfindingDot = styled.div<{ $active?: boolean }>`
  height: 5px;
  flex: 1 0 0;
  min-width: 1px;
  border-radius: 24px;
  background: ${({ $active }) => ($active ? tokens.snow : 'rgba(255,255,255,0.5)')};
`;

const ArrowGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

/** Circle SVG fills the full 40×40 button. */
const ArrowCircle = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  display: block;
`;

/** Arrow icon SVG is 15×15, centered in the 40×40 button (12.5 px offset each side). */
const ArrowIcon = styled.img`
  position: absolute;
  left: 12.5px;
  top: 12.5px;
  width: 15px;
  height: 15px;
  display: block;
`;

// ─── Component ────────────────────────────────────────────────────────────────
export function Carousel({ slides, activeIndex = 0, onPrev, onNext }: CarouselProps) {
  const current = slides[activeIndex];

  return (
    <Section>
      <Track>
        {/* Left peek — horizontally mirrored via rotate(180deg) scaleY(-1) = scaleX(-1) */}
        <LeftPeekFlip>
          <PeekImage src={assets.rightPreview} alt="" />
        </LeftPeekFlip>

        <Slide>
          <GradientOverlay />
          <SlideInner>
            <TextCard>
              <Testimonial>
                <QuoteText>"{current.quote}"</QuoteText>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                  <QuoteAuthor>{current.author}</QuoteAuthor>
                </div>
              </Testimonial>
            </TextCard>

            <SlideBottom>
              <BottomLeft>
                <WayfindingWrapper>
                  <Wayfinding>
                    {slides.map((_, i) => (
                      <WayfindingDot key={i} $active={i === activeIndex} />
                    ))}
                  </Wayfinding>
                </WayfindingWrapper>
              </BottomLeft>
              <ArrowGroup>
                <ArrowButton onClick={onPrev} aria-label="Previous slide">
                  <ArrowCircle src={assets.circle} alt="" />
                  <ArrowIcon src={assets.arrowLeft} alt="" />
                </ArrowButton>
                <ArrowButton onClick={onNext} aria-label="Next slide">
                  <ArrowCircle src={assets.circle} alt="" />
                  <ArrowIcon src={assets.arrowRight} alt="" />
                </ArrowButton>
              </ArrowGroup>
            </SlideBottom>
          </SlideInner>
        </Slide>

        {/* Right peek — no flip */}
        <RightPeekClip>
          <PeekImage src={assets.rightPreview} alt="" />
        </RightPeekClip>
      </Track>
    </Section>
  );
}
