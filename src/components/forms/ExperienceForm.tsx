"use client";

import { useCVStore } from "@/store/cv-store";
import { Experience } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, Briefcase, ArrowUp, ArrowDown, Copy } from "lucide-react";

export default function ExperienceForm() {
  const {
    data,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,
    duplicateExperience,
  } = useCVStore();

  const handleAdd = () => {
    const newExp: Experience = {
      id: uuidv4(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    addExperience(newExp);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Work Experience</h2>
          <p className="text-sm text-muted-foreground">
            Add your professional experience
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-primary text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      {data.experience.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-border rounded-xl bg-card/50">
          <Briefcase className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground mb-3">
            No experience entries yet
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add First Entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="border border-border rounded-xl p-4 bg-card space-y-4 shadow-sm hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">
                    {exp.position ? `${exp.position}${exp.company ? ` at ${exp.company}` : ''}` : `Experience #${index + 1}`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => reorderExperience(index, index - 1)}
                    disabled={index === 0}
                    title="Move Up"
                    aria-label="Move Up"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderExperience(index, index + 1)}
                    disabled={index === data.experience.length - 1}
                    title="Move Down"
                    aria-label="Move Down"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateExperience(exp.id)}
                    title="Duplicate Entry"
                    aria-label="Duplicate Entry"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    title="Delete Entry"
                    aria-label="Delete Entry"
                    className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`exp-company-${exp.id}`} className="block text-sm font-medium mb-1.5">
                    Company / Organization *
                  </label>
                  <input
                    id={`exp-company-${exp.id}`}
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, { company: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="Google / Acme Corp"
                  />
                </div>
                <div>
                  <label htmlFor={`exp-position-${exp.id}`} className="block text-sm font-medium mb-1.5">
                    Job Title / Position *
                  </label>
                  <input
                    id={`exp-position-${exp.id}`}
                    type="text"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, { position: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div>
                  <label htmlFor={`exp-location-${exp.id}`} className="block text-sm font-medium mb-1.5">
                    Location
                  </label>
                  <input
                    id={`exp-location-${exp.id}`}
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, { location: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="San Francisco, CA (or Remote)"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2 select-none">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          current: e.target.checked,
                          endDate: e.target.checked ? "Present" : exp.endDate === "Present" ? "" : exp.endDate,
                        })
                      }
                      className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-sm font-medium text-foreground">Currently working here</span>
                  </label>
                </div>
                <div>
                  <label htmlFor={`exp-startDate-${exp.id}`} className="block text-sm font-medium mb-1.5">
                    Start Date
                  </label>
                  <input
                    id={`exp-startDate-${exp.id}`}
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { startDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`exp-endDate-${exp.id}`} className="block text-sm font-medium mb-1.5">
                    End Date
                  </label>
                  <input
                    id={`exp-endDate-${exp.id}`}
                    type="month"
                    value={exp.current ? "" : exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { endDate: e.target.value })
                    }
                    disabled={exp.current}
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm disabled:opacity-50 disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor={`exp-description-${exp.id}`} className="block text-sm font-medium mb-1.5">
                    Key Responsibilities & Bullet Achievements
                  </label>
                  <textarea
                    id={`exp-description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y text-sm"
                    placeholder="• Spearheaded design and architecture of scalable REST microservices&#10;• Increased user engagement by 40% using React and Next.js"
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
