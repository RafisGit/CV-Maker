"use client";

import { useCVStore } from "@/store/cv-store";
import { Project } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, FolderOpen } from "lucide-react";

export default function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useCVStore();

  const handleAdd = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    };
    addProject(newProject);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Showcase your notable projects
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

      {data.projects.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <FolderOpen className="h-10 w-10 text-border mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No projects added yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div
              key={project.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Project #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="text-danger hover:text-danger-hover transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, { name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="My Awesome Project"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Link
                  </label>
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) =>
                      updateProject(project.id, { link: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Technologies
                  </label>
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) =>
                      updateProject(project.id, {
                        technologies: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="React, Node.js, PostgreSQL"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, {
                        description: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    placeholder="Brief description of the project..."
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
