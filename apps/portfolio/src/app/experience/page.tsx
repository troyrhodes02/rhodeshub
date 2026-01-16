"use client";

import { motion } from "framer-motion";
import { Box, Container, Stack, Typography, Divider } from "@mui/material";
import ExperienceCard, { Experience } from "@/components/sections/experience/ExperienceCard";

const experiences: Experience[] = [
  {
    id: "freightfi",
    company: "FreightFi",
    title: "Independent Contributor",
    location: "Remote",
    startDate: "October 2025",
    endDate: "Present",
    description:
      "FreightFi is a freight finance and audit automation platform designed to help carriers, brokers, and logistics teams detect payment discrepancies, validate shipping documents, and automate vendor payout calculations in real time. The system ingests rate confirmations, invoices, and Bills of Lading (BOLs), compares expected versus actual charges, flags variances, and provides an auditable breakdown of how every dollar was calculated — reducing manual reconciliation, short-pay risk, and operational delays.",
    contributions: [
      "Built a production-grade freight finance audit platform that reconciles rate confirmations, invoices, and Bills of Lading to detect payment discrepancies and reduce manual reconciliation",
      "Designed deterministic payout calculation logic with auditable, line-item breakdowns for mileage rates, fuel surcharges, and accessorial charges",
      "Implemented a rules-driven variance engine that preserves original document data while allowing safe recalculation from corrected inputs",
      "Collaborated in weekly planning cycles to translate customer requirements into scoped engineering tasks and deliver iterative product improvements using React, TypeScript, Material UI, and Vercel",
    ],
    technologies: ["React", "TypeScript", "Material UI", "Vercel", "Node.js", "PostgreSQL"],
  },
  {
    id: "arkatech",
    company: "ArkaTech",
    title: "Software Engineer",
    location: "Remote",
    startDate: "January 2024",
    endDate: "August 2025",
    description:
      "ArkaTech is a startup-focused software consultancy where I worked across multiple client-facing products, building full-stack and mobile applications used in production environments. My work spanned SaaS platforms, data-driven applications, and cross-platform mobile experiences, with an emphasis on scalable architecture, clean UI systems, and delivery velocity within agile teams.",
    contributions: [
      "Architected and developed full-stack applications using React, TypeScript, GraphQL/Apollo, and React Native, delivering production features across web and mobile platforms",
      "Led a 4-engineer team through sprint planning, task delegation, and delivery over a 9-month development cycle, supporting products serving 100+ users",
      "Deployed containerized backend services to Google Cloud Run with Firebase and MongoDB integrations, enabling secure, scalable APIs and faster MVP launches",
    ],
    technologies: [
      "React",
      "TypeScript",
      "GraphQL",
      "React Native",
      "Node.js",
      "Google Cloud",
      "Firebase",
      "MongoDB",
      "Docker",
    ],
  },
  {
    id: "pvamu",
    company: "Prairie View A&M University",
    title: "Enterprise Applications Systems Analyst",
    location: "On-site",
    startDate: "November 2023",
    endDate: "Present",
    description:
      "As part of the Enterprise Applications team at Prairie View A&M University, I build and maintain internal systems that support academic and administrative operations for a large university user base. My role focuses on workflow automation, system integrations, and secure access management across enterprise platforms while ensuring compliance with institutional and regulatory standards.",
    contributions: [
      "Serve as the primary operational owner for multiple enterprise applications and workflow platforms, exercising production authority over system configuration, changes, reliability, and ongoing improvement",
      "Diagnose, prioritize, and resolve complex user issues across integrated systems, translating unclear, non-technical requests into documented technical solutions spanning identity, access, and platform workflows",
      "Design, build, and manage advanced digital forms and workflows end-to-end, including conditional routing, role-based logic, escalations, notifications, and cross-system integrations aligned to institutional needs",
      "Lead configuration, testing, launch readiness, and ongoing maintenance of a centralized campus portal, while enabling internal teams through structured SOPs, documentation, and knowledge sharing",
    ],
    technologies: [
      "SharePoint",
      "DocuSign",
      "Laserfiche",
      "Dynamic Forms",
      "Pathify",
      "Workflow Automation",
    ],
  },
];

const MotionBox = motion.create(Box);

export default function ExperiencePage() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: { xs: 4, sm: 5, md: 6 } }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.875rem", sm: "2.125rem", md: "2.625rem" },
              mb: 2.5,
              color: "text.primary",
            }}
          >
            Experience
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
              lineHeight: 1.6,
              maxWidth: 750,
            }}
          >
            Professional experience in higher education enterprise applications and internal
            tooling, focusing on workflow automation, integrations, and system development.
          </Typography>
        </MotionBox>

        <Divider sx={{ mb: { xs: 4, sm: 5, md: 6 } }} />

        {/* Experience Cards */}
        <Stack spacing={{ xs: 3, sm: 4 }}>
          {experiences.map((experience, index) => (
            <MotionBox
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ExperienceCard experience={experience} />
            </MotionBox>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
