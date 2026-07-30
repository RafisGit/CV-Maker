"use client";

import React from 'react';
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";

export default function ATSFriendlyTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === 'present') return 'Present';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div className="w-full bg-white mx-auto shadow-sm min-h-[1056px] p-12 flex flex-col gap-6" style={{ fontFamily: "Calibri, Helvetica, sans-serif", color: "#000000" }}>
      
      {/* Header */}
      <header className="text-center flex flex-col items-center gap-2 mb-2">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-x-2 text-sm">
          {personalInfo.email && <span>{personalInfo.email} | </span>}
          {personalInfo.phone && <span>{personalInfo.phone} | </span>}
          {personalInfo.location && <span>{personalInfo.location} | </span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin} | </span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section>
          <h2 className="text-lg font-bold uppercase mb-1" style={{ color: colorTheme.primary }}>Summary</h2>
          <hr className="border-t-2 mb-3" style={{ borderColor: colorTheme.primary }} />
          <p className="text-sm leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase mb-1" style={{ color: colorTheme.primary }}>Experience</h2>
          <hr className="border-t-2 mb-4" style={{ borderColor: colorTheme.primary }} />
          <div className="flex flex-col gap-5">
            {experience.map((exp) => (
              <div key={exp.id} className="flex flex-col">
                <div className="flex justify-between items-baseline font-bold text-base">
                  <span>{exp.position}</span>
                  <span>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <div className="text-sm font-semibold mb-2">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.description && (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap ml-4 list-disc">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase mb-1" style={{ color: colorTheme.primary }}>Education</h2>
          <hr className="border-t-2 mb-4" style={{ borderColor: colorTheme.primary }} />
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col">
                <div className="flex justify-between items-baseline font-bold text-base">
                  <span>{edu.institution}</span>
                  <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <div className="text-sm mb-1">
                  {edu.degree} in {edu.field}
                </div>
                {edu.description && (
                  <p className="text-sm leading-relaxed ml-4">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase mb-1" style={{ color: colorTheme.primary }}>Projects</h2>
          <hr className="border-t-2 mb-4" style={{ borderColor: colorTheme.primary }} />
          <div className="flex flex-col gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="flex flex-col">
                <div className="font-bold text-base">
                  {proj.name}
                </div>
                {proj.technologies && (
                  <div className="text-sm mb-1">
                    Technologies: {proj.technologies}
                  </div>
                )}
                {proj.description && (
                  <p className="text-sm leading-relaxed ml-4">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase mb-1" style={{ color: colorTheme.primary }}>Certifications</h2>
          <hr className="border-t-2 mb-4" style={{ borderColor: colorTheme.primary }} />
          <div className="flex flex-col gap-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-sm">
                <span className="font-bold">{cert.name} - {cert.issuer}</span>
                <span>{formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase mb-1" style={{ color: colorTheme.primary }}>Skills</h2>
          <hr className="border-t-2 mb-3" style={{ borderColor: colorTheme.primary }} />
          <div className="text-sm leading-relaxed">
            {skills.map(s => s.name).join(", ")}
          </div>
        </section>
      )}

    </div>
  );
}
