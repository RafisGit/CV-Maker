"use client";

import { getTemplateMetadata, getTemplatesByCategory } from "@/lib/templates/registry";
import { colorThemeOrder, colorThemes, colorThemeNames, ColorThemeId } from "@/lib/templates/colors";
import { sampleResumeData } from "@/lib/templates/sample-data";
import Navbar from "@/components/ui/Navbar";
import { createCV } from "@/lib/database";
import { useRouter, useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { ArrowLeft, Star, Loader2, Check, Sparkles, Layout, Type } from "lucide-react";
import Link from "next/link";
import TemplateThumbnail from "@/components/templates/TemplateThumbnail";

export default function TemplateDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const template = useMemo(() => getTemplateMetadata(id), [id]);
  const relatedTemplates = useMemo(() => {
    if (!template) return [];
    return getTemplatesByCategory(template.category)
      .filter(t => t.id !== template.id)
      .slice(0, 3);
  }, [template]);

  const [selectedColorId, setSelectedColorId] = useState<ColorThemeId>(
    (template?.colorDefault as ColorThemeId) || 'slate'
  );
  const [isCreating, setIsCreating] = useState(false);

  if (!template) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Template Not Found</h1>
          <p className="text-slate-500 mb-8 max-w-md">The template you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/templates" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Browse Templates
          </Link>
        </div>
      </div>
    );
  }

  const handleUseTemplate = async () => {
    setIsCreating(true);
    try {
      const cvId = await createCV(`My ${template.name} CV`, template.id);
      if (cvId) {
        router.push(`/builder/${cvId}`);
      }
    } catch (e) {
      console.error(e);
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/templates" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Gallery
          </Link>
          <div className="hidden sm:block text-sm font-semibold text-slate-800">
            Preview: {template.name}
          </div>
          <button 
            onClick={handleUseTemplate}
            disabled={isCreating}
            className="px-5 py-2 md:hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center shadow-sm disabled:opacity-70"
          >
            {isCreating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Use
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Preview */}
        <div className="w-full lg:w-3/5 flex justify-center items-start">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
            <TemplateThumbnail templateId={template.id} data={sampleResumeData} colorTheme={selectedColorId} />
          </div>
        </div>

        {/* Right Column: Info Panel */}
        <div className="w-full lg:w-2/5 flex flex-col">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sticky top-24">
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md uppercase tracking-wider">
                {template.category}
              </span>
              {template.isNew && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md uppercase tracking-wider flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New
                </span>
              )}
              {template.atsScore && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md uppercase tracking-wider flex items-center ml-auto">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {template.atsScore}% ATS Match
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{template.name}</h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {template.description}
            </p>

            <hr className="border-slate-100 mb-8" />

            <div className="space-y-8 mb-10">
              
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex justify-between items-center">
                  Color Theme
                  <span className="text-xs font-medium text-slate-500 capitalize">{colorThemeNames[selectedColorId] || selectedColorId}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {colorThemeOrder.slice(0, 10).map((colorId) => {
                    const themeObj = colorThemes[colorId as ColorThemeId];
                    if (!themeObj) return null;
                    const isSelected = selectedColorId === colorId;
                    
                    return (
                      <button
                        key={colorId}
                        onClick={() => setSelectedColorId(colorId as ColorThemeId)}
                        title={colorThemeNames[colorId as ColorThemeId]}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isSelected ? 'ring-2 ring-offset-2 ring-blue-600 scale-110 shadow-md' : 'hover:scale-110 hover:shadow-sm border border-slate-200'
                        }`}
                        style={{ backgroundColor: themeObj.primary }}
                      >
                        {isSelected && <Check className="h-5 w-5 text-white drop-shadow-md" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                    <Layout className="h-4 w-4 mr-2" />
                    Layout
                  </div>
                  <div className="font-semibold text-slate-900 capitalize">
                    {template.layout?.replace('-', ' ') || 'Standard'}
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                    <Type className="h-4 w-4 mr-2" />
                    Typography
                  </div>
                  <div className="font-semibold text-slate-900 capitalize">
                    {template.fonts?.[0] || template.style || 'Modern'}
                  </div>
                </div>
              </div>

            </div>

            <button 
              onClick={handleUseTemplate}
              disabled={isCreating}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin mr-3" />
                  Creating CV...
                </>
              ) : (
                <>
                  Use This Template
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {relatedTemplates.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">More from this category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTemplates.map(related => (
              <Link href={`/templates/${related.id}`} key={related.id} className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 overflow-hidden transition-all duration-200">
                <div className="relative aspect-[210/297] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <TemplateThumbnail templateId={related.id} data={sampleResumeData} colorTheme={related.colorDefault} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900">{related.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1 mt-1">{related.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
