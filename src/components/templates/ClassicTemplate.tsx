"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Link2 } from "lucide-react";

export default function ClassicTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const sectionHeaderStyle = {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: colorTheme.primary,
    textTransform: "uppercase" as const,
    borderBottom: `1px solid ${colorTheme.primary}`,
    marginBottom: "0.5rem",
    paddingBottom: "0.2rem",
    marginTop: "1.2rem",
  };

  return (
    <div style={{ fontFamily: '"Times New Roman", Times, serif', backgroundColor: "#fff", color: "#000", padding: "3rem", width: "100%", minHeight: "100%", lineHeight: 1.4 }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.25rem" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ fontSize: "0.95rem" }}>
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.location && personalInfo.phone && <span> • </span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {(personalInfo.location || personalInfo.phone) && personalInfo.email && <span> • </span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
        </div>
        <div style={{ fontSize: "0.95rem" }}>
          {personalInfo.linkedin && <span><Link2 size={12} style={{display:'inline', verticalAlign:'middle'}}/> {personalInfo.linkedin}</span>}
          {personalInfo.linkedin && personalInfo.website && <span> • </span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <h2 style={sectionHeaderStyle}>Summary</h2>
          <p style={{ fontSize: "0.95rem", textAlign: "justify" }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{edu.institution}</span>
                <span style={{ fontSize: "0.95rem" }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontStyle: "italic", fontSize: "0.95rem" }}>{edu.degree} {edu.field && `in ${edu.field}`}</span>
              </div>
              {edu.description && <p style={{ fontSize: "0.95rem", marginTop: "0.25rem" }}>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{exp.company}</span>
                <span style={{ fontSize: "0.95rem" }}>{formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontStyle: "italic", fontSize: "0.95rem" }}>{exp.position} {exp.location && `- ${exp.location}`}</span>
              </div>
              <p style={{ fontSize: "0.95rem", marginTop: "0.25rem", textAlign: "justify" }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{proj.name}</span>
                {proj.link && <a href={proj.link} style={{ fontSize: "0.9rem", color: "#000" }}>Project Link</a>}
              </div>
              {proj.technologies && <div style={{ fontStyle: "italic", fontSize: "0.95rem" }}>Technologies: {proj.technologies}</div>}
              <p style={{ fontSize: "0.95rem", marginTop: "0.25rem", textAlign: "justify" }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Skills</h2>
          <div style={{ fontSize: "0.95rem" }}>
            {skills.map((skill, index) => (
              <span key={skill.id}>
                <strong>{skill.name}</strong>{skill.level && ` (${skill.level})`}
                {index < skills.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem", fontSize: "0.95rem" }}>
              <span><strong>{cert.name}</strong>, {cert.issuer}</span>
              {cert.date && <span>{formatDate(cert.date)}</span>}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
