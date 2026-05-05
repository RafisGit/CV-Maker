"use client";

import { useCVStore } from "@/store/cv-store";
import { Skill } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, Wrench } from "lucide-react";

const LEVELS: Skill["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function SkillsForm() {
  const { data, addSkill, updateSkill, removeSkill } = useCVStore();

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
          className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {data.skills.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <Wrench className="h-10 w-10 text-border mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No skills added yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.skills.map((skill, index) => (
            <div
              key={skill.id}
              className="flex items-center gap-3 border border-border rounded-lg p-3"
            >
              <span className="text-xs text-muted-foreground w-6">
                {index + 1}.
              </span>
              <input
                type="text"
                value={skill.name}
                onChange={(e) =>
                  updateSkill(skill.id, { name: e.target.value })
                }
                className="flex-1 px-3 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                placeholder="e.g. React, Python, Project Management"
              />
              <select
                value={skill.level}
                onChange={(e) =>
                  updateSkill(skill.id, {
                    level: e.target.value as Skill["level"],
                  })
                }
                className="px-3 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm bg-background"
              >
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-danger hover:text-danger-hover transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
