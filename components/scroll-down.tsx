"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export const ScrollDown = () => {
  const [show, setShow] = useState(true);

  window.onscroll = (_) => {
    window.scrollY !== 0 ? setShow(false) : setShow(true);
  };

  if (!show) return null;

  return (
    <div
      onClick={() =>
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
      }
      className="flex-[0.1] flex flex-col items-center justify-center group"
    >
      <ChevronDownIcon className="cursor-pointer sm:text-3xl md:text-5xl lg:text-6xl text-muted-foreground duration-300 group-hover:scale-125 group-hover:text-current" />
    </div>
  );
};
