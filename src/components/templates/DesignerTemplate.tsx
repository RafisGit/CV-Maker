"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";

export default function DesignerTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#fff", color: "#222", lineHeight: 1.6, padding: "50px" }}>
      {/* Header */}
      <header style={{ marginBottom: "50px" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 900, lineHeight: 1, margin: "0 0 20px 0", letterSpacing: "-2px", color: colorTheme.primary }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        {personalInfo.summary && (
          <p style={{ fontSize: "1.2rem", fontWeight: 300, maxWidth: "700px", margin: "0 0 20px 0", color: "#555" }}>
            {personalInfo.summary}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", fontSize: "0.9rem", fontWeight: 500, color: colorTheme.secondary }}>
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} style={{ color: "inherit", textDecoration: "none", borderBottom: `1px solid ${colorTheme.primary}` }}>{personalInfo.email}</a>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <a href={personalInfo.website} style={{ color: "inherit", textDecoration: "none", borderBottom: `1px solid ${colorTheme.primary}` }}>Portfolio</a>}
          {personalInfo.linkedin && <a href={personalInfo.linkedin} style={{ color: "inherit", textDecoration: "none", borderBottom: `1px solid ${colorTheme.primary}` }}>LinkedIn</a>}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "50px" }}>
        
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 20px 0", color: colorTheme.primary }}>Skills</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ backgroundColor: colorTheme.primaryLight, color: colorTheme.primary, padding: "8px 16px", borderRadius: "30px", fontSize: "0.85rem", fontWeight: 600 }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 20px 0", color: colorTheme.primary }}>Education</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 5px 0" }}>{edu.degree}</h3>
                    <div style={{ fontSize: "0.95rem", color: "#555" }}>{edu.field}</div>
                    <div style={{ fontSize: "0.85rem", color: colorTheme.secondary, marginTop: "5px" }}>{edu.institution}, {formatDate(edu.endDate)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {certifications.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 20px 0", color: colorTheme.primary }}>Awards / Certs</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 5px 0" }}>{cert.name}</h3>
                    <div style={{ fontSize: "0.85rem", color: colorTheme.secondary }}>{cert.issuer} • {formatDate(cert.date)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {experience.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 20px 0", color: colorTheme.primary }}>Experience</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ position: "relative", paddingLeft: "20px", borderLeft: `2px solid ${colorTheme.primaryLight}` }}>
                    <div style={{ position: "absolute", left: "-6px", top: "5px", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: colorTheme.primary }}></div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 5px 0" }}>{exp.position}</h3>
                    <div style={{ fontSize: "1rem", color: colorTheme.secondary, fontWeight: 500, marginBottom: "10px" }}>
                      {exp.company} • {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                    <p style={{ fontSize: "0.95rem", color: "#444", margin: 0, whiteSpace: "pre-line" }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 20px 0", color: colorTheme.primary }}>Selected Works</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "12px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 10px 0" }}>{proj.name}</h3>
                    <p style={{ fontSize: "0.9rem", color: "#555", margin: 0 }}>{proj.description}</p>
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
