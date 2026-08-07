"use client";

import { useCVStore } from "@/store/cv-store";
import { Education } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, GraduationCap, ArrowUp, ArrowDown, Copy } from "lucide-react";

export default function EducationForm() {
  const {
    data,
    addEducation,
    updateEducation,
    removeEducation,
    reorderEducation,
    duplicateEducation,
  } = useCVStore();

  const handleAdd = () => {
    const newEdu: Education = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    addEducation(newEdu);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Education</h2>
          <p className="text-sm text-muted-foreground">
            Add your educational background
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-primary text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
      </div>

      {data.education.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-border rounded-xl bg-card/50">
          <GraduationCap className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground mb-3">
            No education entries yet
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
          {data.education.map((edu, index) => (
            <div
              key={edu.id}
              className="border border-border rounded-xl p-4 bg-card space-y-4 shadow-sm hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">
                    {edu.institution || `Education #${index + 1}`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => reorderEducation(index, index - 1)}
                    disabled={index === 0}
                    title="Move Up"
                    aria-label="Move Up"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderEducation(index, index + 1)}
                    disabled={index === data.education.length - 1}
                    title="Move Down"
                    aria-label="Move Down"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateEducation(edu.id)}
                    title="Duplicate Entry"
                    aria-label="Duplicate Entry"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    title="Delete Entry"
                    aria-label="Delete Entry"
                    className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor={`edu-institution-${edu.id}`} className="block text-sm font-medium mb-1.5">
                    Institution / University *
                  </label>
                  <input
                    id={`edu-institution-${edu.id}`}
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, {
                        institution: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="Stanford University"
                  />
                </div>
                <div>
                  <label htmlFor={`edu-degree-${edu.id}`} className="block text-sm font-medium mb-1.5">
                    Degree
                  </label>
                  <input
                    id={`edu-degree-${edu.id}`}
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, { degree: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <label htmlFor={`edu-field-${edu.id}`} className="block text-sm font-medium mb-1.5">
                    Field of Study
                  </label>
                  <input
                    id={`edu-field-${edu.id}`}
                    type="text"
                    value={edu.field}
                    onChange={(e) =>
                      updateEducation(edu.id, { field: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label htmlFor={`edu-startDate-${edu.id}`} className="block text-sm font-medium mb-1.5">
                    Start Date
                  </label>
                  <input
                    id={`edu-startDate-${edu.id}`}
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { startDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`edu-endDate-${edu.id}`} className="block text-sm font-medium mb-1.5">
                    End Date
                  </label>
                  <input
                    id={`edu-endDate-${edu.id}`}
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { endDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor={`edu-description-${edu.id}`} className="block text-sm font-medium mb-1.5">
                    Description / Key Achievements
                  </label>
                  <textarea
                    id={`edu-description-${edu.id}`}
                    value={edu.description}
                    onChange={(e) =>
                      updateEducation(edu.id, {
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y text-sm"
                    placeholder="Graduated with Honors, Relevant coursework, Dean's List..."
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
