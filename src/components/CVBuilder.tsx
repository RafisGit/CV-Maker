"use client";

import { useRef, useEffect, useCallback } from "react";
import { useCVStore } from "@/store/cv-store";
import { updateCV } from "@/lib/database";
import { TemplateType } from "@/types/cv";
import CVPreview from "@/components/CVPreview";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import SummaryForm from "@/components/forms/SummaryForm";
import EducationForm from "@/components/forms/EducationForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import CertificationsForm from "@/components/forms/CertificationsForm";
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderOpen,
  Award,
  Download,
  Save,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const STEPS = [
  { label: "Personal", icon: User },
  { label: "Summary", icon: FileText },
  { label: "Education", icon: GraduationCap },
  { label: "Experience", icon: Briefcase },
  { label: "Skills", icon: Wrench },
  { label: "Projects", icon: FolderOpen },
  { label: "Certifications", icon: Award },
];

const TEMPLATES: { value: TemplateType; label: string }[] = [
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
  { value: "professional", label: "Professional" },
];

export default function CVBuilder() {
  const {
    cvId,
    title,
    template,
    data,
    activeStep,
    isDirty,
    isSaving,
    setTitle,
    setTemplate,
    setActiveStep,
    setIsSaving,
    markClean,
  } = useCVStore();

  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSave = useCallback(async () => {
    if (!cvId || !isDirty) return;
    setIsSaving(true);
    try {
      await updateCV(cvId, title, template, data);
      markClean();
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setIsSaving(false);
    }
  }, [cvId, isDirty, title, template, data, setIsSaving, markClean]);

  // Auto-save with debounce
  useEffect(() => {
    if (!isDirty || !cvId) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      handleSave();
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [isDirty, cvId, handleSave]);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;

    pdf.addImage(imgData, "PNG", imgX, 0, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${title || "cv"}.pdf`);
  };

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <SummaryForm />;
      case 2:
        return <EducationForm />;
      case 3:
        return <ExperienceForm />;
      case 4:
        return <SkillsForm />;
      case 5:
        return <ProjectsForm />;
      case 6:
        return <CertificationsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Top Bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 max-w-full">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 w-full min-w-0"
              placeholder="CV Title"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Template Selector */}
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as TemplateType)}
              className="px-3 py-1.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {TEMPLATES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              {isSaving ? "Saving..." : isDirty ? "Save" : "Saved"}
            </button>

            {/* Export PDF */}
            <button
              onClick={handleExportPDF}
              className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col overflow-hidden border-r border-border">
          {/* Step Navigation */}
          <div className="border-b border-border bg-muted/50 px-4 py-2 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      activeStep === index
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:bg-background hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {step.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-5">{renderForm()}</div>

          {/* Step Navigation Buttons */}
          <div className="border-t border-border px-5 py-3 flex justify-between bg-card">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="flex items-center gap-1 px-4 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={() =>
                setActiveStep(Math.min(STEPS.length - 1, activeStep + 1))
              }
              disabled={activeStep === STEPS.length - 1}
              className="flex items-center gap-1 px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 cursor-pointer"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="hidden lg:block lg:w-1/2 overflow-hidden">
          <CVPreview ref={previewRef} data={data} template={template} />
        </div>
      </div>
    </div>
  );
}
