"use client";

import styled, { keyframes } from "styled-components";
import { tokens } from "@/lib/tokens";
import { assets } from "@/lib/assets";

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

  @media (max-width: ${tokens.bpTablet}) {
    padding: 64px 16px 0;
  }
`;

const Track = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${tokens.bpMobile}) {
    flex-direction: column;
    gap: 0;
  }
`;

const MobileTopPreview = styled.div`
  display: none;

  @media (max-width: ${tokens.bpMobile}) {
    display: block;
    width: calc(100% - 32px);
    max-width: 358px;
    margin: 0 16px;
    margin-bottom: -1px;
    height: 30px;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
  }
`;

const MobileBottomPreview = styled.div`
  display: none;

  @media (max-width: ${tokens.bpMobile}) {
    display: block;
    width: calc(100% - 32px);
    max-width: 358px;
    margin: 0 16px;
    margin-top: -1px;
    height: 30px;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
  }
`;

const LeftPreview = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 558px;

  @media (max-width: ${tokens.bpTablet}) {
    width: 26px;
    height: 560px;
    overflow: hidden;

    & > img {
      object-position: left center;
    }
  }

  @media (max-width: ${tokens.bpMobile}) {
    display: none;
  }
`;

const RightPreview = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 558px;

  @media (max-width: ${tokens.bpTablet}) {
    width: 26px;
    height: 560px;
    overflow: hidden;

    & > img {
      object-position: right center;
    }
  }

  @media (max-width: ${tokens.bpMobile}) {
    display: none;
  }
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
      ? "radial-gradient(223.62% 89.76% at 50% 84.71%, #ff6217 0%, #d24a33 15.44%, #a4324f 30.89%, #77196a 46.33%, #600d78 54.05%, #490186 61.77%, #3d076b 70.25%, #310d50 78.72%, #251334 87.2%, #191919 95.67%)"
      : `url('${assets.rectangle4}')`};
  background-size: cover;
  background-position: center;

  @media (max-width: ${tokens.bpTablet}) {
    width: 706px;
    height: 628px;
    background-position: 10% 80%;
    background-size: 100% 100%;

    ${({ $isDark }) => !$isDark && `
        background-image:  linear-gradient(180deg, rgba(25, 25, 25, 0.00) 71.58%, rgba(25, 25, 25, 0.50) 100%), 
        radial-gradient(85.28% 72.24% at 58.64% 52.31%, #788BEB 0%, #FFFEFA 100%);
      `}
  }

  @media (max-width: ${tokens.bpMobile}) {
    width: 358px;
    height: 566px;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    ${({ $isDark }) => !$isDark && `
        background-image:  linear-gradient(180deg, rgba(25, 25, 25, 0.00) 69.59%, rgba(25, 25, 25, 0.40) 100%), 
        radial-gradient(66.45% 82.96% at 50% 50%, #788BEB 0%, #FFFEFA 100%);
      `}
  }
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

  @media (max-width: ${tokens.bpTablet}) {
    left: 32px;
    top: 32px;
    right: 32px;
    bottom: 32px;
    width: auto;
    height: auto;
  }

  @media (max-width: ${tokens.bpMobile}) {
    left: 16px;
    top: 16px;
    right: 16px;
    bottom: 16px;
  }
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

  gap: 32px;

  @media (max-width: ${tokens.bpTablet}) {
    width: 396px;
    gap: 32px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    width: 236.28px;
    padding: 24px 16px;
    gap: 24px;
  }
`;

const quoteSwap = keyframes`
  from {
    opacity: 0;
    transform: translateX(12px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const QuoteSwap = styled.div`
  animation: ${quoteSwap} var(--dur-base) var(--ease-standard);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Testimonial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

  @media (max-width: ${tokens.bpTablet}) {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.1px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.2px;
  }
`;

const QuoteAuthor = styled.p`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0;
  color: ${tokens.dark};
  margin: 0;
  width: 100%;

  @media (max-width: ${tokens.bpTablet}) {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: 0;
  }

  @media (max-width: ${tokens.bpMobile}) {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.1px;
  }
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

  @media (max-width: ${tokens.bpTablet}) {
    padding-left: 40px;
  }

  @media (max-width: ${tokens.bpMobile}) {
    padding-left: 0;
    padding-bottom: 16px;
    align-items: flex-end;
    justify-content: flex-start;
  }
`;

const Wayfinding = styled.div`
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
  width: 250px;
  flex-shrink: 0;

  @media (max-width: ${tokens.bpMobile}) {
    width: 220px;
    height: 5px;
  }
`;

const WayfindingDot = styled.div<{ $active?: boolean }>`
  height: 5px;
  flex: 1 0 0;
  min-width: 1px;
  border-radius: 24px;
  background: ${({ $active }) =>
    $active
      ? "var(--color-wayfinding-active)"
      : "var(--color-wayfinding-idle)"};
`;

const ArrowGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: ${tokens.bpMobile}) {
    flex-direction: column;
    width: 40px;
    height: 90px;
  }
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
`;

const ArrowCircle = styled.img<{ $isDark?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  display: block;
  filter: ${({ $isDark }) =>
    $isDark ? "brightness(0) saturate(100%)" : "none"};
`;

const ArrowIcon = styled.img<{ $isDark?: boolean }>`
  position: absolute;
  left: 12.5px;
  top: 12.5px;
  width: 15px;
  height: 15px;
  display: block;
  filter: ${({ $isDark }) => ($isDark ? "invert(1)" : "none")};

  @media (max-width: ${tokens.bpMobile}) {
    transform: rotate(90deg);
  }
`;

const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

// ─── Component ────────────────────────────────────────────────────────────────
export function Carousel({
  slides,
  activeIndex = 0,
  isDark = false,
  onPrev,
  onNext,
}: CarouselProps) {
  const current = slides[activeIndex];

  return (
    <Section>
      <Track>
        <MobileTopPreview>
          <PeekImage src={assets.leftPreviewMobile} alt="" />
        </MobileTopPreview>

        <LeftPreview>
          <PeekImage src={assets.leftPreview} alt="" />
        </LeftPreview>

        <Slide $isDark={isDark}>
          <SlideInner>
            <TextCard>
              <QuoteSwap key={activeIndex}>
                <Testimonial>
                  <QuoteText>&ldquo;{current.quote}&rdquo;</QuoteText>
                  <AuthorWrapper>
                    <QuoteAuthor>{current.author}</QuoteAuthor>
                  </AuthorWrapper>
                </Testimonial>
              </QuoteSwap>
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

        <RightPreview>
          <PeekImage src={assets.rightPreview} alt="" />
        </RightPreview>

        <MobileBottomPreview>
          <PeekImage src={assets.rightPreviewMobile} alt="" />
        </MobileBottomPreview>
      </Track>
    </Section>
  );
}
