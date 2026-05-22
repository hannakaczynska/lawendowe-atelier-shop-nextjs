export function setupHeaderVisibility(
  updateState: (state: { headerVisible: boolean }) => void,
): () => void {
  let lastKnownScrollY = window.scrollY;
  let ticking = false;

  return function handleScroll() {
    const currentScrollY = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(() => {
        const isScrollingUp = currentScrollY < lastKnownScrollY;
        const isScrollingDown = currentScrollY > lastKnownScrollY;

        let isHeaderVisible: boolean;

        if (currentScrollY < 100) {
          isHeaderVisible = true;
        } else if (isScrollingUp) {
          isHeaderVisible = true;
        } else if (isScrollingDown) {
          isHeaderVisible = false;
        } else {
          isHeaderVisible = true;
        }

        lastKnownScrollY = currentScrollY;
        ticking = false;

        updateState({ headerVisible: isHeaderVisible });
      });

      ticking = true;
    }
  };
}


export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}