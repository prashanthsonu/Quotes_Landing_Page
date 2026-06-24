'use client';

import { useEffect, useRef, useState } from 'react';
import { VISIBILITY_THRESHOLD, VISIBILITY_ROOT_MARGIN } from '@/lib/constants';

interface UseInViewReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  isInView: boolean;
}

export function useInView<T extends HTMLElement>(): UseInViewReturn<T> {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // Fallback for environments without IntersectionObserver support
    if (typeof IntersectionObserver === 'undefined') {
      const fallbackTimer = window.setTimeout(() => {
        setIsInView(true);
      }, 0);

      return () => {
        window.clearTimeout(fallbackTimer);
      };
    }

    // Create an IntersectionObserver to monitor the element's visibility
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: VISIBILITY_THRESHOLD,
        rootMargin: VISIBILITY_ROOT_MARGIN,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isInView };
}