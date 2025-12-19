"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Container, Stack, Typography, Button, Grid, Divider } from "@mui/material";
import { Filter } from "lucide-react";
import ProjectCard, { Project } from "@/components/sections/projects/ProjectCard";

const allProjects: Project[] = [
  {
    id: "freightfi",
    category: "Full-Stack",
    title: "FreightFi",
    description:
      "A SaaS platform for freight and logistics management with real-time tracking, invoicing, and carrier management.",
    problemSolved:
      "Logistics companies struggle with fragmented tools for tracking, invoicing, and carrier management, leading to inefficiencies and lost revenue.",
    technologies: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Stripe"],
    features: [
      "Real-time shipment tracking dashboard with live updates",
      "Automated invoicing and payment processing via Stripe",
      "Multi-tenant architecture with role-based access control",
    ],
    links: {
      github: "https://github.com",
      live: "https://freightfi.com",
    },
  },
  {
    id: "iepflow",
    category: "Full-Stack",
    title: "IEPFlow",
    description:
      "Streamlined IEP management system for educators and administrators in special education.",
    problemSolved:
      "Special education teachers spend hours on paperwork instead of teaching. IEPFlow automates document generation and progress tracking.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "MUI", "DocuSign API"],
    features: [
      "Automated IEP document generation with templates",
      "E-signature integration for parent approvals",
      "Progress tracking with visual reports",
    ],
    links: {
      github: "https://github.com",
    },
  },
  {
    id: "recruito",
    category: "Automation / Tools",
    title: "Recruito",
    description:
      "AI-powered recruitment automation tool that helps companies streamline their hiring pipeline.",
    problemSolved:
      "Recruiters are overwhelmed with applications. Recruito uses AI to parse resumes, score candidates, and automate scheduling.",
    technologies: ["TypeScript", "React", "Fastify", "PostgreSQL", "OpenAI", "Zod"],
    features: [
      "AI-powered resume parsing and candidate scoring",
      "Automated interview scheduling with calendar sync",
      "Candidate pipeline visualization",
    ],
    links: {
      github: "https://github.com",
      live: "https://recruito.io",
    },
  },
  {
    id: "valour",
    category: "Frontend",
    title: "Valour",
    description: "A modern portfolio and project management tool for creative professionals.",
    problemSolved:
      "Creative professionals need a simple way to showcase their work and collaborate with clients without complex setup.",
    technologies: ["Next.js", "tRPC", "Prisma", "Supabase", "Framer Motion"],
    features: [
      "Drag-and-drop portfolio builder",
      "Client collaboration features",
      "Analytics and engagement tracking",
    ],
    links: {
      github: "https://github.com",
      live: "https://valour.app",
    },
  },
  {
    id: "invoicemailer",
    category: "Automation / Tools",
    title: "InvoiceMailer",
    description:
      "Automated invoice generation and email delivery system for freelancers and small businesses.",
    problemSolved:
      "Freelancers waste time manually creating and sending invoices. InvoiceMailer automates the entire process.",
    technologies: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Nodemailer"],
    features: [
      "Template-based invoice generation",
      "Automated email delivery",
      "Payment tracking and reminders",
    ],
    links: {
      github: "https://github.com",
      live: "https://invoicemailer.com",
    },
  },
  {
    id: "jobscanner",
    category: "Automation / Tools",
    title: "Job Scanner",
    description:
      "AI-powered job board aggregator that scans multiple platforms and matches opportunities to your skills.",
    problemSolved:
      "Job seekers waste hours checking multiple job boards. Job Scanner aggregates and filters opportunities automatically.",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "OpenAI"],
    features: [
      "Multi-platform job aggregation",
      "AI-powered skill matching",
      "Automated application tracking",
    ],
    links: {
      github: "https://github.com",
      live: "https://jobscanner.io",
    },
  },
];

const categories = ["All", "Frontend", "Full-Stack", "Automation / Tools"] as const;
type Category = (typeof categories)[number];

const MotionBox = motion.create(Box);

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === selectedCategory);

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
          sx={{ mb: { xs: 5, sm: 6, md: 7 } }}
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
            Projects
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
            A collection of full-stack applications, automation tools, and frontend interfaces built
            with modern technologies.
          </Typography>
        </MotionBox>

        {/* Divider above filters */}
        <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

        {/* Filters */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ mb: { xs: 3, sm: 4 } }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
            <Filter size={20} style={{ color: "var(--mui-palette-text-secondary)" }} />
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "contained" : "outlined"}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  ...(selectedCategory === category
                    ? {
                        boxShadow: (theme) => `0 4px 14px ${theme.palette.primary.main}40`,
                        "&:hover": {
                          boxShadow: (theme) => `0 6px 20px ${theme.palette.primary.main}50`,
                        },
                      }
                    : {
                        borderColor: "divider",
                        color: "text.secondary",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: (theme) => `${theme.palette.primary.main}08`,
                        },
                      }),
                }}
              >
                {category}
              </Button>
            ))}
          </Stack>
        </MotionBox>

        {/* Divider below filters */}
        <Divider sx={{ mb: { xs: 5, sm: 6 } }} />

        {/* Projects Grid */}
        <Grid container spacing={{ xs: 3, sm: 3.5, md: 4 }}>
          {filteredProjects.map((project, index) => (
            <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
