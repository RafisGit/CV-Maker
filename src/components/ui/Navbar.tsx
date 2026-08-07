"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { FileText, LogOut, User, LayoutGrid, Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
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
              <span>ResumeBuilder</span>
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

          {/* Right Side - Desktop */}
          {userEmail ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="max-w-[160px] truncate">{userEmail}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-danger transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-primary text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-primary-hover transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {userEmail ? (
            <>
              <div className="flex items-center gap-3 py-2 px-3 bg-muted/60 rounded-lg text-sm text-muted-foreground">
                <User className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate font-medium text-foreground">{userEmail}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/templates"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/templates")
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  Templates
                </Link>
              </div>
              <div className="pt-2 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-danger/10 text-danger text-sm font-medium hover:bg-danger/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-1">
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
