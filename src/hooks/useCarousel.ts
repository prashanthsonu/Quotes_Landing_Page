'use client';

import { useEffect, useRef, useState } from 'react';
import { type Slide } from '@/components/Carousel';

const AUTOPLAY_INTERVAL_MS = 3000;
const AUTOPLAY_RESUME_DELAY_MS = 5000;

interface QuotePageResponse {
  slides: Slide[];
  page: number;
  pageCount: number;
}

function normalizePage(page: number, pageCount: number): number {
  if (pageCount < 1) {
    return 0;
  }

  return ((page % pageCount) + pageCount) % pageCount;
}

interface UseCarouselProps {
  initialSlides: Slide[];
  initialPageCount: number;
  fallbackSlides: Slide[];
}

export function useCarousel({ initialSlides, initialPageCount, fallbackSlides }: UseCarouselProps) {
  const [batchSlides, setBatchSlides] = useState<Slide[]>(initialSlides || fallbackSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(initialPageCount);
  const [isLoadingBatch, setIsLoadingBatch] = useState(false);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const autoplayResumeTimeoutRef = useRef<number | null>(null);
  const nextRef = useRef<(() => Promise<void>) | null>(null);

  const fetchBatch = async (targetPage: number): Promise<number | null> => {
    setIsLoadingBatch(true);

    try {
      const response = await fetch(`/api/quotes?page=${targetPage}&limit=3`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Quote page request failed with status ${response.status}`);
      }

      const payload = (await response.json()) as QuotePageResponse;
      if (payload.slides.length < 1) {
        return null;
      }

      setBatchSlides(payload.slides);
      setCurrentPage(payload.page);
      setPageCount(payload.pageCount);
      return payload.slides.length;
    } catch (error) {
      console.error('Failed to load next quote page', error);
      return null;
    } finally {
      setIsLoadingBatch(false);
    }
  };

  const prev = async (): Promise<void> => {
    if (batchSlides.length <= 1 || isLoadingBatch) {
      return;
    }

    if (activeSlide > 0) {
      setActiveSlide((index) => index - 1);
      return;
    }

    if (pageCount < 1) {
      setActiveSlide(batchSlides.length - 1);
      return;
    }

    const targetPage = normalizePage(currentPage - 1, pageCount);
    const loadedLength = await fetchBatch(targetPage);
    if (typeof loadedLength === 'number') {
      setActiveSlide(loadedLength - 1);
      return;
    }

    setActiveSlide(batchSlides.length - 1);
  };

  const next = async (): Promise<void> => {
    if (batchSlides.length <= 1 || isLoadingBatch) {
      return;
    }

    if (activeSlide < batchSlides.length - 1) {
      setActiveSlide((index) => index + 1);
      return;
    }

    if (pageCount < 1) {
      setActiveSlide(0);
      return;
    }

    const targetPage = normalizePage(currentPage + 1, pageCount);
    const loadedLength = await fetchBatch(targetPage);
    if (typeof loadedLength === 'number') {
      setActiveSlide(0);
      return;
    }

    setActiveSlide(0);
  };

  const pauseAutoplayTemporarily = () => {
    setIsAutoplayEnabled(false);

    if (autoplayResumeTimeoutRef.current !== null) {
      window.clearTimeout(autoplayResumeTimeoutRef.current);
    }

    autoplayResumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoplayEnabled(true);
      autoplayResumeTimeoutRef.current = null;
    }, AUTOPLAY_RESUME_DELAY_MS);
  };

  const handlePrev = () => {
    pauseAutoplayTemporarily();
    void prev();
  };

  const handleNext = () => {
    pauseAutoplayTemporarily();
    void next();
  };

  nextRef.current = next;

  useEffect(() => {
    return () => {
      if (autoplayResumeTimeoutRef.current !== null) {
        window.clearTimeout(autoplayResumeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (batchSlides.length <= 1) {
      return;
    }

    if (!isAutoplayEnabled) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = window.setInterval(() => {
      if (nextRef.current) {
        void nextRef.current();
      }
    }, AUTOPLAY_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [batchSlides.length, isAutoplayEnabled]);

  return {
    batchSlides,
    activeSlide,
    handlePrev,
    handleNext,
  };
}
