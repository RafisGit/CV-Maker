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
      <div className="bg-gray-100 p-4 rounded-lg overflow-auto h-full">
        <div
          ref={ref}
          className="bg-white shadow-lg mx-auto"
          style={{
            width: "210mm",
            minHeight: "297mm",
            transform: "scale(0.55)",
            transformOrigin: "top center",
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    );
  }
);

CVPreview.displayName = "CVPreview";

export default CVPreview;
