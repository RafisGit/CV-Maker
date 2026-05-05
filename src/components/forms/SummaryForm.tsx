"use client";

import { useCVStore } from "@/store/cv-store";

export default function SummaryForm() {
  const { data, updatePersonalInfo } = useCVStore();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold mb-1">Professional Summary</h2>
        <p className="text-sm text-muted-foreground">
          Write a brief summary highlighting your key qualifications and career
          goals
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Summary / Objective
        </label>
        <textarea
          value={data.personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          rows={6}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
          placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications..."
        />
        <p className="text-xs text-muted-foreground mt-1">
          {data.personalInfo.summary.length}/500 characters
        </p>
      </div>
    </div>
  );
}
