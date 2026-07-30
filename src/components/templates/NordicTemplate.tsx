"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function NordicTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const sectionLabelStyle = {
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: colorTheme.accent,
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
    marginBottom: "1rem",
  };

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: "#ffffff", color: "#1a1a1a", width: "100%", minHeight: "100%", padding: "4rem", display: "grid", gridTemplateColumns: "1fr 3fr", gap: "4rem" }}>
      
      {/* Sidebar (Left) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        
        {/* Name & Contact */}
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 300, lineHeight: 1.2, margin: "0 0 2rem 0", color: colorTheme.primary }}>
            {personalInfo.fullName ? personalInfo.fullName.split(" ").map((n, i) => <span key={i} style={{ display: "block", fontWeight: i === 0 ? 700 : 300 }}>{n}</span>) : <span><strong style={{display: 'block'}}>Your</strong>Name</span>}
          </h1>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem", color: "#555" }}>
            {personalInfo.email && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Mail size={14} color={colorTheme.accent} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Phone size={14} color={colorTheme.accent} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><MapPin size={14} color={colorTheme.accent} /> {personalInfo.location}</div>}
            {personalInfo.linkedin && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Link2 size={14} color={colorTheme.accent} /> {personalInfo.linkedin}</div>}
            {personalInfo.website && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><Globe size={14} color={colorTheme.accent} /> {personalInfo.website}</div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={sectionLabelStyle}>Skills</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {skills.map(skill => (
                <div key={skill.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>{skill.name}</span>
                  {skill.level && <span style={{ fontSize: "0.75rem", color: "#888" }}>{skill.level}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={sectionLabelStyle}>Certificates</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {certifications.map(cert => (
                <div key={cert.id}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, margin: "0 0 0.25rem 0" }}>{cert.name}</h3>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>{cert.issuer}</div>
                  {cert.date && <div style={{ fontSize: "0.8rem", color: colorTheme.accent, marginTop: "0.25rem" }}>{formatDate(cert.date)}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Right) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        
        {/* Profile */}
        {personalInfo.summary && (
          <div>
            <div style={sectionLabelStyle}>Profile</div>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#444", margin: 0, fontWeight: 300 }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <div style={sectionLabelStyle}>Experience</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "2rem" }}>
                  <div style={{ fontSize: "0.9rem", color: "#666", fontWeight: 500 }}>
                    {formatDate(exp.startDate)}<br />—<br />{exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 600, margin: "0 0 0.25rem 0", color: colorTheme.primary }}>{exp.position}</h3>
                    <div style={{ fontSize: "1rem", color: colorTheme.secondary, marginBottom: "1rem", fontWeight: 500 }}>{exp.company} {exp.location && `// ${exp.location}`}</div>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#444", margin: 0 }}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={sectionLabelStyle}>Education</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {education.map(edu => (
                <div key={edu.id} style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "2rem" }}>
                  <div style={{ fontSize: "0.9rem", color: "#666", fontWeight: 500 }}>
                    {formatDate(edu.startDate)}<br />—<br />{formatDate(edu.endDate)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: "0 0 0.25rem 0", color: colorTheme.primary }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <div style={{ fontSize: "1rem", color: colorTheme.secondary, fontWeight: 500 }}>{edu.institution}</div>
                    {edu.description && <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#444", margin: "0.75rem 0 0 0" }}>{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <div style={sectionLabelStyle}>Projects</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ border: `1px solid ${colorTheme.sectionBorder}`, padding: "1.5rem", borderRadius: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0, color: colorTheme.primary }}>{proj.name}</h3>
                    {proj.link && <a href={proj.link} style={{ fontSize: "0.85rem", color: colorTheme.accent, textDecoration: "none" }}>Link ↗</a>}
                  </div>
                  {proj.technologies && <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem", fontWeight: 500 }}>{proj.technologies}</div>}
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#444", margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
