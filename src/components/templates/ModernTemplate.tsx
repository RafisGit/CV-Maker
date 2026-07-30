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

export default function ModernTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 w-full" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Header */}
      <div className="px-8 py-6" style={{ backgroundColor: colorTheme.headerBg, color: colorTheme.headerText }}>
        <h1 className="text-2xl font-bold tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs" style={{ color: `${colorTheme.headerText}cc` }}>
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Link2 className="h-3 w-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      <div className="px-8 py-5 space-y-5">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primary}` }}>
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-gray-700">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primary}` }}>
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold">{exp.position}</h3>
                      <p className="text-xs text-gray-600">
                        {exp.company}
                        {exp.location ? ` | ${exp.location}` : ""}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} &ndash;{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-700 mt-1 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primary}` }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold">
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </h3>
                      <p className="text-xs text-gray-600">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
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

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primary}` }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText }}
                >
                  {skill.name}
                  {skill.level !== "Intermediate" && (
                    <span style={{ color: `${colorTheme.skillText}99` }} className="ml-1">
                      ({skill.level})
                    </span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primary}` }}>
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs" style={{ color: colorTheme.primary }}>
                        {project.link}
                      </span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-xs text-gray-500 italic">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-xs text-gray-700 mt-0.5">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primary}` }}>
              Certifications
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-semibold">{cert.name}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
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
