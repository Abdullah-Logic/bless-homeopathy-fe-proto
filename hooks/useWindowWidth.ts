"use client";

import { useEffect, useState } from "react";

const useWindowWidth = (onResize?: (width: number) => void) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (typeof onResize === "function") {
        onResize(width);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [onResize]);

  return windowWidth;
};

export default useWindowWidth;
