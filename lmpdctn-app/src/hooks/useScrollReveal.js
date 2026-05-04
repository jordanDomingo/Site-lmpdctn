import { useEffect, useRef } from 'react';

/**
 * Ajoute la classe "visible" à l'élément ref quand il entre dans le viewport.
 * Utilise IntersectionObserver. Fallback immédiat si non supporté.
 */
export const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};
