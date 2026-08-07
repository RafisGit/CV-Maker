"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, BookOpen } from "lucide-react";

export default function TeacherTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "'Georgia', serif", backgroundColor: "#fdfbf7", color: "#2c2c2c", lineHeight: 1.6, padding: "40px", borderTop: `15px solid ${colorTheme.primary}` }}>
      {/* Header */}
      <header style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "normal", color: colorTheme.primary, margin: "0 0 10px 0" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.9rem", fontFamily: "'Helvetica Neue', sans-serif" }}>
          {personalInfo.email && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Mail size={14} color={colorTheme.secondary} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Phone size={14} color={colorTheme.secondary} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><MapPin size={14} color={colorTheme.secondary} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Link2 size={14} color={colorTheme.secondary} /> {personalInfo.linkedin}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <div style={{ backgroundColor: colorTheme.primaryLight, padding: "20px 30px", borderRadius: "8px", marginBottom: "30px", fontStyle: "italic", textAlign: "center", fontSize: "1.05rem", color: colorTheme.primary }}>
          &quot;{personalInfo.summary}&quot;
        </div>
      )}

      {/* Main Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.4rem", color: colorTheme.primary, borderBottom: `1px dashed ${colorTheme.primary}`, paddingBottom: "10px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>
              <BookOpen size={20} /> Teaching Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                    <h3 style={{ fontSize: "1.15rem", margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: "0.95rem", fontStyle: "italic", color: "#555" }}>{formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                  </div>
                  <div style={{ fontSize: "1rem", color: colorTheme.secondary, fontWeight: "bold", marginBottom: "10px", fontFamily: "'Helvetica Neue', sans-serif" }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ""}
                  </div>
                  <p style={{ fontSize: "0.95rem", margin: 0, whiteSpace: "pre-line" }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div>
            {education.length > 0 && (
              <section style={{ marginBottom: "35px" }}>
                <h2 style={{ fontSize: "1.4rem", color: colorTheme.primary, borderBottom: `1px dashed ${colorTheme.primary}`, paddingBottom: "10px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Education
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 style={{ fontSize: "1.05rem", margin: "0 0 5px 0" }}>{edu.degree} in {edu.field}</h3>
                      <div style={{ fontSize: "0.95rem", color: colorTheme.secondary, fontFamily: "'Helvetica Neue', sans-serif" }}>{edu.institution}</div>
                      <div style={{ fontSize: "0.9rem", color: "#666", fontStyle: "italic" }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2 style={{ fontSize: "1.4rem", color: colorTheme.primary, borderBottom: `1px dashed ${colorTheme.primary}`, paddingBottom: "10px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Certifications
                </h2>
                <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {certifications.map((cert) => (
                    <li key={cert.id}>
                      <strong>{cert.name}</strong>
                      <br />
                      <span style={{ fontSize: "0.85rem", color: "#555" }}>{cert.issuer}, {formatDate(cert.date)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div>
            {skills.length > 0 && (
              <section style={{ marginBottom: "35px" }}>
                <h2 style={{ fontSize: "1.4rem", color: colorTheme.primary, borderBottom: `1px dashed ${colorTheme.primary}`, paddingBottom: "10px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Expertise
                </h2>
                <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "8px", fontFamily: "'Helvetica Neue', sans-serif" }}>
                  {skills.map((skill) => (
                    <li key={skill.id}>{skill.name}</li>
                  ))}
                </ul>
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 style={{ fontSize: "1.4rem", color: colorTheme.primary, borderBottom: `1px dashed ${colorTheme.primary}`, paddingBottom: "10px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Curriculum & Activities
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 style={{ fontSize: "1.05rem", margin: "0 0 5px 0" }}>{proj.name}</h3>
                      <p style={{ fontSize: "0.9rem", margin: 0 }}>{proj.description}</p>
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
