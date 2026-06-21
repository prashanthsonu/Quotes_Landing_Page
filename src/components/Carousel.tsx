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
  isDark?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}


// ─── Styles ───────────────────────────────────────────────────────────────────
const Section = styled.section`
  background: var(--color-bg-canvas);
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

const LeftPeekFlip = styled.div`
  flex-shrink: 0;
  transform: rotate(360deg) scaleY(1);
`;

const RightPeekClip = styled.div`
  flex-shrink: 0;
  transform: rotate(360deg) scaleY(1);
`;

const PeekImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Slide = styled.div<{ $isDark?: boolean }>`
  width: 1312px;
  height: 628px;
  border-radius: ${tokens.radius6};
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-image: ${({ $isDark }) =>
    $isDark
      ? 'radial-gradient(223.62% 89.76% at 50% 84.71%, #ff6217 0%, #d24a33 15.44%, #a4324f 30.89%, #77196a 46.33%, #600d78 54.05%, #490186 61.77%, #3d076b 70.25%, #310d50 78.72%, #251334 87.2%, #191919 95.67%)'
      : `url('${assets.rectangle4}')`};
  background-size: cover;
  background-position: center;
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
  background: var(--color-card-quote);
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
  background: ${({ $active }) => ($active ? 'var(--color-wayfinding-active)' : 'var(--color-wayfinding-idle)')};
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

const ArrowCircle = styled.img<{ $isDark?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  display: block;
  filter: ${({ $isDark }) => ($isDark ? 'brightness(0) saturate(100%)' : 'none')};
`;

const ArrowIcon = styled.img<{ $isDark?: boolean }>`
  position: absolute;
  left: 12.5px;
  top: 12.5px;
  width: 15px;
  height: 15px;
  display: block;
  filter: ${({ $isDark }) => ($isDark ? 'invert(1)' : 'none')};
`;

// ─── Component ────────────────────────────────────────────────────────────────
export function Carousel({ slides, activeIndex = 0, isDark = false, onPrev, onNext }: CarouselProps) {
  const current = slides[activeIndex];

  return (
    <Section>
      <Track>
        <LeftPeekFlip>
          <PeekImage src={assets.leftPreview} alt="" />
        </LeftPeekFlip>

        <Slide $isDark={isDark}>
          <SlideInner>
            <TextCard>
              <Testimonial>
                <QuoteText>&ldquo;{current.quote}&rdquo;</QuoteText>
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
                  <ArrowCircle src={assets.circle} alt="" $isDark={isDark} />
                  <ArrowIcon src={assets.arrowLeft} alt="" $isDark={isDark} />
                </ArrowButton>
                <ArrowButton onClick={onNext} aria-label="Next slide">
                  <ArrowCircle src={assets.circle} alt="" $isDark={isDark} />
                  <ArrowIcon src={assets.arrowRight} alt="" $isDark={isDark} />
                </ArrowButton>
              </ArrowGroup>
            </SlideBottom>
          </SlideInner>
        </Slide>

        <RightPeekClip>
          <PeekImage src={assets.rightPreview} alt="" />
        </RightPeekClip>
      </Track>
    </Section>
  );
}
