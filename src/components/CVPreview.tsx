"use client";

import React, { forwardRef, memo } from "react";
import { CVData, TemplateType } from "@/types/cv";
import { getTemplateComponent } from "@/lib/templates/registry";
import { getColorTheme } from "@/lib/templates/colors";

interface CVPreviewProps {
  data: CVData;
  template: TemplateType;
  colorTheme?: string;
  scale?: number;
}

const CVPreviewComponent = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data, template, colorTheme = "blue", scale = 0.55 }, ref) => {
    const TemplateComponent = getTemplateComponent(template);
    const theme = getColorTheme(colorTheme);

    return (
      <div className="bg-muted/40 p-4 rounded-xl overflow-auto h-full flex justify-center items-start">
        {/* UI Scaling Container */}
        <div
          className="my-auto shadow-2xl rounded-sm transition-transform duration-200"
          style={{
            width: `calc(210mm * ${scale})`,
            minHeight: `calc(297mm * ${scale})`,
            backgroundColor: "#fff",
          }}
        >
          {/* Transform Layer */}
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {/* Capture Target (Full Size) */}
            <div
              ref={ref}
              className="bg-white text-black"
              style={{
                width: "210mm",
                minHeight: "297mm",
              }}
            >
              <TemplateComponent data={data} colorTheme={theme} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CVPreviewComponent.displayName = "CVPreview";

const CVPreview = memo(CVPreviewComponent);
export default CVPreview;
