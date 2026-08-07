"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe, Activity } from "lucide-react";

export default function MedicalTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", color: "#333", lineHeight: 1.6, padding: "40px" }}>
      {/* Header */}
      <header style={{ borderBottom: `3px solid ${colorTheme.primary}`, paddingBottom: "20px", marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: colorTheme.primary, margin: "0 0 10px 0" }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          {personalInfo.summary && (
            <p style={{ fontSize: "0.95rem", color: "#555", maxWidth: "600px", margin: 0 }}>
              {personalInfo.summary}
            </p>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", fontSize: "0.85rem", color: "#666" }}>
          {personalInfo.email && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Mail size={14} color={colorTheme.primary} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Phone size={14} color={colorTheme.primary} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><MapPin size={14} color={colorTheme.primary} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Link2 size={14} color={colorTheme.primary} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Globe size={14} color={colorTheme.primary} /> {personalInfo.website}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "25px" }}>
        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={18} /> Licensure & Certifications
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ display: "flex", flexDirection: "column" }}>
                  <strong style={{ fontSize: "0.95rem" }}>{cert.name}</strong>
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>{cert.issuer} | {formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Education & Training
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <strong style={{ fontSize: "1.05rem" }}>{edu.degree} in {edu.field}</strong>
                    <span style={{ fontSize: "0.9rem", color: "#666" }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", color: colorTheme.secondary }}>{edu.institution}</div>
                  {edu.description && <p style={{ fontSize: "0.9rem", marginTop: "5px" }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Clinical Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <strong style={{ fontSize: "1.05rem" }}>{exp.position}</strong>
                    <span style={{ fontSize: "0.9rem", color: "#666" }}>{formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", color: colorTheme.secondary }}>{exp.company}{exp.location ? `, ${exp.location}` : ""}</div>
                  <p style={{ fontSize: "0.9rem", marginTop: "5px", whiteSpace: "pre-line" }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
          {skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.2rem", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
                Clinical Skills
              </h2>
              <ul style={{ margin: 0, paddingLeft: "20px", display: "grid", gridTemplateColumns: "1fr", gap: "5px" }}>
                {skills.map((skill) => (
                  <li key={skill.id} style={{ fontSize: "0.9rem" }}>{skill.name} - <span style={{ color: "#666" }}>{skill.level}</span></li>
                ))}
              </ul>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.2rem", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
                Research & Presentations
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <strong style={{ fontSize: "0.95rem" }}>{proj.name}</strong>
                    <p style={{ fontSize: "0.85rem", marginTop: "3px", color: "#555" }}>{proj.description}</p>
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
