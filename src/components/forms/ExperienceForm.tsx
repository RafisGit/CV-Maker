"use client";

import { useCVStore } from "@/store/cv-store";
import { Experience } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, Briefcase } from "lucide-react";

export default function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } =
    useCVStore();

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
          className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {data.experience.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <Briefcase className="h-10 w-10 text-border mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No experience entries yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Experience #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-danger hover:text-danger-hover transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, { company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, { position: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, { location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          current: e.target.checked,
                          endDate: e.target.checked ? "" : exp.endDate,
                        })
                      }
                      className="rounded border-border"
                    />
                    <span className="text-sm">Currently working here</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { startDate: e.target.value })
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
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { endDate: e.target.value })
                    }
                    disabled={exp.current}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    placeholder="Describe your responsibilities and achievements..."
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
