"use client";

import { useCVStore } from "@/store/cv-store";
import { Certification } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, Award, ArrowUp, ArrowDown, Copy } from "lucide-react";

export default function CertificationsForm() {
  const {
    data,
    addCertification,
    updateCertification,
    removeCertification,
    reorderCertification,
    duplicateCertification,
  } = useCVStore();

  const handleAdd = () => {
    const newCert: Certification = {
      id: uuidv4(),
      name: "",
      issuer: "",
      date: "",
      link: "",
    };
    addCertification(newCert);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Certifications</h2>
          <p className="text-sm text-muted-foreground">
            Add any relevant certifications (optional)
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-primary text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          Add Certification
        </button>
      </div>

      {data.certifications.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-border rounded-xl bg-card/50">
          <Award className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground mb-3">
            No certifications added yet
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add First Certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="border border-border rounded-xl p-4 bg-card space-y-4 shadow-sm hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">
                    {cert.name || `Certification #${index + 1}`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => reorderCertification(index, index - 1)}
                    disabled={index === 0}
                    title="Move Up"
                    aria-label="Move Up"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderCertification(index, index + 1)}
                    disabled={index === data.certifications.length - 1}
                    title="Move Down"
                    aria-label="Move Down"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateCertification(cert.id)}
                    title="Duplicate Certification"
                    aria-label="Duplicate Certification"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeCertification(cert.id)}
                    title="Delete Certification"
                    aria-label="Delete Certification"
                    className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`cert-name-${cert.id}`} className="block text-sm font-medium mb-1.5">
                    Certification Name *
                  </label>
                  <input
                    id={`cert-name-${cert.id}`}
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(cert.id, { name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div>
                  <label htmlFor={`cert-issuer-${cert.id}`} className="block text-sm font-medium mb-1.5">
                    Issuing Organization
                  </label>
                  <input
                    id={`cert-issuer-${cert.id}`}
                    type="text"
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCertification(cert.id, { issuer: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="Amazon Web Services (AWS)"
                  />
                </div>
                <div>
                  <label htmlFor={`cert-date-${cert.id}`} className="block text-sm font-medium mb-1.5">
                    Issue Date
                  </label>
                  <input
                    id={`cert-date-${cert.id}`}
                    type="month"
                    value={cert.date}
                    onChange={(e) =>
                      updateCertification(cert.id, { date: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`cert-link-${cert.id}`} className="block text-sm font-medium mb-1.5">
                    Credential URL / Verification Link
                  </label>
                  <input
                    id={`cert-link-${cert.id}`}
                    type="url"
                    value={cert.link}
                    onChange={(e) =>
                      updateCertification(cert.id, { link: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="https://credly.com/your-badge"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
