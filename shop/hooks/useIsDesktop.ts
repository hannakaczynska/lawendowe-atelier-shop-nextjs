"use client";

import { useState, useEffect } from "react";

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function check() {
      const hasHover = window.matchMedia("(hover: hover)").matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;

      setIsDesktop(hasHover && finePointer);
    }

    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop;
}
