"use client";
import { useEffect } from "react";

export function useDisableScroll(isActive: boolean): void {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);
}
