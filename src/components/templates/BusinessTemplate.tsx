"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe, Briefcase } from "lucide-react";

export default function BusinessTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "Georgia, serif", backgroundColor: "#fff", color: "#333", lineHeight: 1.6, padding: "50px", border: `1px solid #ddd` }}>
      {/* Header */}
      <header style={{ borderBottom: `2px solid ${colorTheme.primary}`, paddingBottom: "20px", marginBottom: "30px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: colorTheme.primary, margin: "0 0 15px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.95rem", color: "#444" }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section style={{ marginBottom: "30px" }}>
          <p style={{ fontSize: "1rem", textAlign: "justify" }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
        
        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Briefcase size={20} /> Executive Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: "0.95rem", fontWeight: 600, color: colorTheme.secondary }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: "1rem", color: "#444", fontWeight: 600, marginBottom: "8px" }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ""}
                  </div>
                  <p style={{ fontSize: "0.95rem", margin: 0, whiteSpace: "pre-line", paddingLeft: "15px" }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {education.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 5px 0" }}>{edu.degree} in {edu.field}</h3>
                    <div style={{ fontSize: "0.95rem", color: "#444" }}>{edu.institution}</div>
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
                Competencies
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ border: `1px solid ${colorTheme.sectionBorder}`, padding: "5px 12px", borderRadius: "3px", fontSize: "0.9rem" }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Strategic Initiatives
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 5px 0" }}>{proj.name}</h3>
                  <p style={{ fontSize: "0.95rem", margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: colorTheme.primary, textTransform: "uppercase", borderBottom: `1px solid ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Certifications
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: "0.95rem" }}>
                  <strong>{cert.name}</strong> - {cert.issuer} ({formatDate(cert.date)})
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
