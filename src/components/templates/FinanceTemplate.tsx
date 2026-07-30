"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";

export default function FinanceTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif", backgroundColor: "#fff", color: "#000", lineHeight: 1.4, padding: "50px", maxWidth: "850px", margin: "0 auto" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: "0 0 5px 0", textTransform: "uppercase" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ fontSize: "0.9rem", color: "#333", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.location && (personalInfo.phone || personalInfo.email) && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span>|</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.primary}`, paddingBottom: "2px", marginBottom: "10px", color: colorTheme.primary }}>
              Education
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "1rem" }}>{edu.institution}</strong>
                    <span style={{ fontSize: "0.9rem" }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontStyle: "italic", fontSize: "0.95rem" }}>
                    <span>{edu.degree} in {edu.field}</span>
                  </div>
                  {edu.description && <p style={{ fontSize: "0.9rem", margin: "5px 0 0 0" }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.primary}`, paddingBottom: "2px", marginBottom: "10px", color: colorTheme.primary }}>
              Professional Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "1rem" }}>{exp.company}</strong>
                    <span style={{ fontSize: "0.9rem" }}>{formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontStyle: "italic", fontSize: "0.95rem", marginBottom: "5px" }}>
                    <span>{exp.position}</span>
                    <span>{exp.location}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", margin: 0, whiteSpace: "pre-line", paddingLeft: "15px" }}>
                    {exp.description.split('\n').map((line, i) => (
                      <span key={i} style={{ display: "block", position: "relative" }}>
                        <span style={{ position: "absolute", left: "-15px" }}>•</span> {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.primary}`, paddingBottom: "2px", marginBottom: "10px", color: colorTheme.primary }}>
              Selected Projects & Transactions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "1rem" }}>{proj.name}</strong>
                  </div>
                  <p style={{ fontSize: "0.9rem", margin: "2px 0 0 0" }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.primary}`, paddingBottom: "2px", marginBottom: "10px", color: colorTheme.primary }}>
              Skills & Interests
            </h2>
            <div style={{ fontSize: "0.95rem" }}>
              <strong>Technical:</strong> {skills.map(s => s.name).join(", ")}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.primary}`, paddingBottom: "2px", marginBottom: "10px", color: colorTheme.primary }}>
              Certifications
            </h2>
            <div style={{ fontSize: "0.95rem" }}>
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <strong>{cert.name}</strong>, {cert.issuer} ({formatDate(cert.date)})
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
