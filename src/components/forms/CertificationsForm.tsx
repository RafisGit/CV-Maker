"use client";

import { useCVStore } from "@/store/cv-store";
import { Certification } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, Award } from "lucide-react";

export default function CertificationsForm() {
  const { data, addCertification, updateCertification, removeCertification } =
    useCVStore();

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
          className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {data.certifications.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <Award className="h-10 w-10 text-border mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No certifications added yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Certification #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeCertification(cert.id)}
                  className="text-danger hover:text-danger-hover transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(cert.id, { name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="AWS Solutions Architect"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCertification(cert.id, { issuer: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date
                  </label>
                  <input
                    type="month"
                    value={cert.date}
                    onChange={(e) =>
                      updateCertification(cert.id, { date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Credential Link
                  </label>
                  <input
                    type="url"
                    value={cert.link}
                    onChange={(e) =>
                      updateCertification(cert.id, { link: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="https://credential.net/..."
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
