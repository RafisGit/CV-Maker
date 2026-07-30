"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";

export default function AcademicTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "Garamond, serif", backgroundColor: "#fff", color: "#000", lineHeight: 1.5, padding: "50px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "normal", margin: "0 0 10px 0" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ fontSize: "1rem", display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", color: "#333" }}>
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `2px solid #000`, paddingBottom: "5px", marginBottom: "15px" }}>
              Education
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: "flex" }}>
                  <div style={{ minWidth: "150px", fontWeight: "bold" }}>
                    {new Date(edu.endDate).getFullYear() || formatDate(edu.endDate)}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{edu.degree} in {edu.field}</div>
                    <div style={{ fontStyle: "italic", fontSize: "1rem" }}>{edu.institution}</div>
                    {edu.description && <div style={{ fontSize: "0.95rem", marginTop: "5px" }}>{edu.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `2px solid #000`, paddingBottom: "5px", marginBottom: "15px" }}>
              Academic Appointments
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: "flex" }}>
                  <div style={{ minWidth: "150px", fontWeight: "bold" }}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{exp.position}</div>
                    <div style={{ fontStyle: "italic", fontSize: "1rem" }}>{exp.company}{exp.location ? `, ${exp.location}` : ""}</div>
                    <p style={{ fontSize: "0.95rem", margin: "5px 0 0 0", whiteSpace: "pre-line" }}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `2px solid #000`, paddingBottom: "5px", marginBottom: "15px" }}>
              Publications & Research
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ paddingLeft: "150px" }}>
                  <div style={{ fontSize: "1rem", fontWeight: "bold" }}>{proj.name}</div>
                  <div style={{ fontSize: "0.95rem", fontStyle: "italic", marginBottom: "5px" }}>{proj.technologies}</div>
                  <div style={{ fontSize: "0.95rem" }}>{proj.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `2px solid #000`, paddingBottom: "5px", marginBottom: "15px" }}>
              Research Interests & Methods
            </h2>
            <div style={{ paddingLeft: "150px", fontSize: "1rem" }}>
              {skills.map(s => s.name).join(", ")}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase", borderBottom: `2px solid #000`, paddingBottom: "5px", marginBottom: "15px" }}>
              Honors & Awards
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ display: "flex" }}>
                  <div style={{ minWidth: "150px", fontWeight: "bold" }}>
                    {formatDate(cert.date)}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold" }}>{cert.name}</div>
                    <div style={{ fontStyle: "italic" }}>{cert.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
