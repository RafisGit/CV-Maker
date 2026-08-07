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
  Check,
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
  const [isExporting, setIsExporting] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const allTemplates = getAllTemplates();

  const handleSave = useCallback(async () => {
    if (!cvId) return;
    setIsSaving(true);
    try {
      await updateCV(cvId, title, template, data, colorTheme);
      markClean();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setIsSaving(false);
    }
  }, [cvId, title, template, data, colorTheme, setIsSaving, markClean]);

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
    if (!previewRef.current || isExporting) return;
    setIsExporting(true);

    try {
      const sourceEl = previewRef.current;

      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0px";
      container.style.width = "794px";
      container.style.backgroundColor = "#ffffff";
      container.style.zIndex = "-9999";

      const clone = sourceEl.cloneNode(true) as HTMLElement;
      clone.style.transform = "none";
      clone.style.width = "794px";
      clone.style.minHeight = "1123px";

      container.appendChild(clone);
      document.body.appendChild(container);

      await new Promise((resolve) => setTimeout(resolve, 150));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          // 1. Monkey-patch getComputedStyle in cloned window so html2canvas never encounters lab/oklch color functions
          const win = clonedDoc.defaultView;
          if (win) {
            const origGetComputedStyle = win.getComputedStyle;
            win.getComputedStyle = function (elt: Element, pseudoElt?: string | null) {
              const style = origGetComputedStyle.call(this, elt, pseudoElt);
              return new Proxy(style, {
                get(target: CSSStyleDeclaration, prop: string | symbol) {
                  const val = Reflect.get(target, prop);
                  if (typeof val === "string" && /(lab|oklch|oklab|color-mix)\(/i.test(val)) {
                    return val.replace(/(lab|oklch|oklab|color-mix)\([^)]*\)/gi, "rgba(0,0,0,0.1)");
                  }
                  if (typeof val === "function") {
                    return function (...args: unknown[]) {
                      const res = val.apply(target, args);
                      if (typeof res === "string" && /(lab|oklch|oklab|color-mix)\(/i.test(res)) {
                        return res.replace(/(lab|oklch|oklab|color-mix)\([^)]*\)/gi, "rgba(0,0,0,0.1)");
                      }
                      return res;
                    };
                  }
                  return val;
                },
              });
            };
          }

          // 2. Delete CSSOM cssRules containing unsupported color functions
          try {
            Array.from(clonedDoc.styleSheets).forEach((sheet) => {
              try {
                const rules = Array.from(sheet.cssRules || []);
                for (let i = rules.length - 1; i >= 0; i--) {
                  const rule = rules[i];
                  if (rule.cssText && /(lab|oklch|oklab|color-mix)\(/i.test(rule.cssText)) {
                    sheet.deleteRule(i);
                  }
                }
              } catch {
                // Ignore cross-origin rules
              }
            });
          } catch {
            // Ignore stylesheet access issues
          }

          // 3. Clean up inline element styles
          const allElements = clonedDoc.querySelectorAll<HTMLElement>("*");
          allElements.forEach((el) => {
            if (el.style && el.style.cssText) {
              if (/(lab|oklch|oklab|color-mix)/i.test(el.style.cssText)) {
                el.style.cssText = el.style.cssText.replace(/(lab|oklch|oklab|color-mix)\([^)]*\)/gi, "rgba(0,0,0,0.1)");
              }
            }
          });
        },
      });

      document.body.removeChild(container);

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pageHeightInCanvasPx = Math.floor(canvasWidth * (297 / 210));
      const totalPages = Math.ceil(canvasHeight / pageHeightInCanvasPx);

      for (let i = 0; i < totalPages; i++) {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvasWidth;
        pageCanvas.height = pageHeightInCanvasPx;

        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvasWidth, pageHeightInCanvasPx);
          ctx.drawImage(
            canvas,
            0,
            i * pageHeightInCanvasPx,
            canvasWidth,
            pageHeightInCanvasPx,
            0,
            0,
            canvasWidth,
            pageHeightInCanvasPx
          );
        }

        const sliceData = pageCanvas.toDataURL("image/png");
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(sliceData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`${title || "CV"}.pdf`);
    } catch (err) {
      console.error("Failed to export PDF:", err);
    } finally {
      setIsExporting(false);
    }
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
              disabled={isSaving}
              className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : justSaved ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              {isSaving ? "Saving..." : justSaved ? "Saved!" : isDirty ? "Save" : "Saved"}
            </button>

            {/* Export PDF */}
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
            >
              {isExporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {isExporting ? "Exporting..." : "PDF"}
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
