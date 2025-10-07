// LogoSlider.jsx
import { useEffect, useRef } from "react";

export default function LogoSlider() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const clone = track.innerHTML;
    // Duplicate logos for infinite effect
    track.innerHTML += clone;
  }, []);

  const logos = [
    "/microsoft.png",
    "/google.png",
    "/amazon.png",
    // "/apple.png",
    // "/meta.png",
    "/netflix.png",
    "/amazon.png",
    // "/apple.png",
    "/atlra.png",
    "/netflix.png",
    "/paytym.png",
    "/uber.png",
  ];

  return (
    <div className="w-full overflow-hidden bg-gray-50 py-[6rem]">
      <h1 className="mb-[2rem] text-center uppercase text-[1.2rem] text-gray-500 font-semibold ">
        Sponsered By
      </h1>
      <div ref={trackRef} className="flex animate-scroll space-x-14">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="company logo"
            className="h-10 w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
}
