import React, { useState } from "react";

const slides = [{ type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" }];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="relative w-[300px] overflow-hidden rounded-2xl shadow-lg">
    {/* Carousel Slide */}
    <div className="relative">
      {slides[currentIndex].type === "image" ? (
        <img
          src={slides[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-[800px] object-cover"
        />
      ) : (
        <video
          src={slides[currentIndex].src}
          className="w-full object-cover"
          style={{ height: "100%", width: "100%", display: "block"}}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
    </div>
  </div>
</div>
  );
};

export default Carousel;
