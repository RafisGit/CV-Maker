"use client";

import React from 'react';
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function CorporateTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === 'present') return 'Present';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div className="w-full bg-white mx-auto shadow-sm min-h-[1056px] flex flex-col" style={{ fontFamily: "Arial, sans-serif", color: "#333333" }}>
      
      {/* Header */}
      <header className="px-10 py-8 flex flex-col justify-center" style={{ backgroundColor: colorTheme.primary, color: colorTheme.headerText }}>
        <h1 className="text-4xl font-bold tracking-tight uppercase mb-4">
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={14} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={14} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Link2 size={14} />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe size={14} />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      <div className="p-10 flex flex-col gap-6">
        
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colorTheme.secondary }}>
              Professional Summary
            </h2>
            <div className="w-full h-px mb-3" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            <p className="text-sm leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colorTheme.secondary }}>
              Professional Experience
            </h2>
            <div className="w-full h-px mb-4" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            <div className="flex flex-col gap-5">
              {experience.map((exp) => (
                <div key={exp.id} className="flex flex-col">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-md font-bold" style={{ color: colorTheme.primary }}>{exp.position}</h3>
                    <div className="text-sm font-semibold" style={{ color: colorTheme.primaryLight }}>
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-sm italic font-semibold mb-2" style={{ color: "#555" }}>
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
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
            <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colorTheme.secondary }}>
              Education
            </h2>
            <div className="w-full h-px mb-4" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-md font-bold" style={{ color: colorTheme.primary }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <div className="text-sm font-semibold" style={{ color: colorTheme.primaryLight }}>
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </div>
                  </div>
                  <div className="text-sm italic font-semibold mb-1" style={{ color: "#555" }}>
                    {edu.institution}
                  </div>
                  {edu.description && (
                    <p className="text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colorTheme.secondary }}>
              Core Competencies
            </h2>
            <div className="w-full h-px mb-4" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm flex justify-between items-center border-b pb-1" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-xs italic" style={{ color: "#777" }}>{skill.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colorTheme.secondary }}>
              Key Projects
            </h2>
            <div className="w-full h-px mb-4" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            <div className="flex flex-col gap-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-md font-bold" style={{ color: colorTheme.primary }}>{proj.name}</h3>
                  {proj.technologies && (
                    <div className="text-xs italic font-semibold mb-1" style={{ color: "#555" }}>
                      Technologies: {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-sm leading-relaxed">
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
            <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: colorTheme.secondary }}>
              Certifications
            </h2>
            <div className="w-full h-px mb-4" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            <div className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-sm" style={{ color: colorTheme.primary }}>{cert.name}</span>
                    <span className="text-sm mx-2" style={{ color: "#555" }}>—</span>
                    <span className="text-sm italic" style={{ color: "#555" }}>{cert.issuer}</span>
                  </div>
                  <div className="text-sm font-semibold" style={{ color: colorTheme.primaryLight }}>
                    {formatDate(cert.date)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
