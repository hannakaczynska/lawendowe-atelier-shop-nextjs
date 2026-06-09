"use client";
import { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./CarouselThumb";
import styles from "./Carousel.module.css";

type PropType = {
  images: { src: string; alt: string }[];
  options?: EmblaOptionsType;
};

const Carousel = ({ images, options }: PropType) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaMainRef}>
        <div className={styles.embla__container}>
          {images.map((image, index) => (
            <div className={styles.embla__slide} key={index}>
              <img src={image.src} alt={image.alt} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles['embla-thumbs']}>
        <div className={styles['embla-thumbs__viewport']} ref={emblaThumbsRef}>
          <div className={styles['embla-thumbs__container']}>
            {images.map((image, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                image={image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

