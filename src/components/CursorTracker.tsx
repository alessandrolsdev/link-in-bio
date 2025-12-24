"use client";
import { useEffect } from "react";

export const CursorTracker = () => {
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return null;
};