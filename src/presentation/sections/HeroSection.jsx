import { useEffect, useMemo, useState } from "react";

const HERO_IMAGE_SETS = {
  presentation: {
    jpg: "/images/hero/presentation-480.jpg 480w, /images/hero/presentation-768.jpg 768w, /images/hero/presentation-1200.jpg 1200w, /images/hero/presentation-1600.jpg 1600w",
    webp: "/images/hero/presentation-480.webp 480w, /images/hero/presentation-768.webp 768w, /images/hero/presentation-1200.webp 1200w, /images/hero/presentation-1600.webp 1600w",
    fallback: "/images/hero/presentation-1200.jpg",
  },
  "storm-xr": {
    jpg: "/images/hero/storm-xr-480.jpg 480w, /images/hero/storm-xr-768.jpg 768w, /images/hero/storm-xr-1200.jpg 1200w, /images/hero/storm-xr-1600.jpg 1600w",
    webp: "/images/hero/storm-xr-480.webp 480w, /images/hero/storm-xr-768.webp 768w, /images/hero/storm-xr-1200.webp 1200w, /images/hero/storm-xr-1600.webp 1600w",
    fallback: "/images/hero/storm-xr-1200.jpg",
  },
  "flash-r1": {
    jpg: "/images/hero/flash-r1-480.jpg 480w, /images/hero/flash-r1-768.jpg 768w, /images/hero/flash-r1-1200.jpg 1200w, /images/hero/flash-r1-1600.jpg 1600w",
    webp: "/images/hero/flash-r1-480.webp 480w, /images/hero/flash-r1-768.webp 768w, /images/hero/flash-r1-1200.webp 1200w, /images/hero/flash-r1-1600.webp 1600w",
    fallback: "/images/hero/flash-r1-1200.jpg",
  },
  "titan-pro": {
    jpg: "/images/hero/titan-pro-480.jpg 480w, /images/hero/titan-pro-768.jpg 768w, /images/hero/titan-pro-1200.jpg 1200w, /images/hero/titan-pro-1600.jpg 1600w",
    webp: "/images/hero/titan-pro-480.webp 480w, /images/hero/titan-pro-768.webp 768w, /images/hero/titan-pro-1200.webp 1200w, /images/hero/titan-pro-1600.webp 1600w",
    fallback: "/images/hero/titan-pro-1200.jpg",
  },
};

function HeroSection({ products }) {
  const slides = useMemo(
    () => [
      {
        id: "presentation",
        title: "RC Cars Experience",
        subtitle: "Diseno, potencia y precision en cada curva.",
      },
      ...products.map((product) => ({
        id: product.id,
        title: product.name,
        subtitle: product.shortDescription,
      })),
    ],
    [products],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goTo = (index) => setActiveIndex(index);
  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);

  return (
    <section id="inicio" className="pt-0 mt-0 pb-14">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => {
            const responsive = HERO_IMAGE_SETS[slide.id];

            return (
              <article key={slide.id} className="relative min-w-full">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={responsive.webp}
                    sizes="100vw"
                  />
                  <source
                    type="image/jpeg"
                    srcSet={responsive.jpg}
                    sizes="100vw"
                  />
                  <img
                    className="h-[54vh] min-h-[320px] w-full object-cover md:h-[75vh] md:min-h-[420px] lg:h-[88vh] lg:min-h-[500px]"
                    src={responsive.fallback}
                    alt={slide.title}
                    loading={slide.id === "presentation" ? "eager" : "lazy"}
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white md:p-10">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-100">
                    RC Cars
                  </p>
                  <h1 className="mt-1 text-3xl font-black md:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-slate-100 md:text-base">
                    {slide.subtitle}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-bold text-slate-800 transition hover:bg-white"
          aria-label="Slide anterior"
        >
          Prev
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-bold text-slate-800 transition hover:bg-white"
          aria-label="Siguiente slide"
        >
          Next
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Ir al slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition ${
                activeIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
