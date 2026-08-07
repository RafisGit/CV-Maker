"use client";

import Link from "next/link";
import { 
  FileText, Zap, Download, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, Palette, Cpu, Award
} from "lucide-react";
import { getAllTemplates } from "@/lib/templates/registry";
import { sampleResumeData } from "@/lib/templates/sample-data";
import TemplateThumbnail from "@/components/templates/TemplateThumbnail";

export default function Home() {
  const featuredTemplates = getAllTemplates().slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-white">
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                <FileText className="h-5 w-5" />
              </div>
              <span>ResumeBuilder<span className="text-blue-500">.ai</span></span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/templates"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                <Sparkles className="h-4 w-4 text-blue-400" />
                Templates Gallery
              </Link>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Create My Resume
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          {/* Ambient light glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              SaaS-Powered Next-Gen Resume Builder
            </div>

            <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1]">
              Craft Resumes That <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Land 3x More Interviews
              </span>
            </h1>

            <p className="text-lg sm:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-normal leading-relaxed">
              Professional templates, live real-time split preview, instant PDF download, and full color customization. Adobe Express quality in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/templates"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Browse 30+ Templates <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Go to Dashboard
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-wrap justify-center items-center gap-8 text-slate-400 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 100% ATS Parsable
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant PDF Export
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 30+ Unique Layouts
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> No Registration Required
              </div>
            </div>
          </div>
        </section>

        {/* Featured Templates Showcase */}
        <section className="py-20 bg-slate-900/50 border-y border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Designed for Every Career & Industry
              </h2>
              <p className="text-slate-400 text-lg">
                Pick from our carefully crafted collection of modern, minimal, executive, and ATS-optimized templates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTemplates.map((template) => {
                return (
                  <div 
                    key={template.id} 
                    className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
                  >
                    <div className="relative aspect-[210/297] bg-slate-950 overflow-hidden flex items-center justify-center">
                      <TemplateThumbnail templateId={template.id} data={sampleResumeData} colorTheme={template.colorDefault} />
                      
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center p-4 backdrop-blur-[2px]">
                        <Link
                          href={`/templates/${template.id}`}
                          className="bg-white text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm shadow-xl hover:scale-105 transition-transform"
                        >
                          Preview Template
                        </Link>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-white text-base">{template.name}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 uppercase tracking-wider">
                          ATS {template.atsScore}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{template.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-base transition-colors"
              >
                Explore All Templates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Everything Needed to Win Your Dream Job
              </h2>
              <p className="text-slate-400 text-lg">
                Engineered for maximum speed, perfection, and employer impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-7 w-7 text-blue-400" />}
                title="Live Split Preview"
                description="Edit content on the left while watching your A4 resume render pixel-perfectly on the right in real-time."
              />
              <FeatureCard
                icon={<Palette className="h-7 w-7 text-indigo-400" />}
                title="Dynamic Color Themes"
                description="Switch color palettes across any template with a single click. 8 curated colors per design."
              />
              <FeatureCard
                icon={<Download className="h-7 w-7 text-emerald-400" />}
                title="Pixel-Perfect PDF"
                description="Export high-resolution A4 vector PDFs compatible with recruiters and online application portals."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-7 w-7 text-purple-400" />}
                title="ATS-Proof Parsing"
                description="Built according to international ATS guidelines for maximum machine-readability score."
              />
              <FeatureCard
                icon={<Cpu className="h-7 w-7 text-amber-400" />}
                title="Local Auto-Save"
                description="Your work is preserved automatically as you type so you never lose progress."
              />
              <FeatureCard
                icon={<Award className="h-7 w-7 text-rose-400" />}
                title="Multi-Section Support"
                description="Summary, Experience, Education, Skills, Projects, and Certifications fully covered."
              />
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              Ready to Upgrade Your Career?
            </h2>
            <p className="text-lg text-blue-200 mb-10 max-w-xl mx-auto">
              Build your modern resume in less than 5 minutes. Completely free to start.
            </p>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 bg-white text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-lg shadow-2xl hover:bg-slate-100 transition-all hover:scale-105"
            >
              Build My Resume Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-semibold text-slate-300">
            <FileText className="h-4 w-4 text-blue-500" />
            ResumeBuilder.ai
          </div>
          <div>
            &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
      <div className="mb-4 p-3 rounded-xl bg-slate-800/60 inline-block">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
