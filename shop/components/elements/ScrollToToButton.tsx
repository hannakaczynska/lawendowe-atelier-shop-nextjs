"use client";
import { useState, useEffect } from "react";
import { scrollToTop } from "@/lib/utils/scrollHelpers";

const SHOW_AFTER_PX = 500;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button onClick={scrollToTop} className="md:hidden fixed bottom-4 right-4">
      <img src="/scroll-up.svg" alt="Scroll to top" className="h-12 w-12" />
    </button>
  );
}