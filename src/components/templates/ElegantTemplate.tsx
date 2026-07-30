"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  if (dateString.toLowerCase() === "present") return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export default function ElegantTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center justify-center my-6">
      <div className="h-px flex-1" style={{ backgroundColor: colorTheme.sectionBorder }} />
      <h3 className="mx-4 text-xl tracking-widest uppercase font-serif" style={{ color: colorTheme.primary }}>
        {title}
      </h3>
      <div className="h-px flex-1" style={{ backgroundColor: colorTheme.sectionBorder }} />
    </div>
  );

  return (
    <div className="w-full min-h-full p-10 font-serif" style={{ backgroundColor: "#ffffff", color: "#333333" }}>
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-normal mb-3 font-serif" style={{ color: colorTheme.primary }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="h-0.5 w-24 mx-auto mb-4" style={{ backgroundColor: colorTheme.accent }} />
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm font-sans tracking-wide" style={{ color: colorTheme.secondary }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && (personalInfo.phone || personalInfo.location || personalInfo.linkedin) && <span style={{ color: colorTheme.accent }}>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && (personalInfo.location || personalInfo.linkedin) && <span style={{ color: colorTheme.accent }}>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.location && personalInfo.linkedin && <span style={{ color: colorTheme.accent }}>•</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span style={{ color: colorTheme.accent }}>•</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="text-center text-sm leading-relaxed italic max-w-3xl mx-auto mb-8 font-serif" style={{ color: "#444444" }}>
          {personalInfo.summary}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div>
          <SectionDivider title="Experience" />
          <div className="flex flex-col gap-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-lg font-bold" style={{ color: "#222222" }}>{exp.position}</h4>
                  <span className="text-sm italic font-sans" style={{ color: colorTheme.secondary }}>
                    {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-base mb-2 font-sans font-medium" style={{ color: colorTheme.primaryLight }}>
                  {exp.company}{exp.location ? `, ${exp.location}` : ""}
                </div>
                <p className="text-sm leading-relaxed font-sans text-gray-700 whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div>
          <SectionDivider title="Education" />
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h4 className="text-lg font-bold mb-1" style={{ color: "#222222" }}>
                  {edu.degree} in {edu.field}
                </h4>
                <div className="text-base font-sans font-medium mb-1" style={{ color: colorTheme.primaryLight }}>
                  {edu.institution}
                </div>
                <div className="text-sm italic font-sans" style={{ color: colorTheme.secondary }}>
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </div>
                {edu.description && <p className="text-sm mt-2 font-sans text-gray-700 max-w-2xl mx-auto">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <SectionDivider title="Skills" />
          <div className="text-center">
            <div className="inline-flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-sm font-sans">
              {skills.map((skill, index) => (
                <React.Fragment key={skill.id}>
                  <span className="font-medium" style={{ color: "#333333" }}>{skill.name}</span>
                  {index < skills.length - 1 && <span className="mx-1 text-xs" style={{ color: colorTheme.accent }}>♦</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div>
          <SectionDivider title="Projects" />
          <div className="flex flex-col gap-5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-lg font-bold" style={{ color: "#222222" }}>{proj.name}</h4>
                  {proj.link && (
                    <a href={proj.link} className="text-sm italic font-sans underline" style={{ color: colorTheme.accent }}>
                      View Project
                    </a>
                  )}
                </div>
                <div className="text-sm font-sans font-medium mb-2" style={{ color: colorTheme.secondary }}>
                  Technologies: {proj.technologies}
                </div>
                <p className="text-sm leading-relaxed font-sans text-gray-700 whitespace-pre-wrap">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <SectionDivider title="Certifications" />
          <div className="grid grid-cols-2 gap-4 text-center font-sans">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-3 border rounded-sm" style={{ borderColor: colorTheme.sectionBorder }}>
                <div className="font-bold text-sm mb-1" style={{ color: "#222222" }}>{cert.name}</div>
                <div className="text-xs mb-1" style={{ color: colorTheme.secondary }}>{cert.issuer}</div>
                {cert.date && <div className="text-xs italic" style={{ color: colorTheme.primaryLight }}>{formatDate(cert.date)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
