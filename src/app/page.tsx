import Link from "next/link";
import { FileText, Zap, Download, Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-xl font-bold text-primary">
              <FileText className="h-6 w-6" />
              CV Maker
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="py-20 sm:py-32">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
              Build Your Professional CV
              <span className="text-primary"> in Minutes</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Create stunning, ATS-friendly resumes with our intuitive builder.
              Choose from professional templates and export to PDF instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-hover transition-colors"
              >
                Start Building for Free
              </Link>
              <Link
                href="/auth/login"
                className="border border-border text-foreground px-8 py-3 rounded-lg text-lg font-medium hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Everything You Need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Live Preview"
                description="See your CV update in real-time as you type. Split-screen editor makes building effortless."
              />
              <FeatureCard
                icon={<Layout className="h-8 w-8 text-primary" />}
                title="Multiple Templates"
                description="Choose from Modern, Minimal, and Professional templates. Switch between them instantly."
              />
              <FeatureCard
                icon={<Download className="h-8 w-8 text-primary" />}
                title="PDF Export"
                description="Download your CV as a perfectly formatted A4 PDF, ready to send to employers."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CV Maker. All rights reserved.
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
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
