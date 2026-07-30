"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function BoldTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: "#fff", color: "#111", width: "100%", minHeight: "100%" }}>
      
      {/* Heavy Header */}
      <div style={{ backgroundColor: colorTheme.primary, color: "#fff", padding: "4rem 3rem" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "900", letterSpacing: "-1px", margin: "0 0 1rem 0", lineHeight: 1 }}>
          {personalInfo.fullName || "YOUR NAME"}
        </h1>
        {personalInfo.summary && (
          <p style={{ fontSize: "1.25rem", fontWeight: 500, maxWidth: "800px", lineHeight: 1.5, margin: "0 0 2rem 0", color: colorTheme.primaryLight }}>
            {personalInfo.summary}
          </p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", fontSize: "1rem", fontWeight: 600 }}>
          {personalInfo.email && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Mail size={18} color={colorTheme.accent} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Phone size={18} color={colorTheme.accent} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={18} color={colorTheme.accent} /> {personalInfo.location}</div>}
          {personalInfo.linkedin && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Link2 size={18} color={colorTheme.accent} /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Globe size={18} color={colorTheme.accent} /> {personalInfo.website}</div>}
        </div>
      </div>

      <div style={{ padding: "3rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem" }}>
        
        {/* Left Column (Skills, Certs, Edu) */}
        <div>
          {skills.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "900", color: colorTheme.secondary, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "-0.5px" }}>Skills</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {skills.map(skill => (
                  <div key={skill.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{skill.name}</span>
                    {skill.level && <span style={{ fontSize: "0.9rem", color: colorTheme.accent, fontWeight: 700, textTransform: "uppercase" }}>{skill.level}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "900", color: colorTheme.secondary, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "-0.5px" }}>Education</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: colorTheme.accent, marginBottom: "0.25rem", textTransform: "uppercase" }}>
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0 0 0.25rem 0" }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <div style={{ fontSize: "1rem", color: "#555", fontWeight: 600 }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "900", color: colorTheme.secondary, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "-0.5px" }}>Awards</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {certifications.map(cert => (
                  <div key={cert.id}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", margin: "0 0 0.25rem 0" }}>{cert.name}</h3>
                    <div style={{ fontSize: "0.95rem", color: "#555", fontWeight: 600 }}>{cert.issuer}</div>
                    {cert.date && <div style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 700, marginTop: "0.25rem" }}>{formatDate(cert.date)}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Experience, Projects) */}
        <div>
          {experience.length > 0 && (
            <div style={{ marginBottom: "4rem" }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: colorTheme.primary, marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "-1px", borderBottom: `4px solid ${colorTheme.primary}`, paddingBottom: "0.5rem" }}>
                Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontSize: "1.8rem", fontWeight: "900", margin: 0, lineHeight: 1.1 }}>{exp.position}</h3>
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: colorTheme.accent, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                        {formatDate(exp.startDate)} — {exp.current ? "PRESENT" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: colorTheme.secondary, marginBottom: "1rem" }}>{exp.company} {exp.location && `// ${exp.location}`}</div>
                    <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#333", margin: 0 }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: colorTheme.primary, marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "-1px", borderBottom: `4px solid ${colorTheme.primary}`, paddingBottom: "0.5rem" }}>
                Selected Projects
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: "900", margin: 0 }}>{proj.name}</h3>
                      {proj.link && <a href={proj.link} style={{ fontSize: "0.9rem", fontWeight: "bold", color: colorTheme.primary, textTransform: "uppercase", textDecoration: "none" }}>[ View Project ]</a>}
                    </div>
                    {proj.technologies && <div style={{ fontSize: "0.95rem", fontWeight: 700, color: colorTheme.accent, marginBottom: "1rem" }}>{proj.technologies}</div>}
                    <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#333", margin: 0 }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
