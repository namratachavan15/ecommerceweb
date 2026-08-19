import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import MainCarouselData from "./MainCarouselData";

const MainCarousel = () => {
  const items = MainCarouselData.map((item, index) => (
    <div
      key={index}
      onClick={() => {
        window.location.href = item.path;
      }}
      className="
        relative
        w-full
        aspect-[1920/600]
        overflow-hidden
        cursor-pointer
        bg-ink-900
      "
    >
      <img
        src={item.images}
        alt={`Banner ${index + 1}`}
        className="
          w-full
          h-full
          block
          object-fill
        "
      />

      {/* Bottom dark gradient */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-20
          bg-gradient-to-t
          from-ink-900
          via-ink-900/20
          to-transparent
          pointer-events-none
        "
      />
    </div>
  ));

  return (
    <div className="w-full bg-ink-900 overflow-hidden">
      <AliceCarousel
        mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3500}
        infinite
        animationDuration={700}
        disableDotsControls={false}
      />
    </div>
  );
};

export default MainCarousel;