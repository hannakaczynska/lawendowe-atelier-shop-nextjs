    import { useEffect } from "react";

    export default function useStickyElement(triggerId: string, elementId: string, offset: number = 150) {
    useEffect(() => {
    const element = document.getElementById(elementId);
    const trigger = document.getElementById(triggerId);

    if (!element || !trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          element.classList.add("fixed", `top-[${offset}px]`);
        } else {
          element.classList.remove("fixed", `top-[${offset}px]`);
        }
      },
      { threshold: 0 }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, []);
}