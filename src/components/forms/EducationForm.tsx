"use client";

import { useCVStore } from "@/store/cv-store";
import { Education } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export default function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useCVStore();

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
          className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {data.education.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <GraduationCap className="h-10 w-10 text-border mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No education entries yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div
              key={edu.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Education #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-danger hover:text-danger-hover transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, {
                        institution: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="University of Example"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, { degree: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) =>
                      updateEducation(edu.id, { field: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      updateEducation(edu.id, {
                        description: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    placeholder="Relevant coursework, achievements, etc."
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
