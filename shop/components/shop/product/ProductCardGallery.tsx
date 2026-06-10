import Carousel from "../../elements/carousel/Carousel";

export default function ProductGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <section className="lg:col-start-1 lg:row-start-1">
      <Carousel images={images} />
    </section>
  );
}
