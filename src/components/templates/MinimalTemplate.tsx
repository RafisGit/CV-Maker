"use client";

import { CVData } from "@/types/cv";

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

export default function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, education, experience, skills, projects, certifications } =
    data;

  return (
    <div className="bg-white text-gray-900 w-full px-8 py-6" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-4 mb-5">
        <h1 className="text-2xl font-normal tracking-widest uppercase">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 mt-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && (
            <span className="text-gray-300">|</span>
          )}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.location && (
            <span className="text-gray-300">|</span>
          )}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 mt-0.5 text-xs text-gray-500">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.linkedin && personalInfo.website && (
            <span className="text-gray-300">|</span>
          )}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      <div className="space-y-4">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-normal uppercase tracking-[0.2em] text-gray-500 mb-1.5">
              Summary
            </h2>
            <p className="text-xs leading-relaxed text-gray-700">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-normal uppercase tracking-[0.2em] text-gray-500 mb-2">
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold">
                      {exp.position}
                      {exp.company ? `, ${exp.company}` : ""}
                    </h3>
                    <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                      {formatDate(exp.startDate)} &ndash;{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-xs text-gray-500 italic">
                      {exp.location}
                    </p>
                  )}
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
            <h2 className="text-xs font-normal uppercase tracking-[0.2em] text-gray-500 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                      {formatDate(edu.startDate)} &ndash;{" "}
                      {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-xs text-gray-700 mt-0.5">
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
            <h2 className="text-xs font-normal uppercase tracking-[0.2em] text-gray-500 mb-1.5">
              Skills
            </h2>
            <p className="text-xs text-gray-700">
              {skills.map((s) => s.name).join(" \u00B7 ")}
            </p>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-normal uppercase tracking-[0.2em] text-gray-500 mb-2">
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-sm font-semibold">
                    {project.name}
                    {project.link && (
                      <span className="text-xs font-normal text-gray-500 ml-2">
                        {project.link}
                      </span>
                    )}
                  </h3>
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
            <h2 className="text-xs font-normal uppercase tracking-[0.2em] text-gray-500 mb-1.5">
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <span className="font-semibold">{cert.name}</span>
                  {cert.issuer && (
                    <span className="text-gray-600"> &ndash; {cert.issuer}</span>
                  )}
                  {cert.date && (
                    <span className="text-gray-500 ml-1">
                      ({formatDate(cert.date)})
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
