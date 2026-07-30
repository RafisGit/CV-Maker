"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe, TrendingUp } from "lucide-react";

export default function MarketingTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: "#fff", color: "#333", lineHeight: 1.5, display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <header style={{ backgroundColor: colorTheme.primary, color: colorTheme.headerText, padding: "40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: "0 0 10px 0", letterSpacing: "2px", textTransform: "uppercase" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", fontSize: "0.9rem", opacity: 0.9 }}>
          {personalInfo.email && (
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Mail size={14} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Phone size={14} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <MapPin size={14} /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Link2 size={14} /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Globe size={14} /> {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      <div style={{ padding: "40px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px" }}>
        {/* Left Column */}
        <div>
          {personalInfo.summary && (
            <section style={{ marginBottom: "30px" }}>
              <h2 style={{ color: colorTheme.primary, fontSize: "1.2rem", fontWeight: 700, borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "8px", marginBottom: "15px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
                 Profile
              </h2>
              <p style={{ fontSize: "0.95rem" }}>{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section style={{ marginBottom: "30px" }}>
              <h2 style={{ color: colorTheme.primary, fontSize: "1.2rem", fontWeight: 700, borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "8px", marginBottom: "15px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
                 Experience & Impact
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#222" }}>{exp.position}</h3>
                      <span style={{ backgroundColor: colorTheme.dateBg, color: colorTheme.dateText, padding: "4px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 600 }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div style={{ color: colorTheme.secondary, fontSize: "0.95rem", fontWeight: 500, marginBottom: "8px" }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    <p style={{ fontSize: "0.9rem", whiteSpace: "pre-line" }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: "30px" }}>
              <h2 style={{ color: colorTheme.primary, fontSize: "1.2rem", fontWeight: 700, borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "8px", marginBottom: "15px", textTransform: "uppercase" }}>
                Campaigns & Projects
              </h2>
              <div style={{ display: "grid", gap: "15px" }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ border: `1px solid ${colorTheme.sectionBorder}`, padding: "15px", borderRadius: "8px", borderLeft: `4px solid ${colorTheme.primary}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#222" }}>{proj.name}</h3>
                      {proj.link && <span style={{ fontSize: "0.8rem", color: colorTheme.primary }}>{proj.link}</span>}
                    </div>
                    {proj.technologies && (
                      <div style={{ color: colorTheme.secondary, fontSize: "0.85rem", marginTop: "5px", fontStyle: "italic" }}>
                        {proj.technologies}
                      </div>
                    )}
                    <p style={{ fontSize: "0.9rem", marginTop: "8px", whiteSpace: "pre-line" }}>{proj.description}</p>
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
              <h2 style={{ color: colorTheme.primary, fontSize: "1.2rem", fontWeight: 700, borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "8px", marginBottom: "15px", textTransform: "uppercase" }}>
                Core Competencies
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ backgroundColor: colorTheme.skillBg, color: colorTheme.skillText, padding: "6px 12px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    <TrendingUp size={12} /> {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: "30px" }}>
              <h2 style={{ color: colorTheme.primary, fontSize: "1.2rem", fontWeight: 700, borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "8px", marginBottom: "15px", textTransform: "uppercase" }}>
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#222" }}>{edu.degree} in {edu.field}</h3>
                    <div style={{ color: colorTheme.secondary, fontSize: "0.9rem" }}>{edu.institution}</div>
                    <div style={{ color: "#666", fontSize: "0.85rem", marginTop: "2px" }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section style={{ marginBottom: "30px" }}>
              <h2 style={{ color: colorTheme.primary, fontSize: "1.2rem", fontWeight: 700, borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "8px", marginBottom: "15px", textTransform: "uppercase" }}>
                Certifications
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#222" }}>{cert.name}</h3>
                    <div style={{ color: colorTheme.secondary, fontSize: "0.85rem" }}>
                      {cert.issuer} • {formatDate(cert.date)}
                    </div>
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
