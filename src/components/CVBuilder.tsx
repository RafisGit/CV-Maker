"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useCVStore } from "@/store/cv-store";
import { updateCV } from "@/lib/database";
import CVPreview from "@/components/CVPreview";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import SummaryForm from "@/components/forms/SummaryForm";
import EducationForm from "@/components/forms/EducationForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import CertificationsForm from "@/components/forms/CertificationsForm";
import { getAllTemplates } from "@/lib/templates/registry";
import { colorThemeOrder, colorThemes, colorThemeNames } from "@/lib/templates/colors";
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
  Palette,
  Eye,
  EyeOff,
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

export default function CVBuilder() {
  const {
    cvId,
    title,
    template,
    colorTheme,
    data,
    activeStep,
    isDirty,
    isSaving,
    setTitle,
    setTemplate,
    setColorTheme,
    setActiveStep,
    setIsSaving,
    markClean,
  } = useCVStore();

  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const allTemplates = getAllTemplates();

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
      case 0: return <PersonalInfoForm />;
      case 1: return <SummaryForm />;
      case 2: return <EducationForm />;
      case 3: return <ExperienceForm />;
      case 4: return <SkillsForm />;
      case 5: return <ProjectsForm />;
      case 6: return <CertificationsForm />;
      default: return <PersonalInfoForm />;
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

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* Template Selector */}
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {allTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Color Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Palette className="h-3.5 w-3.5" />
                <span
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: colorThemes[colorTheme as keyof typeof colorThemes]?.primary || "#2563eb" }}
                />
              </button>
              {showColorPicker && (
                <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg p-3 z-20 w-48">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Color Theme</p>
                  <div className="grid grid-cols-4 gap-2">
                    {colorThemeOrder.map((id) => (
                      <button
                        key={id}
                        onClick={() => { setColorTheme(id); setShowColorPicker(false); }}
                        className="flex flex-col items-center gap-1 cursor-pointer group"
                        title={colorThemeNames[id]}
                      >
                        <span
                          className={`w-7 h-7 rounded-full border-2 transition-all group-hover:scale-110 ${
                            colorTheme === id ? "border-foreground ring-2 ring-primary/30" : "border-border"
                          }`}
                          style={{ backgroundColor: colorThemes[id].primary }}
                        />
                        <span className="text-[10px] text-muted-foreground">{colorThemeNames[id]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Preview Toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showPreview ? "Edit" : "Preview"}
            </button>

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
        <div className={`w-full lg:w-1/2 flex flex-col overflow-hidden border-r border-border ${showPreview ? "hidden lg:flex" : "flex"}`}>
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
        <div className={`lg:w-1/2 overflow-hidden ${showPreview ? "block w-full" : "hidden lg:block"}`}>
          <CVPreview ref={previewRef} data={data} template={template} colorTheme={colorTheme} />
        </div>
      </div>
    </div>
  );
}
