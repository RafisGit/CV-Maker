"use client";

import { useCVStore } from "@/store/cv-store";
import { Project } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, FolderOpen, ArrowUp, ArrowDown, Copy } from "lucide-react";

export default function ProjectsForm() {
  const {
    data,
    addProject,
    updateProject,
    removeProject,
    reorderProject,
    duplicateProject,
  } = useCVStore();

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
          className="bg-primary text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {data.projects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-border rounded-xl bg-card/50">
          <FolderOpen className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground mb-3">
            No projects added yet
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div
              key={project.id}
              className="border border-border rounded-xl p-4 bg-card space-y-4 shadow-sm hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">
                    {project.name || `Project #${index + 1}`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => reorderProject(index, index - 1)}
                    disabled={index === 0}
                    title="Move Up"
                    aria-label="Move Up"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderProject(index, index + 1)}
                    disabled={index === data.projects.length - 1}
                    title="Move Down"
                    aria-label="Move Down"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateProject(project.id)}
                    title="Duplicate Project"
                    aria-label="Duplicate Project"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    title="Delete Project"
                    aria-label="Delete Project"
                    className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`proj-name-${project.id}`} className="block text-sm font-medium mb-1.5">
                    Project Name *
                  </label>
                  <input
                    id={`proj-name-${project.id}`}
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, { name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="E-Commerce AI Assistant"
                  />
                </div>
                <div>
                  <label htmlFor={`proj-link-${project.id}`} className="block text-sm font-medium mb-1.5">
                    Project / GitHub Link
                  </label>
                  <input
                    id={`proj-link-${project.id}`}
                    type="url"
                    value={project.link}
                    onChange={(e) =>
                      updateProject(project.id, { link: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="https://github.com/username/project"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor={`proj-tech-${project.id}`} className="block text-sm font-medium mb-1.5">
                    Technologies Used
                  </label>
                  <input
                    id={`proj-tech-${project.id}`}
                    type="text"
                    value={project.technologies}
                    onChange={(e) =>
                      updateProject(project.id, {
                        technologies: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                    placeholder="Next.js, TypeScript, TailwindCSS, Supabase"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor={`proj-description-${project.id}`} className="block text-sm font-medium mb-1.5">
                    Description & Key Highlights
                  </label>
                  <textarea
                    id={`proj-description-${project.id}`}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, {
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y text-sm"
                    placeholder="Built a real-time web app serving 10,000+ active users with instant sync..."
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
