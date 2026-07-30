"use client";

import { CVData, TemplateType } from "@/types/cv";
import { getTemplateComponent } from "@/lib/templates/registry";
import { getColorTheme } from "@/lib/templates/colors";
import { forwardRef } from "react";

interface CVPreviewProps {
  data: CVData;
  template: TemplateType;
  colorTheme?: string;
  scale?: number;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data, template, colorTheme = "blue", scale = 0.55 }, ref) => {
    const TemplateComponent = getTemplateComponent(template);
    const theme = getColorTheme(colorTheme);

    return (
      <div className="bg-gray-100 p-4 rounded-lg overflow-auto h-full flex justify-center">
        {/* UI Scaling Container */}
        <div
          style={{
            width: `calc(210mm * ${scale})`,
            height: `calc(297mm * ${scale})`,
            overflow: "hidden",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
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
              className="bg-white"
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

CVPreview.displayName = "CVPreview";

export default CVPreview;
