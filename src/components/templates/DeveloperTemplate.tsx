"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe, Terminal, Code, Briefcase, GraduationCap, Award } from "lucide-react";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  if (dateString.toLowerCase() === "present") return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function DeveloperTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-full flex font-mono" style={{ backgroundColor: "#ffffff" }}>
      {/* Sidebar - 30% */}
      <div className="w-[30%] p-6 flex flex-col gap-6" style={{ backgroundColor: colorTheme.sidebarBg, color: colorTheme.sidebarText }}>
        
        {/* Contact Info */}
        <div className="flex flex-col gap-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-2 break-all">
              <Mail size={14} /> <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} /> <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} /> <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2 break-all">
              <Link2 size={14} /> <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2 break-all">
              <Globe size={14} /> <span>{personalInfo.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 uppercase tracking-wider border-b pb-1" style={{ borderColor: colorTheme.sectionBorder }}>
              <Code size={16} /> Skills
            </h3>
            <div className="flex flex-col gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{skill.name}</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-opacity-30" style={{ backgroundColor: colorTheme.primaryLight }}>
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        backgroundColor: colorTheme.accent,
                        width: skill.level === "Expert" ? "100%" : skill.level === "Advanced" ? "75%" : skill.level === "Intermediate" ? "50%" : "25%"
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 uppercase tracking-wider border-b pb-1" style={{ borderColor: colorTheme.sectionBorder }}>
              <Award size={16} /> Certs
            </h3>
            <div className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <div className="font-bold">{cert.name}</div>
                  <div className="text-xs opacity-80">{cert.issuer}</div>
                  {cert.date && <div className="text-xs opacity-60">{formatDate(cert.date)}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content - 70% */}
      <div className="w-[70%] p-8 flex flex-col gap-6" style={{ backgroundColor: "#ffffff" }}>
        
        {/* Header */}
        <div className="border-b-2 pb-4" style={{ borderColor: colorTheme.primary }}>
          <h1 className="text-4xl font-bold uppercase tracking-tighter" style={{ color: colorTheme.primary }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm font-semibold" style={{ color: colorTheme.secondary }}>
            <Terminal size={14} /> <span>Software Engineer / Developer</span>
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="text-sm leading-relaxed" style={{ color: "#333333" }}>
            <span className="font-bold mr-2" style={{ color: colorTheme.primary }}>&gt; root@summary:~#</span>
            {personalInfo.summary}
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase" style={{ color: colorTheme.primary }}>
              <Briefcase size={20} /> Experience
            </h3>
            <div className="flex flex-col gap-5">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: colorTheme.primaryLight }}>
                  <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5" style={{ backgroundColor: colorTheme.accent }} />
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-base" style={{ color: "#111111" }}>{exp.position}</h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: colorTheme.dateBg, color: colorTheme.dateText }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold mb-2" style={{ color: colorTheme.secondary }}>
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase" style={{ color: colorTheme.primary }}>
              <Code size={20} /> Projects
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="border p-3 rounded" style={{ borderColor: colorTheme.sectionBorder, backgroundColor: "#fafafa" }}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold" style={{ color: colorTheme.primary }}>{proj.name}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs underline flex items-center gap-1" style={{ color: colorTheme.accent }}>
                        <Link2 size={12} /> Link
                      </a>
                    )}
                  </div>
                  <div className="text-xs font-mono mb-2 p-1 rounded" style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText, display: "inline-block" }}>
                    {proj.technologies}
                  </div>
                  <p className="text-sm text-gray-700">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase" style={{ color: colorTheme.primary }}>
              <GraduationCap size={20} /> Education
            </h3>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold" style={{ color: "#111111" }}>{edu.degree} in {edu.field}</h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: colorTheme.dateBg, color: colorTheme.dateText }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold" style={{ color: colorTheme.secondary }}>{edu.institution}</div>
                  {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
