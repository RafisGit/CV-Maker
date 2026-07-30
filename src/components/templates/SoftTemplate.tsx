"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function SoftTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
    marginBottom: "2rem",
  };

  return (
    <div style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", backgroundColor: "#fcfcfc", color: "#4a4a4a", width: "100%", minHeight: "100%", padding: "3rem" }}>
      
      {/* Header Profile Card */}
      <div style={{ ...cardStyle, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderTop: `6px solid ${colorTheme.accent}` }}>
        <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: colorTheme.primaryLight, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2.5rem", fontWeight: "bold", color: colorTheme.primary, marginBottom: "1rem" }}>
          {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : "U"}
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: colorTheme.primary, margin: "0 0 0.5rem 0" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        {personalInfo.summary && <p style={{ fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "700px", margin: "1rem auto 1.5rem" }}>{personalInfo.summary}</p>}
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem", fontSize: "0.95rem", color: "#666" }}>
          {personalInfo.email && <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Mail size={16} color={colorTheme.accent} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Phone size={16} color={colorTheme.accent} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><MapPin size={16} color={colorTheme.accent} /> {personalInfo.location}</div>}
          {personalInfo.linkedin && <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Link2 size={16} color={colorTheme.accent} /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Globe size={16} color={colorTheme.accent} /> {personalInfo.website}</div>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {experience.length > 0 && (
            <div style={cardStyle}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: colorTheme.secondary, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: `${colorTheme.secondary}20`, display: "inline-block" }}></span>
                Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {experience.map(exp => (
                  <div key={exp.id} style={{ position: "relative", paddingLeft: "1.5rem", borderLeft: `2px solid ${colorTheme.sectionBorder}` }}>
                    <div style={{ position: "absolute", left: "-6px", top: "5px", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: colorTheme.accent }}></div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: colorTheme.primary, margin: "0 0 0.25rem 0" }}>{exp.position}</h3>
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: "#666", marginBottom: "0.25rem" }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
                    <div style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 700, marginBottom: "0.75rem", backgroundColor: `${colorTheme.accent}15`, display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "12px" }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div style={cardStyle}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: colorTheme.secondary, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: `${colorTheme.secondary}20`, display: "inline-block" }}></span>
                Projects
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {projects.map(proj => (
                  <div key={proj.id} style={{ backgroundColor: "#f9fbfd", padding: "1.25rem", borderRadius: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: colorTheme.primary, margin: 0 }}>{proj.name}</h3>
                      {proj.link && <a href={proj.link} style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 700, textDecoration: "none" }}>Link ↗</a>}
                    </div>
                    {proj.technologies && <div style={{ fontSize: "0.85rem", color: "#777", fontWeight: 600, marginBottom: "0.5rem" }}>{proj.technologies}</div>}
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {skills.length > 0 && (
            <div style={cardStyle}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: colorTheme.secondary, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: `${colorTheme.secondary}20`, display: "inline-block" }}></span>
                Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {skills.map(skill => (
                  <div key={skill.id} style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText, padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: 600, border: `1px solid ${colorTheme.primaryLight}` }}>
                    {skill.name} {skill.level && <span style={{ opacity: 0.7, marginLeft: "0.25rem", fontSize: "0.8rem" }}>{skill.level}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div style={cardStyle}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: colorTheme.secondary, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: `${colorTheme.secondary}20`, display: "inline-block" }}></span>
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {education.map(edu => (
                  <div key={edu.id} style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50px", flexShrink: 0 }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: colorTheme.primaryLight, display: "flex", justifyContent: "center", alignItems: "center", color: colorTheme.primary, fontWeight: "bold", fontSize: "0.8rem" }}>
                        {new Date(edu.endDate).getFullYear() || "—"}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: colorTheme.primary, margin: "0 0 0.25rem 0" }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#666", marginBottom: "0.25rem" }}>{edu.institution}</div>
                      <div style={{ fontSize: "0.85rem", color: colorTheme.accent, marginBottom: "0.5rem" }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                      {edu.description && <p style={{ fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>{edu.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div style={cardStyle}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: colorTheme.secondary, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: `${colorTheme.secondary}20`, display: "inline-block" }}></span>
                Certifications
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {certifications.map(cert => (
                  <div key={cert.id} style={{ backgroundColor: "#f9fbfd", padding: "1rem", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: colorTheme.primary, margin: "0 0 0.25rem 0" }}>{cert.name}</h3>
                      <div style={{ fontSize: "0.85rem", color: "#777" }}>{cert.issuer}</div>
                    </div>
                    {cert.date && <div style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 700, backgroundColor: `${colorTheme.accent}15`, padding: "0.25rem 0.5rem", borderRadius: "8px" }}>{formatDate(cert.date)}</div>}
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
