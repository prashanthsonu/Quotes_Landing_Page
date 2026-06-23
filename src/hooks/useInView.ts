'use client';

import { useEffect, useRef, useState } from 'react';

const VISIBILITY_THRESHOLD = 0.2;
const VISIBILITY_ROOT_MARGIN = '0px 0px -8% 0px';

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

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

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