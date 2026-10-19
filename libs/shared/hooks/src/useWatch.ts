'use client';

import { useEffect, useRef } from 'react';

const DEFAULT_MARGIN = '0px 0px -100px 0px';
const END_DELAY = 3000;

type WatchOptions = {
  splitSelector?: string;
  splitBelow?: number;
  ones?: boolean;
};

function useWatch<T extends HTMLElement = HTMLElement>(
  rootMargin: string = DEFAULT_MARGIN,
  { splitSelector, splitBelow, ones = false }: WatchOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const query =
      splitSelector && splitBelow ? window.matchMedia(`(max-width: ${splitBelow}px)`) : null;

    let teardown: () => void = () => {};

    const attach = () => {
      const targets =
        query?.matches && splitSelector
          ? Array.from(container.querySelectorAll<HTMLElement>(splitSelector))
          : [];

      const watched = targets.length > 0 ? targets : [container];
      const timers: ReturnType<typeof setTimeout>[] = [];

      for (const element of watched) element.classList.add('_watcher-element');

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              entry.target.classList.remove('_watched');
              continue;
            }
            
            entry.target.classList.add('_watched');
            if (ones) {
              observer.unobserve(entry.target);
            }
            timers.push(setTimeout(() => entry.target.classList.add('_end'), END_DELAY));
          }
        },
        { root: null, rootMargin, threshold: 0.1 },
      );

      for (const element of watched) observer.observe(element);

      teardown = () => {
        observer.disconnect();
        for (const timer of timers) clearTimeout(timer);
        for (const element of watched) {
          element.classList.remove('_watcher-element', '_watched', '_end');
        }
      };
    };

    attach();

    const onChange = () => {
      teardown();
      attach();
    };

    query?.addEventListener('change', onChange);

    return () => {
      teardown();
      query?.removeEventListener('change', onChange);
    };
  }, [rootMargin, splitSelector, splitBelow]);

  return ref;
}

export { type WatchOptions, useWatch };