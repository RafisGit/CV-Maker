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

export default function ProfessionalTemplate({ data }: TemplateProps) {
  const { personalInfo, education, experience, skills, projects, certifications } =
    data;

  return (
    <div className="bg-white text-gray-900 w-full" style={{ fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif" }}>
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-800 text-white p-5 space-y-5 min-h-full">
          {/* Name */}
          <div>
            <h1 className="text-lg font-bold leading-tight">
              {personalInfo.fullName || "Your Name"}
            </h1>
          </div>

          {/* Contact */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Contact
            </h2>
            {personalInfo.email && (
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Mail className="h-3 w-3 shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Phone className="h-3 w-3 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="h-3 w-3 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Link2 className="h-3 w-3 shrink-0" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Globe className="h-3 w-3 shrink-0" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Skills
              </h2>
              <div className="space-y-1.5">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs">{skill.name}</span>
                      <span className="text-xs text-slate-400">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1">
                      <div
                        className="bg-blue-400 h-1 rounded-full"
                        style={{
                          width:
                            skill.level === "Expert"
                              ? "100%"
                              : skill.level === "Advanced"
                              ? "75%"
                              : skill.level === "Intermediate"
                              ? "50%"
                              : "25%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-xs font-semibold">{cert.name}</p>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                    {cert.date && (
                      <p className="text-xs text-slate-500">
                        {formatDate(cert.date)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-5 space-y-4">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Profile
              </h2>
              <p className="text-xs leading-relaxed text-gray-700">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Work Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold">{exp.position}</h3>
                        <p className="text-xs text-blue-600 font-medium">
                          {exp.company}
                          {exp.location ? ` \u2014 ${exp.location}` : ""}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap ml-2">
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold">
                          {edu.degree}
                          {edu.field ? ` in ${edu.field}` : ""}
                        </h3>
                        <p className="text-xs text-blue-600 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap ml-2">
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

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="text-sm font-bold">
                      {project.name}
                      {project.link && (
                        <span className="text-xs font-normal text-blue-600 ml-2">
                          {project.link}
                        </span>
                      )}
                    </h3>
                    {project.technologies && (
                      <p className="text-xs text-gray-500">
                        Tech: {project.technologies}
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
        </div>
      </div>
    </div>
  );
}
