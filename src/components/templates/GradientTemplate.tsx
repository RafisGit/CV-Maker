"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function GradientTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const gradientHeaderStyle = {
    background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.accent} 100%)`,
    color: "#fff",
    padding: "4rem 3rem",
    position: "relative" as const,
    overflow: "hidden",
    borderRadius: "0 0 30px 30px",
  };

  const sectionTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: colorTheme.primary,
    marginBottom: "1.5rem",
    position: "relative" as const,
    paddingBottom: "0.5rem",
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f4f7f6", color: "#333", width: "100%", minHeight: "100%" }}>
      
      {/* Header */}
      <header style={gradientHeaderStyle}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "0.5rem", textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          {personalInfo.summary && <p style={{ fontSize: "1.1rem", maxWidth: "800px", lineHeight: 1.6, opacity: 0.9, marginBottom: "2rem" }}>{personalInfo.summary}</p>}
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.95rem", backgroundColor: "rgba(255,255,255,0.15)", padding: "1rem 1.5rem", borderRadius: "12px", backdropFilter: "blur(5px)" }}>
            {personalInfo.email && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Mail size={16} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Phone size={16} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={16} /> {personalInfo.location}</div>}
            {personalInfo.linkedin && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Link2 size={16} /> {personalInfo.linkedin}</div>}
            {personalInfo.website && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Globe size={16} /> {personalInfo.website}</div>}
          </div>
        </div>
      </header>

      <div style={{ padding: "3rem", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
        
        {/* Experience & Education */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "3rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {experience.length > 0 && (
              <section>
                <h2 style={sectionTitleStyle}>
                  Work Experience
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "50px", height: "4px", background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`, borderRadius: "2px" }}></div>
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  {experience.map((exp) => (
                    <div key={exp.id} style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: colorTheme.secondary, margin: 0 }}>{exp.position}</h3>
                        <span style={{ fontSize: "0.85rem", background: `linear-gradient(90deg, ${colorTheme.primaryLight}, #fff)`, color: colorTheme.primary, padding: "0.4rem 0.8rem", borderRadius: "20px", fontWeight: "bold", border: `1px solid ${colorTheme.sectionBorder}` }}>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#666", marginBottom: "1rem" }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#555", margin: 0 }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 style={sectionTitleStyle}>
                  Education
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "50px", height: "4px", background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`, borderRadius: "2px" }}></div>
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", borderLeft: `4px solid ${colorTheme.primary}` }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: colorTheme.secondary, margin: "0 0 0.5rem 0" }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#666", marginBottom: "0.5rem" }}>{edu.institution}</div>
                      <div style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 600 }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                      {edu.description && <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "#555", margin: "0.75rem 0 0 0" }}>{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {skills.length > 0 && (
              <section>
                <h2 style={sectionTitleStyle}>
                  Skills
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "50px", height: "4px", background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`, borderRadius: "2px" }}></div>
                </h2>
                <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {skills.map((skill) => (
                      <span key={skill.id} style={{ background: `linear-gradient(135deg, ${colorTheme.primaryLight} 0%, #fff 100%)`, color: colorTheme.primary, padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 600, border: `1px solid ${colorTheme.sectionBorder}` }}>
                        {skill.name} {skill.level && <span style={{ opacity: 0.7, fontSize: "0.8rem", marginLeft: "4px" }}>({skill.level})</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 style={sectionTitleStyle}>
                  Projects
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "50px", height: "4px", background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`, borderRadius: "2px" }}></div>
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {projects.map((proj) => (
                    <div key={proj.id} style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})` }}></div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: colorTheme.secondary, margin: "0 0 0.25rem 0" }}>{proj.name}</h3>
                      {proj.technologies && <div style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: 600, marginBottom: "0.5rem" }}>{proj.technologies}</div>}
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "#555", margin: "0 0 0.75rem 0" }}>{proj.description}</p>
                      {proj.link && <a href={proj.link} style={{ fontSize: "0.85rem", color: colorTheme.primary, fontWeight: "bold", textDecoration: "none" }}>View Project →</a>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2 style={sectionTitleStyle}>
                  Certificates
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "50px", height: "4px", background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`, borderRadius: "2px" }}></div>
                </h2>
                <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: `1px solid ${colorTheme.sectionBorder}` }}>
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: colorTheme.secondary, margin: "0 0 0.25rem 0" }}>{cert.name}</h3>
                        <div style={{ fontSize: "0.85rem", color: "#666" }}>{cert.issuer}</div>
                      </div>
                      {cert.date && <div style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: "bold" }}>{formatDate(cert.date)}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
