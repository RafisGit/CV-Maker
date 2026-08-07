"use client";

import { useCVStore } from "@/store/cv-store";
import { Skill } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, Wrench, ArrowUp, ArrowDown } from "lucide-react";

const LEVELS: Skill["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function SkillsForm() {
  const { data, addSkill, updateSkill, removeSkill, reorderSkill } = useCVStore();

  const handleAdd = () => {
    const newSkill: Skill = {
      id: uuidv4(),
      name: "",
      level: "Intermediate",
    };
    addSkill(newSkill);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Skills</h2>
          <p className="text-sm text-muted-foreground">
            List your technical and professional skills
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-primary text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </button>
      </div>

      {data.skills.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-border rounded-xl bg-card/50">
          <Wrench className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground mb-3">No skills added yet</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add First Skill
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.skills.map((skill, index) => (
            <div
              key={skill.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 border border-border rounded-xl p-3 bg-card shadow-sm hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <input
                  id={`skill-name-${skill.id}`}
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(skill.id, { name: e.target.value })
                  }
                  aria-label={`Skill name ${index + 1}`}
                  className="flex-1 px-3.5 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                  placeholder="e.g. React, Python, Project Management"
                />
              </div>

              <div className="flex items-center gap-2 justify-between sm:justify-end shrink-0 pl-8 sm:pl-0">
                <select
                  id={`skill-level-${skill.id}`}
                  value={skill.level}
                  onChange={(e) =>
                    updateSkill(skill.id, {
                      level: e.target.value as Skill["level"],
                    })
                  }
                  aria-label={`Skill level ${index + 1}`}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm bg-background font-medium"
                >
                  {LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => reorderSkill(index, index - 1)}
                    disabled={index === 0}
                    title="Move Up"
                    aria-label="Move Up"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderSkill(index, index + 1)}
                    disabled={index === data.skills.length - 1}
                    title="Move Down"
                    aria-label="Move Down"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    title="Delete Skill"
                    aria-label="Delete Skill"
                    className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
