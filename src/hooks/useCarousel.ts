'use client';

import { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import { type Slide } from '@/components/Carousel';
import { normalizePage } from '@/lib/api-utils';
import {
  CAROUSEL_AUTOPLAY_INTERVAL_MS,
  CAROUSEL_AUTOPLAY_RESUME_DELAY_MS,
  DEFAULT_QUOTES_LIMIT,
} from '@/lib/constants';

interface QuotePageResponse {
  slides: Slide[];
  page: number;
  pageCount: number;
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

  // Fetch a batch of slides for the specified page
  const fetchBatch = useCallback(async (targetPage: number): Promise<number | null> => {
    setIsLoadingBatch(true);

    try {
      const response = await fetch(`/api/quotes?page=${targetPage}&limit=${DEFAULT_QUOTES_LIMIT}`, {
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
  }, []);

  // Move to the previous slide, fetching a new batch if necessary
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

  // Move to the next slide, fetching a new batch if necessary
  const next = useCallback(async (): Promise<void> => {
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
  }, [activeSlide, batchSlides.length, currentPage, fetchBatch, isLoadingBatch, pageCount]);

  // Pause autoplay temporarily when user interacts with the carousel
  const pauseAutoplayTemporarily = () => {
    setIsAutoplayEnabled(false);

    if (autoplayResumeTimeoutRef.current !== null) {
      window.clearTimeout(autoplayResumeTimeoutRef.current);
    }

    autoplayResumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoplayEnabled(true);
      autoplayResumeTimeoutRef.current = null;
    }, CAROUSEL_AUTOPLAY_RESUME_DELAY_MS);
  };

  // Handlers for user interactions that pause autoplay
  const handlePrev = () => {
    pauseAutoplayTemporarily();
    void prev();
  };

  // Handlers for user interactions that pause autoplay
  const handleNext = () => {
    pauseAutoplayTemporarily();
    void next();
  };

  // Keep a reference to the latest next function for use in the autoplay interval
  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  // Clean up the autoplay resume timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (autoplayResumeTimeoutRef.current !== null) {
        window.clearTimeout(autoplayResumeTimeoutRef.current);
      }
    };
  }, []);

  // Set up the autoplay interval
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
    }, CAROUSEL_AUTOPLAY_INTERVAL_MS);

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
