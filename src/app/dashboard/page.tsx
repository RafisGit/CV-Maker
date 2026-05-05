"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { getUserCVs, createCV, deleteCV, duplicateCV } from "@/lib/database";
import { CV } from "@/types/cv";
import {
  Plus,
  Trash2,
  Copy,
  Edit,
  FileText,
  Loader2,
  MoreVertical,
} from "lucide-react";

export default function DashboardPage() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const loadCVs = useCallback(async () => {
    try {
      const data = await getUserCVs();
      startTransition(() => {
        setCvs(data);
        setLoading(false);
      });
    } catch {
      startTransition(() => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    loadCVs();
  }, [loadCVs]);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const id = await createCV("Untitled CV");
      router.push(`/builder/${id}`);
    } catch {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this CV?")) return;
    await deleteCV(id);
    setCvs((prev) => prev.filter((cv) => cv.id !== id));
    setMenuOpen(null);
  };

  const handleDuplicate = async (id: string) => {
    await duplicateCV(id);
    await loadCVs();
    setMenuOpen(null);
  };

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">My CVs</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Create and manage your professional resumes
            </p>
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {creating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            New CV
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cvs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 text-border mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No CVs yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first professional CV to get started
            </p>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Create Your First CV
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow group relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => router.push(`/builder/${cv.id}`)}
                  >
                    <h3 className="font-semibold text-lg truncate">
                      {cv.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Template:{" "}
                      <span className="capitalize">{cv.template}</span>
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === cv.id ? null : cv.id)
                      }
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    >
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                    {menuOpen === cv.id && (
                      <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 z-10 w-36">
                        <button
                          onClick={() => router.push(`/builder/${cv.id}`)}
                          className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center gap-2 cursor-pointer"
                        >
                          <Edit className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDuplicate(cv.id)}
                          className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center gap-2 cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" /> Duplicate
                        </button>
                        <button
                          onClick={() => handleDelete(cv.id)}
                          className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center gap-2 text-danger cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {cv.cv_data.personalInfo.fullName && (
                    <p className="truncate">
                      {cv.cv_data.personalInfo.fullName}
                    </p>
                  )}
                  <p className="mt-1">
                    Updated{" "}
                    {new Date(cv.updated_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div
                  className="mt-4 pt-3 border-t border-border cursor-pointer"
                  onClick={() => router.push(`/builder/${cv.id}`)}
                >
                  <span className="text-primary text-sm font-medium hover:underline">
                    Open Editor &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
