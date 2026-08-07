"use client";

import React from 'react';
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function CreativeTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === 'present') return 'Present';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div className="w-full flex items-stretch min-h-[297mm] shadow-sm relative overflow-hidden" style={{ backgroundColor: "#ffffff", fontFamily: "Helvetica, Arial, sans-serif" }}>
      
      {/* Left Sidebar */}
      <div className="w-[35%] p-8 flex flex-col gap-8 z-10 shrink-0" style={{ backgroundColor: colorTheme.sidebarBg, color: colorTheme.sidebarText }}>
        
        {/* Decorative Circle */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 rounded-full opacity-20" style={{ backgroundColor: colorTheme.accent }}></div>

        {/* Profile Info */}
        <div className="mt-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 leading-none" style={{ color: colorTheme.primary }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          {/* Accent Line */}
          <div className="w-12 h-1 mt-4" style={{ backgroundColor: colorTheme.accent }}></div>
        </div>

        {/* Contact */}
        <section className="mt-4 flex flex-col gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: colorTheme.primaryLight, color: "#fff" }}>
                <Mail size={14} />
              </div>
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: colorTheme.primaryLight, color: "#fff" }}>
                <Phone size={14} />
              </div>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: colorTheme.primaryLight, color: "#fff" }}>
                <MapPin size={14} />
              </div>
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: colorTheme.primaryLight, color: "#fff" }}>
                <Link2 size={14} />
              </div>
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: colorTheme.primaryLight, color: "#fff" }}>
                <Globe size={14} />
              </div>
              <span className="break-all">{personalInfo.website}</span>
            </div>
          )}
        </section>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mt-4">
            <h2 className="text-xl font-bold uppercase mb-4" style={{ color: colorTheme.primary }}>Skills</h2>
            <div className="flex flex-col gap-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span>{skill.name}</span>
                    <span style={{ color: colorTheme.primaryLight }}>{skill.level}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                    <div className="h-full rounded-full" style={{ 
                      backgroundColor: colorTheme.accent,
                      width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : skill.level === 'Intermediate' ? '50%' : '25%'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mt-4">
            <h2 className="text-xl font-bold uppercase mb-4" style={{ color: colorTheme.primary }}>Certifications</h2>
            <div className="flex flex-col gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <h3 className="font-bold" style={{ color: colorTheme.secondary }}>{cert.name}</h3>
                  <div className="mt-1 opacity-80">{cert.issuer}</div>
                  <div className="mt-1 font-mono text-xs" style={{ color: colorTheme.primaryLight }}>{formatDate(cert.date)}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-[65%] p-10 flex flex-col gap-10 z-10" style={{ color: "#333333" }}>
        
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl font-black uppercase tracking-widest" style={{ color: colorTheme.primary }}>Profile</h2>
              <div className="flex-grow h-px" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            </div>
            <p className="text-sm leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-widest" style={{ color: colorTheme.primary }}>Experience</h2>
              <div className="flex-grow h-px" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            </div>
            <div className="flex flex-col gap-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: colorTheme.accent }}>
                  {/* Timeline Dot */}
                  <div className="absolute w-3 h-3 rounded-full left-[-7px] top-1.5" style={{ backgroundColor: colorTheme.accent }}></div>
                  
                  <h3 className="text-xl font-bold" style={{ color: colorTheme.secondary }}>{exp.position}</h3>
                  <div className="flex flex-wrap gap-2 text-sm font-bold mt-1 mb-3" style={{ color: colorTheme.primaryLight }}>
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                    <span>•</span>
                    <span className="font-mono" style={{ color: colorTheme.dateBg }}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-widest" style={{ color: colorTheme.primary }}>Projects</h2>
              <div className="flex-grow h-px" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-lg" style={{ backgroundColor: "rgba(0,0,0,0.02)", border: `1px solid ${colorTheme.sectionBorder}` }}>
                  <h3 className="text-lg font-bold mb-1" style={{ color: colorTheme.secondary }}>{proj.name}</h3>
                  {proj.technologies && (
                    <div className="text-xs font-semibold mb-2" style={{ color: colorTheme.primaryLight }}>{proj.technologies}</div>
                  )}
                  {proj.description && (
                    <p className="text-sm leading-relaxed mt-2">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-widest" style={{ color: colorTheme.primary }}>Education</h2>
              <div className="flex-grow h-px" style={{ backgroundColor: colorTheme.sectionBorder }}></div>
            </div>
            <div className="flex flex-col gap-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold" style={{ color: colorTheme.secondary }}>{edu.degree} in {edu.field}</h3>
                  </div>
                  <div className="flex justify-between text-sm font-bold mb-2" style={{ color: colorTheme.primaryLight }}>
                    <span>{edu.institution}</span>
                    <span className="font-mono text-xs">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                  </div>
                  {edu.description && (
                    <p className="text-sm leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
