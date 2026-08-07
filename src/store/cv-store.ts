"use client";

import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  CVData,
  TemplateType,
  PersonalInfo,
  Education,
  Experience,
  Skill,
  Project,
  Certification,
  defaultCVData,
} from "@/types/cv";

interface CVStore {
  cvId: string | null;
  title: string;
  template: TemplateType;
  colorTheme: string;
  data: CVData;
  activeStep: number;
  isDirty: boolean;
  isSaving: boolean;

  setCvId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setTemplate: (template: TemplateType) => void;
  setColorTheme: (colorTheme: string) => void;
  setActiveStep: (step: number) => void;
  setIsSaving: (saving: boolean) => void;
  markClean: () => void;

  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;
  duplicateEducation: (id: string) => void;

  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;
  duplicateExperience: (id: string) => void;

  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  reorderSkill: (fromIndex: number, toIndex: number) => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reorderProject: (fromIndex: number, toIndex: number) => void;
  duplicateProject: (id: string) => void;

  addCertification: (certification: Certification) => void;
  updateCertification: (
    id: string,
    certification: Partial<Certification>
  ) => void;
  removeCertification: (id: string) => void;
  reorderCertification: (fromIndex: number, toIndex: number) => void;
  duplicateCertification: (id: string) => void;

  loadCVData: (data: CVData) => void;
  resetStore: () => void;
}

export const useCVStore = create<CVStore>((set) => ({
  cvId: null,
  title: "Untitled CV",
  template: "modern",
  colorTheme: "blue",
  data: { ...defaultCVData },
  activeStep: 0,
  isDirty: false,
  isSaving: false,

  setCvId: (id) => set({ cvId: id }),
  setTitle: (title) => set({ title, isDirty: true }),
  setTemplate: (template) => set({ template, isDirty: true }),
  setColorTheme: (colorTheme) => set({ colorTheme, isDirty: true }),
  setActiveStep: (step) => set({ activeStep: step }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  markClean: () => set({ isDirty: false }),

  updatePersonalInfo: (info) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info },
      },
      isDirty: true,
    })),

  addEducation: (education) =>
    set((state) => ({
      data: {
        ...state.data,
        education: [...state.data.education, education],
      },
      isDirty: true,
    })),
  updateEducation: (id, education) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((e) =>
          e.id === id ? { ...e, ...education } : e
        ),
      },
      isDirty: true,
    })),
  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((e) => e.id !== id),
      },
      isDirty: true,
    })),
  reorderEducation: (fromIndex, toIndex) =>
    set((state) => {
      const list = [...state.data.education];
      if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) return state;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { data: { ...state.data, education: list }, isDirty: true };
    }),
  duplicateEducation: (id) =>
    set((state) => {
      const target = state.data.education.find((e) => e.id === id);
      if (!target) return state;
      const copy = { ...target, id: uuidv4(), institution: `${target.institution} (Copy)` };
      return { data: { ...state.data, education: [...state.data.education, copy] }, isDirty: true };
    }),

  addExperience: (experience) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: [...state.data.experience, experience],
      },
      isDirty: true,
    })),
  updateExperience: (id, experience) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((e) =>
          e.id === id ? { ...e, ...experience } : e
        ),
      },
      isDirty: true,
    })),
  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter((e) => e.id !== id),
      },
      isDirty: true,
    })),
  reorderExperience: (fromIndex, toIndex) =>
    set((state) => {
      const list = [...state.data.experience];
      if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) return state;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { data: { ...state.data, experience: list }, isDirty: true };
    }),
  duplicateExperience: (id) =>
    set((state) => {
      const target = state.data.experience.find((e) => e.id === id);
      if (!target) return state;
      const copy = { ...target, id: uuidv4(), company: `${target.company} (Copy)` };
      return { data: { ...state.data, experience: [...state.data.experience, copy] }, isDirty: true };
    }),

  addSkill: (skill) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, skill],
      },
      isDirty: true,
    })),
  updateSkill: (id, skill) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((s) =>
          s.id === id ? { ...s, ...skill } : s
        ),
      },
      isDirty: true,
    })),
  removeSkill: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((s) => s.id !== id),
      },
      isDirty: true,
    })),
  reorderSkill: (fromIndex, toIndex) =>
    set((state) => {
      const list = [...state.data.skills];
      if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) return state;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { data: { ...state.data, skills: list }, isDirty: true };
    }),

  addProject: (project) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: [...state.data.projects, project],
      },
      isDirty: true,
    })),
  updateProject: (id, project) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((p) =>
          p.id === id ? { ...p, ...project } : p
        ),
      },
      isDirty: true,
    })),
  removeProject: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.filter((p) => p.id !== id),
      },
      isDirty: true,
    })),
  reorderProject: (fromIndex, toIndex) =>
    set((state) => {
      const list = [...state.data.projects];
      if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) return state;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { data: { ...state.data, projects: list }, isDirty: true };
    }),
  duplicateProject: (id) =>
    set((state) => {
      const target = state.data.projects.find((p) => p.id === id);
      if (!target) return state;
      const copy = { ...target, id: uuidv4(), name: `${target.name} (Copy)` };
      return { data: { ...state.data, projects: [...state.data.projects, copy] }, isDirty: true };
    }),

  addCertification: (certification) =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: [...state.data.certifications, certification],
      },
      isDirty: true,
    })),
  updateCertification: (id, certification) =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: state.data.certifications.map((c) =>
          c.id === id ? { ...c, ...certification } : c
        ),
      },
      isDirty: true,
    })),
  removeCertification: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: state.data.certifications.filter((c) => c.id !== id),
      },
      isDirty: true,
    })),
  reorderCertification: (fromIndex, toIndex) =>
    set((state) => {
      const list = [...state.data.certifications];
      if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) return state;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { data: { ...state.data, certifications: list }, isDirty: true };
    }),
  duplicateCertification: (id) =>
    set((state) => {
      const target = state.data.certifications.find((c) => c.id === id);
      if (!target) return state;
      const copy = { ...target, id: uuidv4(), name: `${target.name} (Copy)` };
      return { data: { ...state.data, certifications: [...state.data.certifications, copy] }, isDirty: true };
    }),

  loadCVData: (data) =>
    set({
      data,
      isDirty: false,
    }),

  resetStore: () =>
    set({
      cvId: null,
      title: "Untitled CV",
      template: "modern",
      colorTheme: "blue",
      data: { ...defaultCVData },
      activeStep: 0,
      isDirty: false,
      isSaving: false,
    }),
}));
