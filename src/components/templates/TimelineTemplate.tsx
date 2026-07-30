"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function TimelineTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const headerStyle = {
    backgroundColor: colorTheme.headerBg,
    color: colorTheme.headerText,
    padding: "3rem",
    textAlign: "center" as const,
  };

  const timelineDotStyle = {
    width: "12px",
    height: "12px",
    backgroundColor: colorTheme.accent,
    borderRadius: "50%",
    position: "absolute" as const,
    left: "-6px",
    top: "6px",
    boxShadow: `0 0 0 3px #fff, 0 0 0 5px ${colorTheme.primaryLight}`,
  };

  const timelineLineStyle = {
    position: "absolute" as const,
    left: "0",
    top: "0",
    bottom: "0",
    width: "2px",
    backgroundColor: colorTheme.sectionBorder,
  };

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#fff", color: "#333", width: "100%", minHeight: "100%" }}>
      <header style={headerStyle}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem", letterSpacing: "1px" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem", fontSize: "0.9rem" }}>
          {personalInfo.email && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Mail size={14} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Phone size={14} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><MapPin size={14} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Link2 size={14} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Globe size={14} /> {personalInfo.website}</span>}
        </div>
      </header>

      <div style={{ padding: "3rem", maxWidth: "900px", margin: "0 auto" }}>
        {personalInfo.summary && (
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", color: colorTheme.primary, marginBottom: "1rem", textAlign: "center", textTransform: "uppercase" }}>Summary</h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, textAlign: "center", maxWidth: "800px", margin: "0 auto", color: "#555" }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div style={{ display: "flex", gap: "3rem" }}>
          {/* Main Timeline Column */}
          <div style={{ flex: "2" }}>
            {experience.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", color: colorTheme.primary, marginBottom: "1.5rem", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  Experience
                </h2>
                <div style={{ position: "relative", paddingLeft: "2rem" }}>
                  <div style={timelineLineStyle}></div>
                  {experience.map((exp, index) => (
                    <div key={exp.id} style={{ position: "relative", marginBottom: index === experience.length - 1 ? "0" : "2rem" }}>
                      <div style={timelineDotStyle}></div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <div>
                          <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: colorTheme.secondary }}>{exp.position}</h3>
                          <div style={{ fontSize: "1rem", color: colorTheme.primary, fontWeight: 500 }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                        </div>
                        <span style={{ fontSize: "0.85rem", backgroundColor: colorTheme.dateBg, color: colorTheme.dateText, padding: "0.25rem 0.75rem", borderRadius: "12px", fontWeight: "bold" }}>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#444" }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", color: colorTheme.primary, marginBottom: "1.5rem", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  Education
                </h2>
                <div style={{ position: "relative", paddingLeft: "2rem" }}>
                  <div style={timelineLineStyle}></div>
                  {education.map((edu, index) => (
                    <div key={edu.id} style={{ position: "relative", marginBottom: index === education.length - 1 ? "0" : "2rem" }}>
                      <div style={timelineDotStyle}></div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <div>
                          <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: colorTheme.secondary }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                          <div style={{ fontSize: "1rem", color: colorTheme.primary, fontWeight: 500 }}>{edu.institution}</div>
                        </div>
                        <span style={{ fontSize: "0.85rem", backgroundColor: colorTheme.dateBg, color: colorTheme.dateText, padding: "0.25rem 0.75rem", borderRadius: "12px", fontWeight: "bold" }}>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      {edu.description && <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#444" }}>{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column */}
          <div style={{ flex: "1" }}>
            {skills.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", color: colorTheme.primary, marginBottom: "1.5rem", textTransform: "uppercase", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "0.5rem" }}>
                  Skills
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {skills.map((skill) => (
                    <div key={skill.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.5rem", borderBottom: `1px solid ${colorTheme.sectionBorder}40` }}>
                      <span style={{ fontWeight: 500 }}>{skill.name}</span>
                      {skill.level && (
                        <span style={{ fontSize: "0.8rem", color: colorTheme.accent, fontWeight: "bold", backgroundColor: `${colorTheme.accent}15`, padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", color: colorTheme.primary, marginBottom: "1.5rem", textTransform: "uppercase", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "0.5rem" }}>
                  Projects
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: colorTheme.secondary, marginBottom: "0.25rem" }}>{proj.name}</h3>
                      {proj.technologies && <div style={{ fontSize: "0.8rem", color: colorTheme.accent, marginBottom: "0.5rem", fontWeight: 500 }}>{proj.technologies}</div>}
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "#555" }}>{proj.description}</p>
                      {proj.link && <a href={proj.link} style={{ display: "inline-block", marginTop: "0.5rem", fontSize: "0.85rem", color: colorTheme.primary, textDecoration: "underline" }}>View Project</a>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", color: colorTheme.primary, marginBottom: "1.5rem", textTransform: "uppercase", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "0.5rem" }}>
                  Certifications
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: colorTheme.secondary }}>{cert.name}</h3>
                      <div style={{ fontSize: "0.9rem", color: "#555" }}>{cert.issuer}</div>
                      {cert.date && <div style={{ fontSize: "0.8rem", color: colorTheme.accent, marginTop: "0.25rem" }}>{formatDate(cert.date)}</div>}
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
