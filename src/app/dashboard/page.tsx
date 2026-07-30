"use client";

import { useEffect, useState, useCallback, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { getUserCVs, createCV, deleteCV, duplicateCV } from "@/lib/database";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { CV } from "@/types/cv";
import { getTemplateComponent, getTemplateMetadata } from "@/lib/templates/registry";
import { getColorTheme } from "@/lib/templates/colors";
import TemplateThumbnail from "@/components/templates/TemplateThumbnail";
import {
  Plus, Trash2, Copy, Edit, FileText, Loader2, MoreVertical,
  Search, SortAsc, LayoutGrid, Clock, Sparkles, ArrowRight,
  X, ChevronRight, Grid, List
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  const loadCVs = useCallback(async () => {
    try {
      const data = await getUserCVs();
      setCvs(data || []);
    } catch (error) {
      console.error("Failed to load CVs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await createClient().auth.getUser();
        const hasDemoUser = typeof window !== "undefined" && !!localStorage.getItem("demo_user_email");
        if (!user && !hasDemoUser && isSupabaseConfigured()) {
          router.push("/auth/login");
          return;
        }
      } catch { /* Fall back to local mode */ }
      loadCVs();
    };
    checkAuth();
  }, [loadCVs, router]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
    setDeletingId(id);
    try {
      await deleteCV(id);
      await loadCVs();
    } catch (error) {
      console.error("Failed to delete CV:", error);
      alert("Failed to delete resume. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    setDuplicatingId(id);
    try {
      await duplicateCV(id);
      await loadCVs();
    } catch (error) {
      console.error("Failed to duplicate CV:", error);
      alert("Failed to duplicate resume. Please try again.");
    } finally {
      setDuplicatingId(null);
    }
  };

  // Stats
  const totalResumes = cvs.length;
  const templatesUsed = new Set(cvs.map(cv => cv.template)).size;
  const lastUpdated = cvs.length > 0 
    ? [...cvs].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0].updated_at
    : null;

  // Formatting date relative
  const getRelativeTime = (dateString: string) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.round((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < -30) {
      return date.toLocaleDateString();
    }
    return rtf.format(diffDays, 'day');
  };

  // Filtering and sorting
  const filteredCVs = useMemo(() => {
    let result = [...cvs];
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(cv => cv.title?.toLowerCase().includes(q) || cv.template.toLowerCase().includes(q));
    }
    
    result.sort((a, b) => {
      switch (sortBy) {
        case "updated":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "name-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "name-desc":
          return (b.title || "").localeCompare(a.title || "");
        default:
          return 0;
      }
    });
    
    return result;
  }, [cvs, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 shadow-xl">
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-3xl opacity-50 mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-900/20 blur-3xl opacity-50 mix-blend-overlay"></div>
          
          <div className="relative z-10 px-8 py-14 md:py-20 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Welcome back! <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
              </h1>
              <p className="text-blue-100 text-lg md:text-xl font-medium max-w-xl">
                You have {totalResumes} {totalResumes === 1 ? 'resume' : 'resumes'} ready. Build your next masterpiece and land that dream job.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <Link 
                href="/templates"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                <Plus className="w-5 h-5" />
                Create New Resume
              </Link>
              <Link
                href="/templates"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-all backdrop-blur-sm active:scale-[0.98]"
              >
                <LayoutGrid className="w-5 h-5" />
                Browse Templates
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Resumes</p>
              <p className="text-2xl font-bold text-gray-900">{totalResumes}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Templates Used</p>
              <p className="text-2xl font-bold text-gray-900">{templatesUsed}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="text-2xl font-bold text-gray-900">{lastUpdated ? getRelativeTime(lastUpdated) : "Never"}</p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        {cvs.length === 0 ? (
          <section className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
            <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
              <FileText className="w-12 h-12" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">No resumes yet</h3>
              <p className="text-gray-500">Get started by choosing a professional template and build your first resume in minutes.</p>
            </div>
            <Link 
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Browse Templates <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        ) : (
          <section className="space-y-6">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resumes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="relative w-full sm:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="updated">Last Updated</option>
                    <option value="created">Recently Created</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                  </select>
                  <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90" />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }>
              {filteredCVs.map((cv) => (
                <ResumeCard 
                  key={cv.id} 
                  cv={cv} 
                  viewMode={viewMode}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  isDeleting={deletingId === cv.id}
                  isDuplicating={duplicatingId === cv.id}
                />
              ))}
              
              {filteredCVs.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-gray-500 text-lg">No resumes found matching "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-blue-600 font-medium hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      
      {/* Global CSS for wave animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave {
          0% { transform: rotate( 0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate( 0.0deg) }
          100% { transform: rotate( 0.0deg) }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
        }
      `}} />
    </div>
  );
}

function ResumeCard({ 
  cv, 
  viewMode,
  onDelete, 
  onDuplicate,
  isDeleting,
  isDuplicating
}: { 
  cv: CV; 
  viewMode: 'grid' | 'list';
  onDelete: (id: string) => void; 
  onDuplicate: (id: string) => void;
  isDeleting: boolean;
  isDuplicating: boolean;
}) {
  const TemplateComponent = getTemplateComponent(cv.template);
  const theme = getColorTheme(cv.colorTheme || 'blue');
  const metadata = getTemplateMetadata(cv.template);

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 overflow-hidden">
          {/* Mini preview */}
          <div className="w-16 h-20 bg-gray-50 rounded border border-gray-200 overflow-hidden relative shrink-0">
             <TemplateThumbnail templateId={cv.template} data={cv.cv_data} colorTheme={cv.colorTheme || 'blue'} />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/builder/${cv.id}`} className="block group-hover:text-blue-600 transition-colors truncate">
              <h3 className="font-bold text-gray-900 text-lg truncate">{cv.title || "Untitled Resume"}</h3>
            </Link>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {metadata?.name || cv.template}
              </span>
              <span>•</span>
              <span>Updated {new Date(cv.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/builder/${cv.id}`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Edit className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => onDuplicate(cv.id)}
            disabled={isDuplicating}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
          >
            {isDuplicating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Copy className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => onDelete(cv.id)}
            disabled={isDeleting}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Thumbnail Preview Area */}
      <div className="relative aspect-[1/1.4] bg-gray-100 overflow-hidden border-b border-gray-100 flex items-center justify-center p-4">
        <Link href={`/builder/${cv.id}`} className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 group-hover:bg-black/5 transition-colors cursor-pointer" />
        
        {/* Render actual template as thumbnail */}
        <TemplateThumbnail templateId={cv.template} data={cv.cv_data} colorTheme={cv.colorTheme || 'blue'} />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px] pointer-events-none">
           <Link 
             href={`/builder/${cv.id}`}
             className="pointer-events-auto w-32 flex items-center justify-center gap-2 py-2.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-blue-50 transition-transform hover:scale-105"
           >
             <Edit className="w-4 h-4" /> Edit
           </Link>
           <button 
             onClick={() => onDuplicate(cv.id)}
             disabled={isDuplicating}
             className="pointer-events-auto w-32 flex items-center justify-center gap-2 py-2.5 bg-white/20 text-white font-medium rounded-full hover:bg-white/30 transition-transform hover:scale-105 backdrop-blur-sm border border-white/20"
           >
             {isDuplicating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Copy className="w-4 h-4" />} Duplicate
           </button>
           <button 
             onClick={() => onDelete(cv.id)}
             disabled={isDeleting}
             className="pointer-events-auto w-32 flex items-center justify-center gap-2 py-2.5 bg-red-500/80 text-white font-medium rounded-full hover:bg-red-500 transition-transform hover:scale-105 backdrop-blur-sm border border-red-500/20"
           >
             {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Delete
           </button>
        </div>
      </div>
      
      {/* Card Info */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/builder/${cv.id}`} className="block group-hover:text-blue-600 transition-colors flex-1 truncate">
            <h3 className="font-bold text-gray-900 truncate text-lg" title={cv.title || "Untitled Resume"}>
              {cv.title || "Untitled Resume"}
            </h3>
          </Link>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
            {metadata?.name || cv.template}
          </span>
          <span className="text-xs text-gray-500 font-medium" title={new Date(cv.updated_at).toLocaleString()}>
            Updated {new Date(cv.updated_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
