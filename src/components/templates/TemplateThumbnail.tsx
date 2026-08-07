"use client";

import React, { useEffect, useRef, useState } from "react";
import { CVData } from "@/types/cv";
import { getTemplateComponent } from "@/lib/templates/registry";
import { getColorTheme } from "@/lib/templates/colors";

interface TemplateThumbnailProps {
  templateId: string;
  data: CVData;
  colorTheme?: string;
  className?: string;
}

export default function TemplateThumbnail({
  templateId,
  data,
  colorTheme = "blue",
  className = "",
}: TemplateThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.35);
  const TemplateComponent = getTemplateComponent(templateId);
  const theme = getColorTheme(colorTheme);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 794);
        }
      }
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[210/297] overflow-hidden bg-white select-none ${className}`}
    >
      <div
        style={{
          width: "794px",
          height: "1123px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        {React.createElement(TemplateComponent, { data, colorTheme: theme })}
      </div>
    </div>
  );
}
