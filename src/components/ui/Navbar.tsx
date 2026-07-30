"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { FileText, LogOut, User, LayoutGrid, Sparkles } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserEmail(user?.email ?? (typeof window !== "undefined" ? localStorage.getItem("demo_user_email") : null));
      } catch {
        setUserEmail(typeof window !== "undefined" ? localStorage.getItem("demo_user_email") : null);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore errors in demo mode
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo_user_email");
    }
    setUserEmail(null);
    router.push("/auth/login");
    router.refresh();
  };

  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nav Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xl font-bold text-primary"
            >
              <FileText className="h-6 w-6" />
              <span className="hidden sm:inline">ResumeBuilder</span>
            </Link>

            {userEmail && (
              <div className="hidden md:flex items-center gap-1">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Dashboard
                </Link>
                <Link
                  href="/templates"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/templates")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Templates
                </Link>
              </div>
            )}
          </div>

          {/* Right Side */}
          {userEmail && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline max-w-[160px] truncate">{userEmail}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-danger transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
