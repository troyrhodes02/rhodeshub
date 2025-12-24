"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  Link as MuiLink,
} from "@mui/material";
import { Code2, Server, Database, Wrench, Zap, ExternalLink } from "lucide-react";
import { ElementType } from "react";
import { getRelativeTime } from "@/utils/relativeTime";

interface SkillCategory {
  title: string;
  icon: ElementType;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "MUI",
      "HTML",
      "CSS",
      "Jest",
      "Responsive Design",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "GraphQL",
      "REST APIs",
      "tRPC",
      "Prisma",
      "Authentication",
      "RBAC",
      "Stripe/Square",
      "Jest",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Supabase", "Firebase", "SQL"],
  },
  {
    title: "DevOps / Cloud",
    icon: Wrench,
    skills: ["Docker", "Google Cloud Platform", "CI/CD", "Git", "GitHub", "Agile Development"],
  },
];

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

function SkillBadge({ skill }: { skill: string }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        px: 1.5,
        py: 0.5,
        borderRadius: 999,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: (theme) => `${theme.palette.action.hover}`,
        fontSize: "0.75rem",
        fontWeight: 500,
        color: "text.secondary",
        transition: "all 0.2s ease",
        cursor: "default",
        "&:hover": {
          borderColor: (theme) => `${theme.palette.primary.main}40`,
          bgcolor: (theme) => `${theme.palette.primary.main}08`,
          color: "primary.main",
        },
      }}
    >
      {skill}
    </Box>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = category.icon;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: (theme) => `${theme.palette.primary.main}40`,
          boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}15`,
        },
        "&:hover .skill-icon-container": {
          bgcolor: "primary.main",
          color: "primary.contrastText",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={2.5}>
          {/* Icon and Title */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              className="skill-icon-container"
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: (theme) => `${theme.palette.primary.main}14`,
                color: "primary.main",
                transition: "all 0.3s ease",
              }}
            >
              <Icon size={20} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              {category.title}
            </Typography>
          </Stack>

          {/* Skills */}
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ rowGap: 0.75 }}>
            {category.skills.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </MotionCard>
  );
}

function NowBuildingCard() {
  const [repoData, setRepoData] = useState<{
    description: string;
    html_url: string;
    pushed_at: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback hardcoded text
  const fallbackDescription =
    "A TypeScript-powered job intelligence tool that surfaces new React/Node roles and helps prioritize applications with smart filtering and automated tracking.";

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch("/api/github/now-building");
        if (response.ok) {
          const data = await response.json();
          if (data.description && data.html_url && data.pushed_at) {
            setRepoData({
              description: data.description,
              html_url: data.html_url,
              pushed_at: data.pushed_at,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch GitHub repo data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepoData();
  }, []);

  const description = repoData?.description || fallbackDescription;
  const relativeTime = repoData?.pushed_at ? getRelativeTime(repoData.pushed_at) : null;
  const repoUrl = repoData?.html_url;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.highlight.main}08 100%)`
              : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.highlight.main}12 100%)`,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack direction="row" spacing={2.5} alignItems="center">
            {/* Icon with layered animations */}
            <Box
              sx={{
                position: "relative",
                width: 48,
                height: 48,
                flexShrink: 0,
              }}
            >
              {/* Outer ping layer - expands outward and fades */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  bgcolor: (theme) => `${theme.palette.highlight.main}18`,
                  animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                  "@keyframes ping": {
                    "75%, 100%": {
                      transform: "scale(1.5)",
                      opacity: 0,
                    },
                  },
                }}
              />
              {/* Middle pulse layer - breathing effect */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  bgcolor: (theme) => `${theme.palette.highlight.main}12`,
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  "@keyframes pulse": {
                    "0%, 100%": {
                      opacity: 1,
                    },
                    "50%": {
                      opacity: 0.5,
                    },
                  },
                }}
              />
              {/* Static icon container */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: (theme) => `${theme.palette.highlight.main}10`,
                  color: "highlight.main",
                }}
              >
                <Zap size={24} />
              </Box>
            </Box>

            {/* Content */}
            <Stack spacing={1} sx={{ flex: 1 }}>
              {/* Label */}
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "secondary.main",
                    fontSize: "0.7rem",
                  }}
                >
                  NOW BUILDING
                </Typography>
                {/* Status dot with ping effect */}
                <Box sx={{ position: "relative", width: 8, height: 8 }}>
                  {/* Ping layer */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      bgcolor: "success.main",
                      animation: "dotPing 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                      "@keyframes dotPing": {
                        "75%, 100%": {
                          transform: "scale(2)",
                          opacity: 0,
                        },
                      },
                    }}
                  />
                  {/* Static dot */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      bgcolor: "success.main",
                    }}
                  />
                </Box>
              </Stack>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  lineHeight: 1.6,
                  fontSize: { xs: "0.875rem", sm: "0.95rem" },
                }}
              >
                {description}
              </Typography>

              {/* Updated time and link */}
              {!isLoading && (
                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                  {relativeTime && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.75rem",
                      }}
                    >
                      {relativeTime}
                    </Typography>
                  )}
                  {repoUrl && (
                    <MuiLink
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "primary.main",
                        fontSize: "0.75rem",
                        textDecoration: "none",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      View on GitHub
                      <ExternalLink size={12} />
                    </MuiLink>
                  )}
                </Stack>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </MotionBox>
  );
}

export default function SkillsAndTechnologies() {
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
      {/* Subtle background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: (theme) =>
            `radial-gradient(ellipse at top center, ${theme.palette.primary.main}06, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            Skills & Technologies
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 550,
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              lineHeight: 1.6,
            }}
          >
            A comprehensive toolkit for building modern web applications
          </Typography>
        </MotionBox>

        {/* Skills Grid */}
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
          {skillCategories.map((category, index) => (
            <Grid key={category.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <SkillCard category={category} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* Now Building Card */}
        <NowBuildingCard />
      </Container>
    </Box>
  );
}
