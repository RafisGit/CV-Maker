"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function CardTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "2.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    marginBottom: "2rem",
    border: `1px solid ${colorTheme.sectionBorder}`,
  };

  const sectionTitleStyle = {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: colorTheme.primary,
    marginBottom: "1.5rem",
    borderBottom: `2px solid ${colorTheme.accent}`,
    display: "inline-block",
    paddingBottom: "0.25rem",
  };

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: colorTheme.sidebarBg, color: "#333", width: "100%", minHeight: "100%", padding: "3rem 0" }}>
      <div style={{ maxWidth: "850px", margin: "0 auto", padding: "0 2rem" }}>
        
        {/* Header Card */}
        <div style={{ ...cardStyle, textAlign: "center", borderTop: `8px solid ${colorTheme.primary}` }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 0.5rem 0", color: colorTheme.secondary }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", fontSize: "0.95rem", color: "#555", marginTop: "1.5rem" }}>
            {personalInfo.email && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Mail size={16} color={colorTheme.accent} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Phone size={16} color={colorTheme.accent} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><MapPin size={16} color={colorTheme.accent} /> {personalInfo.location}</span>}
            {personalInfo.linkedin && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Link2 size={16} color={colorTheme.accent} /> {personalInfo.linkedin}</span>}
            {personalInfo.website && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Globe size={16} color={colorTheme.accent} /> {personalInfo.website}</span>}
          </div>
          
          {personalInfo.summary && (
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6, marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: `1px solid ${colorTheme.sectionBorder}` }}>
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Experience Card */}
        {experience.length > 0 && (
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Professional Experience</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: colorTheme.secondary, margin: 0 }}>{exp.position}</h3>
                      <div style={{ fontSize: "1rem", fontWeight: 600, color: colorTheme.primary, marginTop: "0.25rem" }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                    </div>
                    <span style={{ fontSize: "0.9rem", backgroundColor: colorTheme.dateBg, color: colorTheme.dateText, padding: "0.3rem 0.8rem", borderRadius: "20px", fontWeight: 600 }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#444", margin: "0.5rem 0 0 0" }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Card */}
        {education.length > 0 && (
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Education</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: colorTheme.secondary, margin: 0 }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <div style={{ fontSize: "1rem", fontWeight: 500, color: "#555", marginTop: "0.25rem" }}>{edu.institution}</div>
                    </div>
                    <span style={{ fontSize: "0.9rem", backgroundColor: colorTheme.dateBg, color: colorTheme.dateText, padding: "0.3rem 0.8rem", borderRadius: "20px", fontWeight: 600 }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#444", margin: "0.5rem 0 0 0" }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-Column Row for Skills & Certs/Projects */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          
          {/* Skills Card */}
          {skills.length > 0 && (
            <div style={{ ...cardStyle, marginBottom: 0 }}>
              <h2 style={sectionTitleStyle}>Skills</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText, padding: "0.4rem 0.8rem", borderRadius: "6px", fontSize: "0.9rem", fontWeight: 500 }}>
                    {skill.name} {skill.level && <span style={{ opacity: 0.8, fontSize: "0.8rem", marginLeft: "4px" }}>({skill.level})</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Certifications Card */}
            {certifications.length > 0 && (
              <div style={{ ...cardStyle, marginBottom: 0 }}>
                <h2 style={sectionTitleStyle}>Certifications</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: colorTheme.secondary, margin: 0 }}>{cert.name}</h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.25rem" }}>
                        <span style={{ fontSize: "0.9rem", color: "#555" }}>{cert.issuer}</span>
                        {cert.date && <span style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 600 }}>{formatDate(cert.date)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Card */}
        {projects.length > 0 && (
          <div style={{ ...cardStyle, marginTop: "2rem", marginBottom: 0 }}>
            <h2 style={sectionTitleStyle}>Projects</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ padding: "1.5rem", borderRadius: "8px", backgroundColor: "#f8f9fa", border: `1px solid ${colorTheme.sectionBorder}` }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: colorTheme.secondary, margin: "0 0 0.5rem 0" }}>{proj.name}</h3>
                  {proj.technologies && <div style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 600, marginBottom: "0.75rem" }}>{proj.technologies}</div>}
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "#444", margin: "0 0 1rem 0" }}>{proj.description}</p>
                  {proj.link && <a href={proj.link} style={{ fontSize: "0.9rem", color: colorTheme.primary, fontWeight: "bold", textDecoration: "none" }}>View Details &rarr;</a>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
