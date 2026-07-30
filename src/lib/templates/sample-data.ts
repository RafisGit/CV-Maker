// Realistic sample resume data for template previews

import { CVData } from "@/types/cv";

export const sampleResumeData: CVData = {
  personalInfo: {
    fullName: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+1 (415) 555-0142",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarahmitchell",
    website: "sarahmitchell.dev",
    summary:
      "Senior Software Engineer with 6+ years of experience building scalable web applications and leading cross-functional teams. Passionate about clean architecture, performance optimization, and mentoring junior developers. Proven track record of delivering high-impact projects that drive business growth and improve user engagement by up to 40%.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2016-09",
      endDate: "2018-06",
      description: "Specialized in Distributed Systems and Machine Learning. GPA: 3.9/4.0",
    },
    {
      id: "edu-2",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012-09",
      endDate: "2016-05",
      description: "Dean's List, ACM Programming Competition finalist",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Google",
      position: "Senior Software Engineer",
      location: "Mountain View, CA",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description:
        "• Led a team of 8 engineers to redesign the core search infrastructure, improving query latency by 35%\n• Architected a microservices-based platform serving 50M+ daily active users\n• Mentored 4 junior engineers through Google's engineering ladder program\n• Implemented automated CI/CD pipelines reducing deployment time by 60%",
    },
    {
      id: "exp-2",
      company: "Stripe",
      position: "Software Engineer",
      location: "San Francisco, CA",
      startDate: "2018-07",
      endDate: "2021-02",
      current: false,
      description:
        "• Built real-time payment processing features handling $2B+ in annual transactions\n• Developed React-based dashboard used by 100K+ merchants globally\n• Optimized database queries resulting in 45% improvement in API response times\n• Collaborated with product and design teams on 3 major feature launches",
    },
  ],
  skills: [
    { id: "sk-1", name: "TypeScript", level: "Expert" },
    { id: "sk-2", name: "React", level: "Expert" },
    { id: "sk-3", name: "Node.js", level: "Advanced" },
    { id: "sk-4", name: "Python", level: "Advanced" },
    { id: "sk-5", name: "PostgreSQL", level: "Advanced" },
    { id: "sk-6", name: "AWS", level: "Advanced" },
    { id: "sk-7", name: "Docker", level: "Intermediate" },
    { id: "sk-8", name: "GraphQL", level: "Intermediate" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "OpenSource Analytics",
      description:
        "Built an open-source web analytics platform with real-time dashboards, privacy-first tracking, and 50K+ GitHub stars.",
      technologies: "Next.js, ClickHouse, Redis, Kafka",
      link: "github.com/sarahm/os-analytics",
    },
    {
      id: "proj-2",
      name: "DevFlow CLI",
      description:
        "Created a developer workflow automation tool that streamlines git operations, code reviews, and deployment workflows.",
      technologies: "Rust, GitHub API, Shell scripting",
      link: "github.com/sarahm/devflow",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Solutions Architect Professional",
      issuer: "Amazon Web Services",
      date: "2023-05",
      link: "",
    },
    {
      id: "cert-2",
      name: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      date: "2022-11",
      link: "",
    },
  ],
};
