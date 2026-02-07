"use client";

import { DitheringShader } from "@/components/ui/dithering-shader";
import { useEffect, useState } from "react";

export function HeroShader() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="absolute inset-0 opacity-30">
      <DitheringShader
        shape="wave"
        type="8x8"
        colorBack="#000000"
        colorFront="#22c55e"
        pxSize={3}
        speed={0.4}
        width={dimensions.width}
        height={dimensions.height}
        className="!w-full !h-full"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Bottom fade to seamless black transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
