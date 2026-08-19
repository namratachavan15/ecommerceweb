import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const HomeSectionCarosel = ({ data, sectionName }) => {
  const [activeIndex, setActiveindex] = useState(0);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const slidePrev = () => {
    if (activeIndex > 0) {
      setActiveindex(activeIndex - 1);
    }
  };

  const slideNext = () => {
    const maxIndex = Math.max(0, (data?.length || 0) - 5);

    if (activeIndex < maxIndex) {
      setActiveindex(activeIndex + 1);
    }
  };

  const syncActiveIndex = ({ item }) => {
    setActiveindex(item);
  };

  const items = (data || [])
    .slice(0, 10)
    .map((item, index) => (
      <HomeSectionCard
        key={index}
        product={item}
      />
    ));

  if (!items.length) {
    return null;
  }

  return (
    <div className="w-full h-[360px] px-5">

      {/* Section Heading */}
      <div className="flex items-center gap-3 mb-4">
        <span className="h-6 w-1 rounded-full bg-volt-500" />

        <h2 className="text-2xl font-display font-bold text-white">
          {sectionName}
        </h2>
      </div>

      <div className="relative">

        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          activeIndex={activeIndex}
          onSlideChanged={syncActiveIndex}
        />

        {/* NEXT BUTTON */}
        {activeIndex < Math.max(0, items.length - 5) && (
          <Button
            variant="contained"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "-8px",
              transform: "translateY(-50%)",
              bgcolor: "#171F36",
              border: "1px solid rgba(255,255,255,0.1)",
              minWidth: "42px",
              width: "42px",
              height: "50px",
              borderRadius: "8px",
              zIndex: 10,

              "&:hover": {
                bgcolor: "#4F7CFF",
              },
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{
                color: "white",
                transform: "rotate(180deg)",
              }}
            />
          </Button>
        )}

        {/* PREVIOUS BUTTON */}
        {activeIndex > 0 && (
          <Button
            variant="contained"
            onClick={slidePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: "-8px",
              transform: "translateY(-50%)",
              bgcolor: "#171F36",
              border: "1px solid rgba(255,255,255,0.1)",
              minWidth: "42px",
              width: "42px",
              height: "50px",
              borderRadius: "8px",
              zIndex: 10,

              "&:hover": {
                bgcolor: "#4F7CFF",
              },
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{
                color: "white",
              }}
            />
          </Button>
        )}

      </div>
    </div>
  );
};

export default HomeSectionCarosel;