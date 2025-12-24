"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Container, Stack, Typography, Button, Grid, Divider } from "@mui/material";
import { Filter } from "lucide-react";
import ProjectCard, { Project } from "@/components/sections/projects/ProjectCard";

const allProjects: Project[] = [
  {
    id: "rhodeshub",
    tags: ["Full-Stack", "AI"],
    title: "RhodesHub",
    description:
      "An AI-powered portfolio and resume intelligence platform that combines a public-facing demo with a private job-search command center, designed to showcase real AI system architecture.",
    problemSolved:
      "Job search tools often rely on opaque AI scoring and unsafe demos. RhodesHub demonstrates explainable, permission-aware AI without exposing private data or internal logic.",
    technologies: ["TypeScript", "React", "Node.js", "Material UI", "PostgreSQL", "OpenAI"],
    features: [
      "Deterministic resume-to-job analysis with explainable outputs",
      "Strict public vs admin permission boundaries",
      "Shared AI engine with mode-based behavior",
    ],
    links: {
      github: "https://github.com/troyrhodes02/rhodeshub",
      live: "https://rhodeshub.dev",
    },
  },
  {
    id: "freightfi",
    tags: ["Full-Stack", "SaaS"],
    title: "FreightFi",
    description:
      "A SaaS platform that automates freight audit analysis by reconciling rate confirmations and invoices in seconds instead of manual reviews.",
    problemSolved:
      "Freight audits are slow, error-prone, and spreadsheet-driven. FreightFi reduces manual audit time from 30+ minutes to under 30 seconds.",
    technologies: ["TypeScript", "Next.js", "Node.js", "Prisma", "Supabase", "Stripe"],
    features: [
      "Automated document-based audit analysis",
      "Line-item discrepancy detection",
      "Multi-tenant SaaS architecture",
    ],
    links: {
      live: "https://freightfi.app",
    },
  },
  {
    id: "premierleaf",
    tags: ["Full-Stack", "Mobile", "E-commerce"],
    title: "PremierLeaf",
    description:
      "A premium e-commerce and mobile platform focused on wellness products and habit-driven self-care experiences for professionals.",
    problemSolved:
      "Wellness platforms often lack personalization and cohesive branding. PremierLeaf combines commerce, mobile UX, and lifestyle tooling into one system.",
    technologies: ["TypeScript", "React", "Next.js", "React Native", "Stripe", "GraphQL"],
    features: [
      "Full-stack e-commerce with payments",
      "Cross-platform mobile application",
      "Brand-driven, conversion-focused UI",
    ],
    links: {
      live: "https://www.premierleaf.com",
    },
  },
  {
    id: "politimap",
    tags: ["Full-Stack", "Mobile", "Data Visualization"],
    title: "PolitiMap",
    description:
      "A civic engagement platform that visualizes political data using interactive maps and AI-powered insights across web and mobile.",
    problemSolved:
      "Political data is difficult to explore and inaccessible to non-technical users. PolitiMap makes civic information interactive and understandable.",
    technologies: ["React", "React Native", "TypeScript", "GraphQL", "Mapbox", "Firebase"],
    features: [
      "Interactive map-based political data",
      "Cross-platform web and mobile experience",
      "GraphQL-powered data layer",
    ],
    links: {
      live: "https://www.politimap.us",
    },
  },
  {
    id: "digita",
    tags: ["Automation", "AI"],
    title: "D.I.G.I.T.A.",
    description:
      "An AI-powered DevOps assistant that inspects GitHub repositories and delivers structured architecture and codebase summaries via Discord.",
    problemSolved:
      "Understanding unfamiliar codebases is time-consuming. D.I.G.I.T.A. provides fast, structured insights for developers.",
    technologies: ["TypeScript", "Discord.js", "GitHub API", "OpenAI"],
    features: [
      "AI-driven repository inspection",
      "Structured codebase summaries",
      "Automated chunking for large repos",
    ],
    links: {
      github: "https://github.com/troyrhodes02/digita",
    },
  },
  {
    id: "invoicemailer",
    tags: ["Automation", "Tools"],
    title: "InvoiceMailer",
    description:
      "A cross-platform CLI tool that automates invoice distribution for enterprise IT teams using secure, app-only email workflows.",
    problemSolved:
      "Manual invoice handling is repetitive and error-prone. InvoiceMailer automates delivery while preserving auditability.",
    technologies: [".NET 8", "C#", "Microsoft Graph API", "ClosedXML", "Azure"],
    features: [
      "Automated invoice processing",
      "Secure OAuth2 email sending",
      "Structured logging and error handling",
    ],
    links: {
      github: "https://github.com/troyrhodes02/InvoiceMailer",
    },
  },
  {
    id: "kelcstyles",
    tags: ["Frontend", "E-commerce"],
    title: "Kel.C Styles",
    description:
      "A booking and e-commerce platform for a hair stylist, featuring custom scheduling and automated notifications.",
    problemSolved:
      "Manual appointment booking doesn't scale. This platform automates scheduling and client communication.",
    technologies: ["Next.js", "React", "TypeScript", "Material UI", "Airtable"],
    features: [
      "Custom appointment scheduling",
      "Responsive, accessible UI",
      "Automated email notifications",
    ],
    links: {
      live: "https://kelc-swag-site.vercel.app",
    },
  },
];

const MotionBox = motion.create(Box);

export default function ProjectsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Derive available tags from projects (only tags that exist in at least one project)
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    allProjects.forEach((project) => {
      project.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
  };

  // Filter projects based on selected tags (project must have at least one of the selected tags)
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return allProjects;
    return allProjects.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)));
  }, [selectedTags]);

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
            <Button
              onClick={clearFilters}
              variant={selectedTags.length === 0 ? "contained" : "outlined"}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                fontSize: "0.9rem",
                fontWeight: 600,
                textTransform: "none",
                ...(selectedTags.length === 0
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
              All
            </Button>
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <Button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  variant={isSelected ? "contained" : "outlined"}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textTransform: "none",
                    ...(isSelected
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
                  {tag}
                </Button>
              );
            })}
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
