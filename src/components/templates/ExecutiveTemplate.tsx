"use client";

import React from 'react';
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function ExecutiveTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === 'present') return 'Present';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div className="w-full bg-white mx-auto shadow-sm min-h-[1056px]" style={{ fontFamily: "Georgia, serif", color: colorTheme.sidebarText }}>
      
      {/* Header */}
      <header className="pt-12 pb-6 px-12 text-center" style={{ backgroundColor: colorTheme.headerBg, color: colorTheme.headerText }}>
        <h1 className="text-5xl font-bold mb-3 tracking-wide" style={{ color: colorTheme.primary }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        {personalInfo.summary && (
          <p className="max-w-3xl mx-auto text-sm leading-relaxed mt-4" style={{ color: colorTheme.sidebarText }}>
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* Decorative Separator */}
      <div className="w-full h-1" style={{ backgroundColor: colorTheme.accent }}></div>

      <div className="flex flex-row p-8 gap-8">
        {/* Left Column - Contact, Skills, Certs */}
        <div className="w-1/3 flex flex-col gap-8">
          
          {/* Contact Section */}
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-1" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>
              Contact
            </h2>
            <div className="flex flex-col gap-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: colorTheme.primaryLight }} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: colorTheme.primaryLight }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: colorTheme.primaryLight }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Link2 size={14} style={{ color: colorTheme.primaryLight }} />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={14} style={{ color: colorTheme.primaryLight }} />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-1" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText }}>
                    {skill.name} {skill.level ? `• ${skill.level}` : ''}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-1" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>
                Certifications
              </h2>
              <div className="flex flex-col gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-semibold text-sm" style={{ color: colorTheme.secondary }}>{cert.name}</h3>
                    <div className="text-xs mt-1" style={{ color: colorTheme.sidebarText }}>
                      {cert.issuer} {cert.date && `| ${formatDate(cert.date)}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column - Experience, Education, Projects */}
        <div className="w-2/3 flex flex-col gap-8">
          
          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider mb-6 border-b pb-1" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>
                Professional Experience
              </h2>
              <div className="flex flex-col gap-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold" style={{ color: colorTheme.secondary }}>{exp.position}</h3>
                      <div className="text-sm font-semibold" style={{ color: colorTheme.dateText }}>
                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <div className="text-sm font-semibold mb-2" style={{ color: colorTheme.primaryLight }}>
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

          {/* Education Section */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider mb-6 border-b pb-1" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>
                Education
              </h2>
              <div className="flex flex-col gap-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold" style={{ color: colorTheme.secondary }}>{edu.degree} in {edu.field}</h3>
                      <div className="text-sm font-semibold" style={{ color: colorTheme.dateText }}>
                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      </div>
                    </div>
                    <div className="text-sm font-semibold mb-2" style={{ color: colorTheme.primaryLight }}>
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

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider mb-6 border-b pb-1" style={{ color: colorTheme.primary, borderColor: colorTheme.sectionBorder }}>
                Key Projects
              </h2>
              <div className="flex flex-col gap-6">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-lg font-bold mb-1" style={{ color: colorTheme.secondary }}>
                      {proj.name}
                    </h3>
                    {proj.technologies && (
                      <div className="text-xs font-semibold mb-2 italic" style={{ color: colorTheme.primaryLight }}>
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
        </div>
      </div>
    </div>
  );
}
