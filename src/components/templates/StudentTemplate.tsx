"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe, GraduationCap } from "lucide-react";

export default function StudentTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: "#111", lineHeight: 1.5, padding: "40px" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, color: colorTheme.primary, margin: "0 0 15px 0", letterSpacing: "-0.5px" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", fontSize: "0.9rem", color: "#555" }}>
          {personalInfo.email && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Mail size={14} color={colorTheme.accent} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Phone size={14} color={colorTheme.accent} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={14} color={colorTheme.accent} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Link2 size={14} color={colorTheme.accent} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Globe size={14} color={colorTheme.accent} /> {personalInfo.website}</span>}
        </div>
        {personalInfo.summary && (
          <p style={{ marginTop: "20px", fontSize: "1rem", maxWidth: "800px", margin: "20px auto 0", color: "#444" }}>
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* Main Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primaryLight}`, paddingBottom: "5px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <GraduationCap size={20} /> Education
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>{edu.institution}</h3>
                    <div style={{ fontSize: "0.95rem", color: colorTheme.secondary, fontWeight: 500 }}>{edu.degree} in {edu.field}</div>
                    {edu.description && <p style={{ fontSize: "0.85rem", marginTop: "5px", color: "#555" }}>{edu.description}</p>}
                  </div>
                  <div style={{ textAlign: "right", fontSize: "0.9rem", color: "#666", minWidth: "120px" }}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primaryLight}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Skills
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText, padding: "5px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 500 }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primaryLight}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Relevant Projects
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ border: `1px solid ${colorTheme.sectionBorder}`, padding: "15px", borderRadius: "6px" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600, margin: "0 0 5px 0" }}>{proj.name}</h3>
                  {proj.technologies && <div style={{ fontSize: "0.8rem", color: colorTheme.secondary, marginBottom: "8px" }}>{proj.technologies}</div>}
                  <p style={{ fontSize: "0.85rem", color: "#444", margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primaryLight}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: "0.9rem", color: "#666" }}>{formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", color: colorTheme.secondary, fontWeight: 500, marginBottom: "5px" }}>{exp.company}{exp.location ? ` | ${exp.location}` : ""}</div>
                  <p style={{ fontSize: "0.9rem", color: "#444", margin: 0, whiteSpace: "pre-line" }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, borderBottom: `2px solid ${colorTheme.primaryLight}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Certifications
            </h2>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {certifications.map((cert) => (
                <li key={cert.id} style={{ fontSize: "0.9rem", color: "#444", marginBottom: "5px" }}>
                  <strong>{cert.name}</strong> – {cert.issuer} ({formatDate(cert.date)})
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
