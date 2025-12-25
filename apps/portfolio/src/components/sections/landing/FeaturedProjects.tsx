"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  links: {
<<<<<<< HEAD
    details: string;
=======
>>>>>>> master
    github?: string;
    live?: string;
  };
}

const projects: Project[] = [
  {
    title: "FreightFi",
    description:
<<<<<<< HEAD
      "A SaaS platform for freight and logistics management with real-time tracking, invoicing, and carrier management.",
    technologies: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Real-time shipment tracking dashboard",
      "Automated invoicing and payment processing",
      "Multi-tenant architecture with role-based access",
    ],
    links: {
      details: "/projects/freightfi",
      github: "https://github.com",
      live: "https://freightfi.com",
    },
  },
  {
    title: "IEPFlow",
    description:
      "Streamlined IEP (Individualized Education Program) management system for educators and administrators.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "MUI"],
    features: [
      "Document generation and e-signatures",
      "Progress tracking and reporting",
      "Parent portal with secure messaging",
    ],
    links: {
      details: "/projects/iepflow",
      github: "https://github.com",
    },
  },
  {
    title: "Recruito",
    description:
      "AI-powered recruitment automation tool that helps companies streamline their hiring pipeline.",
    technologies: ["TypeScript", "React", "Fastify", "PostgreSQL", "OpenAI"],
    features: [
      "Automated resume parsing and scoring",
      "Interview scheduling automation",
      "Candidate analytics dashboard",
    ],
    links: {
      details: "/projects/recruito",
      github: "https://github.com",
      live: "https://recruito.io",
    },
  },
  {
    title: "Valour",
    description: "A modern portfolio and project management tool for creative professionals.",
    technologies: ["Next.js", "tRPC", "Prisma", "Supabase", "Framer Motion"],
    features: [
      "Drag-and-drop portfolio builder",
      "Client collaboration features",
      "Analytics and engagement tracking",
    ],
    links: {
      details: "/projects/valour",
      github: "https://github.com",
=======
      "A SaaS platform that automates freight audit analysis by reconciling rate confirmations and invoices in seconds instead of manual reviews.",
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
    title: "PremierLeaf",
    description:
      "A premium e-commerce and mobile platform focused on wellness products and habit-driven self-care experiences for professionals.",
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
    title: "PolitiMap",
    description:
      "A civic engagement platform that visualizes political data using interactive maps and AI-powered insights across web and mobile.",
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
    title: "D.I.G.I.T.A.",
    description:
      "An AI-powered DevOps assistant that inspects GitHub repositories and delivers structured architecture and codebase summaries via Discord.",
    technologies: ["TypeScript", "Discord.js", "GitHub API", "OpenAI"],
    features: [
      "AI-driven repository inspection",
      "Structured codebase summaries",
      "Automated chunking for large repos",
    ],
    links: {
      github: "https://github.com/troyrhodes02/digita",
>>>>>>> master
    },
  },
];

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <MotionCard
      variants={itemVariants}
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.light",
          boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}14`,
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}>
        <Stack spacing={2.5} sx={{ height: "100%" }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              color: "text.primary",
            }}
          >
            {project.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              fontSize: { xs: "0.875rem", sm: "0.9rem" },
            }}
          >
            {project.description}
          </Typography>

          {/* Technologies */}
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  height: 26,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  borderColor: "divider",
                  color: "text.secondary",
                  bgcolor: "transparent",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            ))}
          </Stack>

          {/* Features */}
          <Stack spacing={1} sx={{ flex: 1 }}>
            {project.features.map((feature, index) => (
<<<<<<< HEAD
              <Stack key={index} direction="row" spacing={1.5} alignItems="center">
=======
              <Stack key={index} direction="row" spacing={1.5} alignItems="baseline">
>>>>>>> master
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "secondary.main",
                    flexShrink: 0,
<<<<<<< HEAD
=======
                    position: "relative",
                    top: "-0.15em",
>>>>>>> master
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.8rem", sm: "0.85rem" },
                    lineHeight: 1.5,
                  }}
                >
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>

          {/* Action Buttons */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ pt: 1 }}
            flexWrap="wrap"
            useFlexGap
          >
<<<<<<< HEAD
            <Button
              component={Link}
              href={project.links.details}
              variant="outlined"
              size="small"
              endIcon={<ArrowRight size={14} />}
              sx={{
                borderRadius: 1.5,
                px: 2,
                py: 0.75,
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  bgcolor: (theme) => `${theme.palette.primary.main}08`,
                },
              }}
            >
              View Details
            </Button>

=======
>>>>>>> master
            {project.links.github && (
              <Button
                component="a"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
<<<<<<< HEAD
                size="small"
                startIcon={<Github size={14} />}
                sx={{
                  color: "text.secondary",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  textTransform: "none",
                  px: 1,
                  minWidth: "auto",
                  "&:hover": {
                    bgcolor: "action.hover",
                    color: "text.primary",
=======
                variant="outlined"
                size="small"
                startIcon={<Github size={16} />}
                sx={{
                  borderRadius: 1.5,
                  px: 2.5,
                  py: 1,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "primary.dark",
                    bgcolor: (theme) => `${theme.palette.primary.main}08`,
>>>>>>> master
                  },
                }}
              >
                GitHub
              </Button>
            )}

            {project.links.live && (
              <Button
                component="a"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
<<<<<<< HEAD
                size="small"
                startIcon={<ExternalLink size={14} />}
                sx={{
                  color: "text.secondary",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  textTransform: "none",
                  px: 1,
                  minWidth: "auto",
                  "&:hover": {
                    bgcolor: "action.hover",
                    color: "text.primary",
                  },
                }}
              >
                Live
=======
                variant="contained"
                size="small"
                endIcon={<ExternalLink size={16} />}
                sx={{
                  borderRadius: 1.5,
                  px: 2.5,
                  py: 1,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: (theme) => `0 4px 14px ${theme.palette.primary.main}40`,
                  "&:hover": {
                    boxShadow: (theme) => `0 6px 20px ${theme.palette.primary.main}50`,
                  },
                }}
              >
                Live Demo
>>>>>>> master
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </MotionCard>
  );
}

export default function FeaturedProjects() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: (theme) =>
            `radial-gradient(ellipse at bottom left, ${theme.palette.primary.main}08, transparent 50%),` +
            `radial-gradient(ellipse at top right, ${theme.palette.secondary.main}08, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: "center", mb: { xs: 5, sm: 6, md: 8 } }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              mb: 2,
              color: "text.primary",
            }}
          >
            Featured Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              lineHeight: 1.6,
            }}
          >
            A selection of recent work showcasing full-stack development and modern SaaS
            architecture
          </Typography>
        </MotionBox>

        {/* Projects Grid */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }}>
            {projects.map((project) => (
              <Grid key={project.title} size={{ xs: 12, sm: 6 }}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </MotionBox>

        {/* View All Projects Button */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 5, sm: 6, md: 8 },
          }}
        >
          <Button
            component={Link}
            href="/projects"
            variant="contained"
            size="large"
            endIcon={<ArrowRight size={18} />}
            sx={{
              borderRadius: 2,
              px: { xs: 3, sm: 4 },
              py: 1.5,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontWeight: 600,
              textTransform: "none",
              boxShadow: (theme) => `0 4px 14px ${theme.palette.primary.main}40`,
              "&:hover": {
                boxShadow: (theme) => `0 6px 20px ${theme.palette.primary.main}50`,
              },
            }}
          >
            View All Projects
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
}
