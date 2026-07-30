"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe, Code } from "lucide-react";

export default function EngineeringTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "'Consolas', 'Courier New', monospace", backgroundColor: "#f4f4f9", color: "#333", lineHeight: 1.6, padding: "40px" }}>
      {/* Header */}
      <header style={{ backgroundColor: colorTheme.primary, color: colorTheme.headerText, padding: "30px", borderRadius: "8px", marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", margin: "0 0 10px 0" }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div style={{ fontSize: "1rem", color: colorTheme.primaryLight, opacity: 0.9 }}>
            Software Engineer
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", fontSize: "0.85rem", textAlign: "right" }}>
          {personalInfo.email && <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px" }}><Mail size={14} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px" }}><Phone size={14} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px" }}><MapPin size={14} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px" }}><Link2 size={14} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px" }}><Globe size={14} /> {personalInfo.website}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
        {personalInfo.summary && (
          <section>
             <div style={{ padding: "15px", backgroundColor: "#fff", borderLeft: `4px solid ${colorTheme.accent}`, borderRadius: "4px", fontSize: "0.95rem" }}>
               {personalInfo.summary}
             </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px dashed ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Code size={18} /> Technical Skills
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
              {skills.map((skill) => (
                <div key={skill.id} style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#fff", padding: "8px 12px", borderRadius: "4px", border: `1px solid ${colorTheme.sectionBorder}` }}>
                  <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{skill.name}</span>
                  <span style={{ fontSize: "0.8rem", color: colorTheme.secondary }}>{skill.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px dashed ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: `1px solid ${colorTheme.sectionBorder}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", margin: 0, color: colorTheme.primary }}>{exp.position}</h3>
                      <div style={{ fontSize: "0.95rem", color: "#555" }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                    </div>
                    <span style={{ fontSize: "0.9rem", color: colorTheme.secondary, backgroundColor: colorTheme.primaryLight, padding: "4px 8px", borderRadius: "4px" }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.9rem", margin: 0, whiteSpace: "pre-line" }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px dashed ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Projects & Architecture
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "8px", border: `1px solid ${colorTheme.sectionBorder}` }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "bold", margin: "0 0 5px 0", color: colorTheme.primary }}>{proj.name}</h3>
                  {proj.technologies && <div style={{ fontSize: "0.85rem", color: colorTheme.secondary, marginBottom: "8px", fontStyle: "italic" }}>Tech: {proj.technologies}</div>}
                  <p style={{ fontSize: "0.9rem", margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: colorTheme.primary, textTransform: "uppercase", borderBottom: `2px dashed ${colorTheme.sectionBorder}`, paddingBottom: "5px", marginBottom: "15px" }}>
              Education
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "8px", border: `1px solid ${colorTheme.sectionBorder}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>{edu.degree} in {edu.field}</h3>
                    <span style={{ fontSize: "0.9rem", color: colorTheme.secondary }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#555" }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
