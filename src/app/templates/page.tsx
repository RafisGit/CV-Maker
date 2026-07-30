"use client";

import { getAllTemplates, getTemplateComponent } from "@/lib/templates/registry";
import { getColorTheme } from "@/lib/templates/colors";
import { sampleResumeData } from "@/lib/templates/sample-data";
import TemplateThumbnail from "@/components/templates/TemplateThumbnail";
import { TemplateMetadata } from "@/types/template";
import Navbar from "@/components/ui/Navbar";
import { createCV } from "@/lib/database";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { Search, X, SlidersHorizontal, Sparkles, Star, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function TemplatesGallery() {
  const router = useRouter();
  const templates = getAllTemplates();
  
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());
  const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(new Set());
  const [selectedLayouts, setSelectedLayouts] = useState<Set<string>>(new Set());
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    style: true,
    industry: true,
    layout: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (set: Set<string>, setFunction: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) => {
    const newSet = new Set(set);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setFunction(newSet);
  };

  const clearAllFilters = () => {
    setSelectedStyles(new Set());
    setSelectedIndustries(new Set());
    setSelectedLayouts(new Set());
    setSearchQuery("");
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const searchLower = debouncedSearch.toLowerCase();
      const matchesSearch = 
        !debouncedSearch || 
        template.name.toLowerCase().includes(searchLower) || 
        template.description.toLowerCase().includes(searchLower);

      const matchesStyle = selectedStyles.size === 0 || 
        selectedStyles.has(template.style) ||
        selectedStyles.has(template.category) ||
        (template.tags && template.tags.some(tag => selectedStyles.has(tag)));
        
      const matchesIndustry = selectedIndustries.size === 0 || 
        selectedIndustries.has(template.category) ||
        template.industries.some(ind => selectedIndustries.has(ind)) ||
        (template.tags && template.tags.some(tag => selectedIndustries.has(tag)));

      const matchesLayout = selectedLayouts.size === 0 || 
        selectedLayouts.has(template.layout) ||
        (template.tags && template.tags.some(tag => selectedLayouts.has(tag)));

      return matchesSearch && matchesStyle && matchesIndustry && matchesLayout;
    });
  }, [templates, debouncedSearch, selectedStyles, selectedIndustries, selectedLayouts]);

  const activeFilterCount = selectedStyles.size + selectedIndustries.size + selectedLayouts.size;

  const handleUseTemplate = async (templateId: string) => {
    try {
      const cvId = await createCV("My New CV", templateId);
      if (cvId) {
        router.push(`/builder/${cvId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Choose Your Template</h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
            Select from our collection of professional, ATS-friendly templates designed to help you land your dream job.
          </p>
          
          <div className="w-full max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-10 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all shadow-lg backdrop-blur-sm"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500 blur-[100px]" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-500 blur-[100px]" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">Templates ({filteredTemplates.length})</h2>
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center space-x-2 bg-white px-4 py-2 border border-slate-200 rounded-lg shadow-sm font-medium text-slate-700"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters Sidebar */}
        <aside className={`
          ${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-black/50' : 'hidden'} 
          md:block md:w-60 md:shrink-0 md:bg-transparent md:static
        `}>
          <div className={`
            fixed inset-y-0 right-0 w-72 bg-white shadow-xl p-6 overflow-y-auto transition-transform duration-300 ease-in-out
            ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}
            md:static md:w-full md:bg-transparent md:shadow-none md:p-0 md:translate-x-0
          `}>
            
            <div className="flex justify-between items-center mb-6 md:mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2" /> Filters
              </h3>
              <div className="flex items-center space-x-4">
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
                <button 
                  className="md:hidden text-slate-500 hover:text-slate-800"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Style Filter */}
              <div className="border-b border-slate-200 pb-6">
                <button 
                  className="flex justify-between items-center w-full text-left font-semibold text-slate-800 mb-3"
                  onClick={() => toggleSection('style')}
                >
                  Style
                  {expandedSections.style ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                </button>
                {expandedSections.style && (
                  <div className="space-y-2 mt-2">
                    {['modern', 'minimal', 'professional', 'creative', 'elegant', 'corporate', 'ats-friendly'].map(style => (
                      <label key={style} className="flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 transition-colors"
                          checked={selectedStyles.has(style)}
                          onChange={() => toggleFilter(selectedStyles, setSelectedStyles, style)}
                        />
                        <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 capitalize">{style.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Industry Filter */}
              <div className="border-b border-slate-200 pb-6">
                <button 
                  className="flex justify-between items-center w-full text-left font-semibold text-slate-800 mb-3"
                  onClick={() => toggleSection('industry')}
                >
                  Industry
                  {expandedSections.industry ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                </button>
                {expandedSections.industry && (
                  <div className="space-y-2 mt-2">
                    {['software-engineer', 'designer', 'marketing', 'business', 'student', 'medical', 'general'].map(ind => (
                      <label key={ind} className="flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 transition-colors"
                          checked={selectedIndustries.has(ind)}
                          onChange={() => toggleFilter(selectedIndustries, setSelectedIndustries, ind)}
                        />
                        <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 capitalize">{ind.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Layout Filter */}
              <div>
                <button 
                  className="flex justify-between items-center w-full text-left font-semibold text-slate-800 mb-3"
                  onClick={() => toggleSection('layout')}
                >
                  Layout
                  {expandedSections.layout ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                </button>
                {expandedSections.layout && (
                  <div className="space-y-2 mt-2">
                    {['one-column', 'two-column', 'sidebar-left', 'sidebar-right'].map(layout => (
                      <label key={layout} className="flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 transition-colors"
                          checked={selectedLayouts.has(layout)}
                          onChange={() => toggleFilter(selectedLayouts, setSelectedLayouts, layout)}
                        />
                        <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 capitalize">{layout.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="hidden md:flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-slate-800">All Templates <span className="text-slate-500 text-lg font-normal ml-2">({filteredTemplates.length})</span></h2>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No templates found</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                We couldn't find any templates matching your current filters. Try removing some filters to see more results.
              </p>
              <button 
                onClick={clearAllFilters}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => {
                const TemplateComponent = getTemplateComponent(template.id);
                const theme = getColorTheme(template.colorDefault);

                return (
                  <div key={template.id} className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                    
                    <div className="relative aspect-[210/297] bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100">
                      
                      {template.isNew && (
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md flex items-center space-x-1">
                            <Sparkles className="h-3 w-3 mr-1" />
                            NEW
                          </span>
                        </div>
                      )}

                      <TemplateThumbnail templateId={template.id} data={sampleResumeData} colorTheme={template.colorDefault} />

                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center space-y-3 p-6 backdrop-blur-[2px]">
                        <Link 
                          href={`/templates/${template.id}`}
                          className="w-full text-center px-4 py-2.5 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-lg"
                        >
                          Preview
                        </Link>
                        <button 
                          onClick={() => handleUseTemplate(template.id)}
                          className="w-full px-4 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                        >
                          Use Template
                        </button>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{template.name}</h3>
                        {template.atsScore && (
                          <div className="flex items-center text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md ml-2 shrink-0">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {template.atsScore}% ATS
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                        {template.description}
                      </p>
                      
                      <div className="flex items-center space-x-2 mt-auto">
                        <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md capitalize">
                          {template.category}
                        </span>
                        {template.tags && template.tags.slice(0, 1).map(tag => (
                          <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md capitalize">
                            {tag.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
