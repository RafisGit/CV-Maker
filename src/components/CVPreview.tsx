"use client";

import { CVData, TemplateType } from "@/types/cv";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import { forwardRef } from "react";

interface CVPreviewProps {
  data: CVData;
  template: TemplateType;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data, template }, ref) => {
    const renderTemplate = () => {
      switch (template) {
        case "modern":
          return <ModernTemplate data={data} />;
        case "minimal":
          return <MinimalTemplate data={data} />;
        case "professional":
          return <ProfessionalTemplate data={data} />;
        default:
          return <ModernTemplate data={data} />;
      }
    };

    return (
      <div className="bg-gray-100 p-4 rounded-lg overflow-auto h-full flex justify-center">
        {/* UI Scaling Container */}
        <div
          style={{
            width: "calc(210mm * 0.55)",
            height: "calc(297mm * 0.55)",
            overflow: "hidden",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Transform Layer */}
          <div
            style={{
              transform: "scale(0.55)",
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
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CVPreview.displayName = "CVPreview";

export default CVPreview;
