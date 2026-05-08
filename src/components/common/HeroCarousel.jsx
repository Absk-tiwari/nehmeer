import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const HeroCarousel = ({
  images = [],
  autoPlay = true,
  interval = 4000,
  showArrows = true,
  showDots = true,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(infinite ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);

  const extendedImages = infinite
    ? [images[images.length - 1], ...images, images[0]]
    : images;

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(infinite ? index + 1 : index);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (infinite) {
      if (currentIndex === 0) {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          setCurrentIndex(extendedImages.length - 2);
          requestAnimationFrame(() => {
            if (trackRef.current) {
              trackRef.current.style.transition = "transform 0.5s ease-in-out";
            }
          });
        }
      } else if (currentIndex === extendedImages.length - 1) {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          setCurrentIndex(1);
          requestAnimationFrame(() => {
            if (trackRef.current) {
              trackRef.current.style.transition = "transform 0.5s ease-in-out";
            }
          });
        }
      }
    }
  };

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext, images.length]);

  if (!images.length) return null;

  const actualIndex = infinite
    ? (currentIndex - 1 + images.length) % images.length
    : currentIndex;

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        <div
          ref={trackRef}
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedImages.map((image, index) => (
            <div className="carousel-slide" key={index}>
              <img src={image.src} alt={image.alt || `Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {showArrows && images.length > 1 && (
          <>
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={goToPrev}
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>

      {showDots && images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === actualIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
