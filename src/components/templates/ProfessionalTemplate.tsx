"use client";

import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

function formatDate(date: string): string {
  if (!date) return "";
  const [year, month] = date.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function ProfessionalTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 w-full min-h-full" style={{ fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif" }}>
      <div className="flex min-h-[297mm] items-stretch">
        {/* Left Sidebar */}
        <div className="w-1/3 p-5 space-y-5 shrink-0" style={{ backgroundColor: colorTheme.sidebarBg, color: colorTheme.sidebarText }}>
          <div>
            <h1 className="text-lg font-bold leading-tight" style={{ color: colorTheme.sidebarText }}>
              {personalInfo.fullName || "Your Name"}
            </h1>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80" style={{ color: colorTheme.sidebarText }}>
              Contact
            </h2>
            {personalInfo.email && (
              <div className="flex items-center gap-1.5 text-xs opacity-95" style={{ color: colorTheme.sidebarText }}>
                <Mail className="h-3 w-3 shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5 text-xs opacity-95" style={{ color: colorTheme.sidebarText }}>
                <Phone className="h-3 w-3 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5 text-xs opacity-95" style={{ color: colorTheme.sidebarText }}>
                <MapPin className="h-3 w-3 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5 text-xs opacity-95" style={{ color: colorTheme.sidebarText }}>
                <Link2 className="h-3 w-3 shrink-0" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1.5 text-xs opacity-95" style={{ color: colorTheme.sidebarText }}>
                <Globe className="h-3 w-3 shrink-0" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80" style={{ color: colorTheme.sidebarText }}>
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium" style={{ color: colorTheme.sidebarText }}>{skill.name}</span>
                      <span className="text-[11px] opacity-80" style={{ color: colorTheme.sidebarText }}>{skill.level}</span>
                    </div>
                    <div className="w-full rounded-full h-1.5 bg-black/20 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          backgroundColor: colorTheme.accent || colorTheme.primary,
                          width: skill.level === "Expert" ? "100%" : skill.level === "Advanced" ? "75%" : skill.level === "Intermediate" ? "50%" : "25%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80" style={{ color: colorTheme.sidebarText }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-xs font-semibold" style={{ color: colorTheme.sidebarText }}>{cert.name}</p>
                    <p className="text-xs opacity-85" style={{ color: colorTheme.sidebarText }}>{cert.issuer}</p>
                    {cert.date && (
                      <p className="text-[11px] opacity-70" style={{ color: colorTheme.sidebarText }}>{formatDate(cert.date)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-5 space-y-4">
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `1px solid ${colorTheme.sectionBorder}` }}>
                Profile
              </h2>
              <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `1px solid ${colorTheme.sectionBorder}` }}>
                Work Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold">{exp.position}</h3>
                        <p className="text-xs font-medium" style={{ color: colorTheme.primary }}>
                          {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ""}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded whitespace-nowrap ml-2" style={{ backgroundColor: colorTheme.dateBg, color: colorTheme.dateText }}>
                        {formatDate(exp.startDate)} &ndash; {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `1px solid ${colorTheme.sectionBorder}` }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold">
                          {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                        </h3>
                        <p className="text-xs font-medium" style={{ color: colorTheme.primary }}>{edu.institution}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded whitespace-nowrap ml-2" style={{ backgroundColor: colorTheme.dateBg, color: colorTheme.dateText }}>
                        {formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-xs text-gray-700 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `1px solid ${colorTheme.sectionBorder}` }}>
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="text-sm font-bold">
                      {project.name}
                      {project.link && (
                        <span className="text-xs font-normal ml-2" style={{ color: colorTheme.primary }}>{project.link}</span>
                      )}
                    </h3>
                    {project.technologies && (
                      <p className="text-xs text-gray-500">Tech: {project.technologies}</p>
                    )}
                    {project.description && (
                      <p className="text-xs text-gray-700 mt-0.5">{project.description}</p>
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
