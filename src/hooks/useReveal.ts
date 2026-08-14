import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>(threshold = 0.14) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8%" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, threshold]);

  return { ref, isVisible };
}
