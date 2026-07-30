"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  if (dateString.toLowerCase() === "present") return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function CompactTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-full font-sans text-xs flex flex-col" style={{ backgroundColor: "#ffffff", color: "#1f2937" }}>
      
      {/* Header - Full Width */}
      <div className="w-full px-6 py-4 flex justify-between items-end border-b-2" style={{ backgroundColor: colorTheme.headerBg, borderColor: colorTheme.primary }}>
        <div className="flex-1">
          <h1 className="text-2xl font-bold uppercase tracking-tight m-0 leading-none" style={{ color: colorTheme.headerText }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
        </div>
        <div className="flex flex-col items-end gap-0.5 text-[10px]" style={{ color: colorTheme.headerText }}>
          {personalInfo.email && <div className="flex items-center gap-1"><Mail size={10} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={10} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-1"><MapPin size={10} /> {personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-1"><Link2 size={10} /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div className="flex items-center gap-1"><Globe size={10} /> {personalInfo.website}</div>}
        </div>
      </div>

      {/* Body - 2 Columns */}
      <div className="flex flex-1 p-4 gap-4">
        
        {/* Left Column - 65% */}
        <div className="w-[65%] flex flex-col gap-4">
          
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-1">
              <p className="leading-tight text-justify">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h2 className="text-sm font-bold border-b mb-2 uppercase" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>Experience</h2>
              <div className="flex flex-col gap-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold">
                      <span style={{ color: "#111827" }}>{exp.position}</span>
                      <span style={{ color: colorTheme.primaryLight }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="font-medium mb-1" style={{ color: colorTheme.secondary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    <p className="leading-tight text-justify whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold border-b mb-2 uppercase" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>Education</h2>
              <div className="flex flex-col gap-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between font-bold">
                      <span style={{ color: "#111827" }}>{edu.degree} in {edu.field}</span>
                      <span style={{ color: colorTheme.primaryLight }}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <div className="font-medium" style={{ color: colorTheme.secondary }}>
                      {edu.institution}
                    </div>
                    {edu.description && <p className="leading-tight mt-0.5">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column - 35% */}
        <div className="w-[35%] flex flex-col gap-4">
          
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold border-b mb-2 uppercase" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-1.5 py-0.5 rounded font-medium text-[10px]"
                    style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold border-b mb-2 uppercase" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>Projects</h2>
              <div className="flex flex-col gap-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline font-bold" style={{ color: "#111827" }}>
                      <span>{proj.name}</span>
                      {proj.link && <a href={proj.link} className="font-normal text-[10px] underline" style={{ color: colorTheme.accent }}>Link</a>}
                    </div>
                    <div className="text-[10px] mb-1 italic" style={{ color: colorTheme.secondary }}>
                      {proj.technologies}
                    </div>
                    <p className="leading-tight text-justify">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold border-b mb-2 uppercase" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>Certifications</h2>
              <div className="flex flex-col gap-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-bold" style={{ color: "#111827" }}>{cert.name}</div>
                    <div className="flex justify-between items-baseline">
                      <span style={{ color: colorTheme.secondary }}>{cert.issuer}</span>
                      {cert.date && <span className="text-[10px]" style={{ color: colorTheme.primaryLight }}>{formatDate(cert.date)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
