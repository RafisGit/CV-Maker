"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function TwoColumnModernTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ display: "flex", minHeight: "100%", width: "100%", fontFamily: "sans-serif" }}>
      {/* Left Column */}
      <div style={{ width: "35%", backgroundColor: colorTheme.sidebarBg, color: colorTheme.sidebarText, padding: "2rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: "0.5rem", color: colorTheme.primaryLight, lineHeight: 1.1 }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "2rem 0", fontSize: "0.875rem" }}>
          {personalInfo.email && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Mail size={16} color={colorTheme.accent} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Phone size={16} color={colorTheme.accent} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><MapPin size={16} color={colorTheme.accent} /> {personalInfo.location}</div>}
          {personalInfo.linkedin && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Link2 size={16} color={colorTheme.accent} /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Globe size={16} color={colorTheme.accent} /> {personalInfo.website}</div>}
        </div>

        {personalInfo.summary && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem", borderBottom: `2px solid ${colorTheme.accent}`, paddingBottom: "0.5rem", color: colorTheme.primaryLight, textTransform: "uppercase", letterSpacing: "1px" }}>Profile</h2>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, opacity: 0.9 }}>{personalInfo.summary}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem", borderBottom: `2px solid ${colorTheme.accent}`, paddingBottom: "0.5rem", color: colorTheme.primaryLight, textTransform: "uppercase", letterSpacing: "1px" }}>Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText, padding: "0.3rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 500 }}>
                  {skill.name} {skill.level ? `(${skill.level})` : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem", borderBottom: `2px solid ${colorTheme.accent}`, paddingBottom: "0.5rem", color: colorTheme.primaryLight, textTransform: "uppercase", letterSpacing: "1px" }}>Certifications</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 style={{ fontWeight: "600", fontSize: "0.95rem" }}>{cert.name}</h3>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: "0.1rem" }}>{cert.issuer}</div>
                  {cert.date && <div style={{ fontSize: "0.75rem", color: colorTheme.accent, marginTop: "0.25rem" }}>{formatDate(cert.date)}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div style={{ width: "65%", backgroundColor: "#ffffff", padding: "2.5rem", color: "#333333" }}>
        {experience.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: colorTheme.primary, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "1.5rem", height: "2px", backgroundColor: colorTheme.accent, display: "inline-block" }}></span>
              WORK EXPERIENCE
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <div>
                      <h3 style={{ fontWeight: "bold", fontSize: "1.1rem", color: colorTheme.secondary }}>{exp.position}</h3>
                      <div style={{ fontWeight: "500", fontSize: "0.95rem", color: "#555" }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                    </div>
                    <span style={{ fontSize: "0.85rem", backgroundColor: colorTheme.dateBg, color: colorTheme.dateText, padding: "0.25rem 0.6rem", borderRadius: "4px", fontWeight: 500, whiteSpace: "nowrap" }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, marginTop: "0.75rem", color: "#444" }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: colorTheme.primary, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "1.5rem", height: "2px", backgroundColor: colorTheme.accent, display: "inline-block" }}></span>
              EDUCATION
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <div>
                      <h3 style={{ fontWeight: "bold", fontSize: "1.1rem", color: colorTheme.secondary }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <div style={{ fontWeight: "500", fontSize: "0.95rem", color: "#555" }}>{edu.institution}</div>
                    </div>
                    <span style={{ fontSize: "0.85rem", backgroundColor: colorTheme.dateBg, color: colorTheme.dateText, padding: "0.25rem 0.6rem", borderRadius: "4px", fontWeight: 500, whiteSpace: "nowrap" }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && <p style={{ fontSize: "0.875rem", lineHeight: 1.6, marginTop: "0.5rem", color: "#444" }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: colorTheme.primary, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "1.5rem", height: "2px", backgroundColor: colorTheme.accent, display: "inline-block" }}></span>
              PROJECTS
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ border: `1px solid ${colorTheme.sectionBorder}`, padding: "1.25rem", borderRadius: "6px", backgroundColor: "#fafafa" }}>
                  <h3 style={{ fontWeight: "bold", fontSize: "1.05rem", color: colorTheme.secondary, marginBottom: "0.5rem" }}>{proj.name}</h3>
                  {proj.technologies && <div style={{ fontSize: "0.75rem", color: colorTheme.primary, fontWeight: 600, marginBottom: "0.75rem", textTransform: "uppercase" }}>{proj.technologies}</div>}
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.5, color: "#444" }}>{proj.description}</p>
                  {proj.link && <div style={{ marginTop: "1rem" }}><a href={proj.link} style={{ fontSize: "0.85rem", color: colorTheme.accent, textDecoration: "none", fontWeight: 600 }}>View Project &rarr;</a></div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
