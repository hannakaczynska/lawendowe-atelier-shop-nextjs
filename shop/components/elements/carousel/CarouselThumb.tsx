'use client';

import styles from './Carousel.module.css';

type PropType = {
  selected: boolean;
  image: { src: string; alt: string };
  onClick: () => void;
};

export const Thumb = ({ selected, image, onClick }: PropType) => {
  return (
    <div
      className={`${styles['embla-thumbs__slide']}${selected ? ` ${styles['embla-thumbs__slide--selected']}` : ''}`}
    >
      <button
        onClick={onClick}
        type="button"
        className={styles['embla-thumbs__slide__number']}
      >
        <img src={image.src} alt={image.alt} className="object-cover w-full h-full" />
      </button>
    </div>
  );
};

