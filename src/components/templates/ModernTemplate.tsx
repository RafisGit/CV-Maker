"use client";

import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

interface TemplateProps {
  data: CVData;
}

function formatDate(date: string): string {
  if (!date) return "";
  const [year, month] = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, education, experience, skills, projects, certifications } =
    data;

  return (
    <div className="bg-white text-gray-900 w-full" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Header */}
      <div className="bg-blue-600 text-white px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-blue-100 text-xs">
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-600 pb-1 mb-2">
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-600 pb-1 mb-2">
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-600 pb-1 mb-2">
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
                      {formatDate(edu.startDate)} &ndash;{" "}
                      {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-xs text-gray-700 mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-600 pb-1 mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium"
                >
                  {skill.name}
                  {skill.level !== "Intermediate" && (
                    <span className="text-blue-400 ml-1">
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-600 pb-1 mb-2">
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs text-blue-600">
                        {project.link}
                      </span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-xs text-gray-500 italic">
                      {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-xs text-gray-700 mt-0.5">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-600 pb-1 mb-2">
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
                    <span className="text-xs text-gray-500">
                      {formatDate(cert.date)}
                    </span>
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
