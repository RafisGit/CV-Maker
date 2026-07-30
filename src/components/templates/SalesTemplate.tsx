"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Target } from "lucide-react";

export default function SalesTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", color: "#333", lineHeight: 1.5, padding: "40px" }}>
      {/* Header */}
      <header style={{ borderBottom: `4px solid ${colorTheme.primary}`, paddingBottom: "20px", marginBottom: "30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, margin: "0 0 5px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div style={{ fontSize: "1.2rem", color: colorTheme.secondary, fontWeight: 600, textTransform: "uppercase" }}>
            Sales & Business Development
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", fontSize: "0.9rem", textAlign: "right" }}>
          {personalInfo.phone && <span>{personalInfo.phone} <Phone size={14} style={{ verticalAlign: "middle" }} color={colorTheme.primary} /></span>}
          {personalInfo.email && <span>{personalInfo.email} <Mail size={14} style={{ verticalAlign: "middle" }} color={colorTheme.primary} /></span>}
          {personalInfo.location && <span>{personalInfo.location} <MapPin size={14} style={{ verticalAlign: "middle" }} color={colorTheme.primary} /></span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin} <Link2 size={14} style={{ verticalAlign: "middle" }} color={colorTheme.primary} /></span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section style={{ marginBottom: "30px" }}>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, margin: 0, borderLeft: `4px solid ${colorTheme.accent}`, paddingLeft: "15px" }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "40px" }}>
        {/* Left Column */}
        <div>
          {experience.length > 0 && (
            <section style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Target size={24} /> Professional Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: colorTheme.primary }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div style={{ fontSize: "1rem", color: colorTheme.secondary, fontWeight: 600, marginBottom: "10px" }}>
                      {exp.company}{exp.location ? ` | ${exp.location}` : ""}
                    </div>
                    <div style={{ fontSize: "0.95rem", whiteSpace: "pre-line", paddingLeft: "15px", borderLeft: `2px solid ${colorTheme.primaryLight}` }}>
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "20px" }}>
                Key Achievements
              </h2>
              <div style={{ display: "grid", gap: "15px" }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ backgroundColor: colorTheme.primaryLight, padding: "15px", borderRadius: "8px" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 5px 0", color: colorTheme.primary }}>{proj.name}</h3>
                    <p style={{ fontSize: "0.9rem", margin: 0 }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {skills.length > 0 && (
            <section style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
                Core Strengths
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {skills.map((skill) => (
                  <div key={skill.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 5px 0" }}>{edu.degree}</h3>
                    <div style={{ fontSize: "0.9rem", color: colorTheme.secondary }}>{edu.field}</div>
                    <div style={{ fontSize: "0.85rem" }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
                Certifications
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ fontSize: "0.9rem" }}>
                    <strong>{cert.name}</strong><br />
                    <span style={{ color: "#666", fontSize: "0.85rem" }}>{formatDate(cert.date)}</span>
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
