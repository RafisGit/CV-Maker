"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function DarkTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#121212", color: "#e0e0e0", width: "100%", minHeight: "297mm", padding: "2rem" }}>
      <div style={{ border: `1px solid #333`, borderRadius: "16px", overflow: "hidden", backgroundColor: "#1e1e1e", minHeight: "100%" }}>
        
        {/* Header */}
        <div style={{ backgroundColor: "#252525", padding: "3rem", borderBottom: `2px solid ${colorTheme.accent}` }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", margin: "0 0 0.5rem 0", color: "#ffffff", letterSpacing: "1px" }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          {personalInfo.summary && <p style={{ fontSize: "1.1rem", color: "#aaaaaa", maxWidth: "800px", lineHeight: 1.6, margin: "0 0 1.5rem 0" }}>{personalInfo.summary}</p>}
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.9rem", color: "#cccccc" }}>
            {personalInfo.email && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Mail size={16} color={colorTheme.accent} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Phone size={16} color={colorTheme.accent} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={16} color={colorTheme.accent} /> {personalInfo.location}</div>}
            {personalInfo.linkedin && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Link2 size={16} color={colorTheme.accent} /> {personalInfo.linkedin}</div>}
            {personalInfo.website && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Globe size={16} color={colorTheme.accent} /> {personalInfo.website}</div>}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "stretch" }}>
          
          {/* Main Content */}
          <div style={{ flex: "1 1 60%", padding: "3rem", borderRight: "1px solid #333" }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", borderBottom: "1px solid #333", paddingBottom: "0.5rem", marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  <span style={{ color: colorTheme.accent }}>{"//"}</span> Work Experience
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>{exp.position}</h3>
                        <span style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 500 }}>
                          {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div style={{ fontSize: "1rem", color: "#aaaaaa", marginBottom: "1rem" }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#cccccc", margin: 0 }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", borderBottom: "1px solid #333", paddingBottom: "0.5rem", marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  <span style={{ color: colorTheme.accent }}>{"//"}</span> Education
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  {education.map(edu => (
                    <div key={edu.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                        <span style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 500 }}>
                          {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                        </span>
                      </div>
                      <div style={{ fontSize: "1rem", color: "#aaaaaa", marginBottom: "0.5rem" }}>{edu.institution}</div>
                      {edu.description && <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#cccccc", margin: 0 }}>{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ flex: "1 1 30%", padding: "3rem", backgroundColor: "#191919" }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  <span style={{ color: colorTheme.accent }}>{"//"}</span> Skills
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {skills.map(skill => (
                    <div key={skill.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.95rem", color: "#dddddd" }}>{skill.name}</span>
                      {skill.level && (
                        <span style={{ fontSize: "0.75rem", color: "#191919", backgroundColor: colorTheme.accent, padding: "0.1rem 0.4rem", borderRadius: "4px", fontWeight: "bold", textTransform: "uppercase" }}>
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  <span style={{ color: colorTheme.accent }}>{"//"}</span> Projects
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {projects.map(proj => (
                    <div key={proj.id} style={{ borderLeft: `2px solid ${colorTheme.accent}`, paddingLeft: "1rem" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#ffffff", margin: "0 0 0.25rem 0" }}>{proj.name}</h3>
                      {proj.technologies && <div style={{ fontSize: "0.85rem", color: "#888888", marginBottom: "0.5rem" }}>{proj.technologies}</div>}
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "#cccccc", margin: "0 0 0.5rem 0" }}>{proj.description}</p>
                      {proj.link && <a href={proj.link} style={{ fontSize: "0.85rem", color: colorTheme.accent, textDecoration: "none" }}>Link ↗</a>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  <span style={{ color: colorTheme.accent }}>{"//"}</span> Certifications
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {certifications.map(cert => (
                    <div key={cert.id}>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#ffffff", margin: "0 0 0.25rem 0" }}>{cert.name}</h3>
                      <div style={{ fontSize: "0.9rem", color: "#aaaaaa" }}>{cert.issuer}</div>
                      {cert.date && <div style={{ fontSize: "0.8rem", color: colorTheme.accent, marginTop: "0.25rem" }}>{formatDate(cert.date)}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
