"use client";

import { motion } from "framer-motion";
import { Box, Container, Stack, Typography, Divider } from "@mui/material";
import ExperienceCard, { Experience } from "./ExperienceCard";

const experiences: Experience[] = [
  {
    id: "freightfi",
    company: "FreightFi",
    title: "Software Engineer",
    location: "Remote",
    startDate: "October 2025",
    endDate: "Present",
    description:
      "FreightFi is a freight finance and audit automation platform designed to help carriers, brokers, and logistics teams detect payment discrepancies, validate shipping documents, and automate vendor payout calculations in real time. The system ingests rate confirmations, invoices, and Bills of Lading (BOLs), compares expected versus actual charges, flags variances, and provides an auditable breakdown of how every dollar was calculated — reducing manual reconciliation, short-pay risk, and operational delays.",
    contributions: [
      "Built a production-grade freight finance audit platform that reconciles rate confirmations, invoices, and Bills of Lading to detect payment discrepancies and reduce manual reconciliation",
      "Designed deterministic payout calculation logic with auditable, line-item breakdowns for mileage rates, fuel surcharges, and accessorial charges",
      "Implemented a rules-driven variance engine that preserves original document data while allowing safe recalculation from corrected inputs",
      "Developed a responsive React + TypeScript application using Material UI and deployed via Vercel with preview and production workflows",
    ],
    technologies: ["React", "TypeScript", "Material UI", "Vercel", "Node.js", "PostgreSQL"],
  },
  {
    id: "arkatech",
    company: "ArkaTech",
    title: "Software Engineer",
    location: "Remote",
    startDate: "January 2024",
    endDate: "July 2025",
    description:
      "Developed modular, component-driven React/TypeScript interfaces with GraphQL/Apollo, achieving approximately 90% Jest test coverage and improving UI consistency across multiple products. Collaborated on multi-tenant SaaS architecture, translating backend APIs into scalable, reusable UI components with clear state management and design patterns.",
    contributions: [
      "Architected and developed full-stack applications using React, TypeScript, GraphQL/Apollo, and React Native/Expo, integrating REST/GraphQL APIs and delivering cross-platform features for iOS, Android, and web",
      "Built multi-tenant SaaS infrastructure using Supabase, Prisma, and PostgreSQL, implementing RBAC models, secure data workflows, and scalable service boundaries",
      "Led a 4-engineer team through a 9-month development cycle, delivering production-ready applications to 100+ users across web and mobile, while improving deployment velocity through CI/CD pipelines",
      "Deployed containerized services on Google Cloud Run with Firebase/MongoDB integrations, supporting both mobile and web client apps and launching MVPs on 3-month cycles",
    ],
    technologies: [
      "React",
      "TypeScript",
      "GraphQL",
      "Apollo",
      "React Native",
      "Expo",
      "Supabase",
      "Prisma",
      "PostgreSQL",
      "Google Cloud Run",
      "Firebase",
      "MongoDB",
      "Jest",
    ],
  },
  {
    id: "pvamu",
    company: "Center for Information Technology Excellence",
    title: "IT Software Applications Developer I",
    location: "Prairie View, TX",
    startDate: "November 2023",
    endDate: "Present",
    description:
      "Developing and maintaining enterprise applications in a higher education environment, focusing on workflow automation, system integrations, and internal tooling. Managed enterprise-level user provisioning and access control across multiple platforms while ensuring FERPA compliance.",
    contributions: [
      "Designed and implemented automated workflow systems using DocuSign, reducing manual processing time by 60%",
      "Built custom form logic and approval workflows for Banner ERP integration",
      "Developed Laserfiche document management solutions for campus-wide records",
      "Created internal tools for IT access requests and account provisioning",
      "Developed automated workflow systems with dynamic form routing logic and SharePoint-based document management, implementing real-time tracking and version control for enterprise operations serving 10,000+ users",
      "Managed enterprise-level user provisioning and access control across multiple platforms (Pathify, DocuSign, DynamicForms) while ensuring FERPA compliance and collaborating with department heads to integrate custom UI components",
    ],
    technologies: ["DocuSign", "SharePoint", "Banner ERP", "Laserfiche", "Pathify", "DynamicForms"],
  },
];

const MotionBox = motion.create(Box);

export default function ExperienceSection() {
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
