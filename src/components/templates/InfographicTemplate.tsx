"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { ColorTheme } from "@/lib/templates/colors";
import { Mail, Phone, MapPin, Link2, Globe, Briefcase, GraduationCap, Award, Code, FolderGit2 } from "lucide-react";

export default function InfographicTemplate({ data, colorTheme }: { data: CVData; colorTheme: ColorTheme }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const getSkillPercentage = (level: string) => {
    switch(level) {
      case "Beginner": return "25%";
      case "Intermediate": return "50%";
      case "Advanced": return "75%";
      case "Expert": return "100%";
      default: return "50%";
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", fontFamily: "sans-serif", backgroundColor: "#f8f9fa", color: "#333", width: "100%", minHeight: "100%" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: colorTheme.headerBg, color: colorTheme.headerText, padding: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `8px solid ${colorTheme.accent}` }}>
        <div>
          <h1 style={{ fontSize: "3rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "2px", margin: 0 }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          {personalInfo.summary && <p style={{ fontSize: "1.1rem", marginTop: "1rem", maxWidth: "600px", lineHeight: 1.6, opacity: 0.9 }}>{personalInfo.summary}</p>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", backgroundColor: "rgba(0,0,0,0.1)", padding: "1.5rem", borderRadius: "12px" }}>
          {personalInfo.email && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}><Mail size={16} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}><Phone size={16} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}><MapPin size={16} /> {personalInfo.location}</div>}
          {personalInfo.linkedin && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}><Link2 size={16} /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}><Globe size={16} /> {personalInfo.website}</div>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", padding: "2rem" }}>
        
        {/* Main Content Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Experience Section */}
          {experience.length > 0 && (
            <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "1rem" }}>
                <div style={{ backgroundColor: colorTheme.primaryLight, padding: "0.75rem", borderRadius: "8px", color: colorTheme.primary }}><Briefcase size={24} /></div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: colorTheme.primary, margin: 0 }}>Work Experience</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ borderLeft: `4px solid ${colorTheme.accent}`, paddingLeft: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: "bold", color: colorTheme.secondary, margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: "0.85rem", backgroundColor: colorTheme.dateBg, color: colorTheme.dateText, padding: "0.4rem 0.8rem", borderRadius: "20px", fontWeight: "bold" }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div style={{ fontSize: "1.1rem", color: colorTheme.primary, fontWeight: 600, marginBottom: "0.75rem" }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#555", margin: 0 }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "1rem" }}>
                <div style={{ backgroundColor: colorTheme.primaryLight, padding: "0.75rem", borderRadius: "8px", color: colorTheme.primary }}><GraduationCap size={24} /></div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: colorTheme.primary, margin: 0 }}>Education</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", border: `1px solid ${colorTheme.sectionBorder}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: colorTheme.secondary, margin: 0 }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <span style={{ fontSize: "0.85rem", color: colorTheme.accent, fontWeight: "bold" }}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <div style={{ fontSize: "1.05rem", color: colorTheme.primary, fontWeight: 500 }}>{edu.institution}</div>
                    {edu.description && <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#555", marginTop: "0.75rem", marginBottom: 0 }}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Skills Section with Progress Bars */}
          {skills.length > 0 && (
            <div style={{ backgroundColor: colorTheme.primary, color: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: "2px solid rgba(255,255,255,0.2)", paddingBottom: "1rem" }}>
                <div style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: "0.75rem", borderRadius: "8px" }}><Code size={24} /></div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Technical Skills</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.95rem", fontWeight: 600 }}>
                      <span>{skill.name}</span>
                      {skill.level && <span>{skill.level}</span>}
                    </div>
                    <div style={{ width: "100%", height: "8px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: getSkillPercentage(skill.level), height: "100%", backgroundColor: colorTheme.accent, borderRadius: "4px" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "1rem" }}>
                <div style={{ backgroundColor: colorTheme.primaryLight, padding: "0.75rem", borderRadius: "8px", color: colorTheme.primary }}><FolderGit2 size={24} /></div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: colorTheme.primary, margin: 0 }}>Projects</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: colorTheme.secondary, margin: "0 0 0.25rem 0" }}>{proj.name}</h3>
                    {proj.technologies && <div style={{ fontSize: "0.8rem", color: colorTheme.accent, marginBottom: "0.5rem", fontWeight: 600, display: "inline-block", backgroundColor: `${colorTheme.accent}15`, padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{proj.technologies}</div>}
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "#555", margin: "0 0 0.5rem 0" }}>{proj.description}</p>
                    {proj.link && <a href={proj.link} style={{ fontSize: "0.85rem", color: colorTheme.primary, fontWeight: "bold", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}><Link2 size={12} /> View Details</a>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {certifications.length > 0 && (
            <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: `2px solid ${colorTheme.sectionBorder}`, paddingBottom: "1rem" }}>
                <div style={{ backgroundColor: colorTheme.primaryLight, padding: "0.75rem", borderRadius: "8px", color: colorTheme.primary }}><Award size={24} /></div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: colorTheme.primary, margin: 0 }}>Certificates</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: "8px", height: "8px", backgroundColor: colorTheme.accent, borderRadius: "50%", marginTop: "0.4rem" }}></div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: colorTheme.secondary, margin: "0 0 0.25rem 0" }}>{cert.name}</h3>
                      <div style={{ fontSize: "0.9rem", color: "#666", margin: "0 0 0.25rem 0" }}>{cert.issuer}</div>
                      {cert.date && <div style={{ fontSize: "0.8rem", color: colorTheme.primary, fontWeight: 600 }}>{formatDate(cert.date)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
