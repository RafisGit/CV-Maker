"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import CVBuilder from "@/components/CVBuilder";
import { getCVById } from "@/lib/database";
import { useCVStore } from "@/store/cv-store";
import { Loader2 } from "lucide-react";

export default function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setCvId, setTitle, setTemplate, loadCVData, resetStore } =
    useCVStore();

  useEffect(() => {
    resetStore();

    const loadCV = async () => {
      try {
        const cv = await getCVById(id);
        if (!cv) {
          setError("CV not found");
          return;
        }

        setCvId(cv.id);
        setTitle(cv.title);
        setTemplate(cv.template);
        loadCVData(cv.cv_data);
      } catch {
        setError("Failed to load CV");
      } finally {
        setLoading(false);
      }
    };

    loadCV();
  }, [id, setCvId, setTitle, setTemplate, loadCVData, resetStore]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <p className="text-danger mb-4">{error}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CVBuilder />
    </div>
  );
}
