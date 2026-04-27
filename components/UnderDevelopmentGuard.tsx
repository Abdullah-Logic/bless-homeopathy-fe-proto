"use client";

import { useEffect } from "react";
import showUnderDevelopmentAlert from "@/lib/showUnderDevelopmentAlert";

const UnderDevelopmentGuard = () => {
  useEffect(() => {
    const handleInteractiveAttempt = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest<HTMLElement>(
        "[data-interactive='true']",
      );
      if (interactive) return;

      const clickable = target.closest<HTMLElement>(
        "[data-under-development='true']",
      );
      if (!clickable) return;

      event.preventDefault();
      showUnderDevelopmentAlert();
    };

    // Pointer events are more reliable than click synthesis on real touch devices.
    document.addEventListener("pointerup", handleInteractiveAttempt);
    document.addEventListener("touchend", handleInteractiveAttempt, {
      passive: false,
    });
    document.addEventListener("click", handleInteractiveAttempt);
    return () => {
      document.removeEventListener("pointerup", handleInteractiveAttempt);
      document.removeEventListener("touchend", handleInteractiveAttempt);
      document.removeEventListener("click", handleInteractiveAttempt);
    };
  }, []);

  return null;
};

export default UnderDevelopmentGuard;
