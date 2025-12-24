"use client";

import { Box, Card, CardContent, Chip, Button, Stack, Typography } from "@mui/material";
import { Github, ExternalLink } from "lucide-react";

export interface Project {
  id: string;
  tags: string[];
  title: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  features: string[];
  links: {
    github?: string;
    live?: string;
  };
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
      <CardContent
        sx={{ p: { xs: 3, sm: 3.5 }, flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Stack spacing={3} sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Category Tags */}
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  height: 26,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  bgcolor: (theme) => `${theme.palette.primary.main}14`,
                  color: "primary.main",
                  borderRadius: 1,
                }}
              />
            ))}
          </Stack>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.15rem", sm: "1.3rem" },
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
              fontSize: { xs: "0.9rem", sm: "0.95rem" },
            }}
          >
            {project.description}
          </Typography>

          {/* Problem Solved Section */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              bgcolor: (theme) => `${theme.palette.action.hover}`,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                display: "block",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "text.secondary",
                fontSize: "0.7rem",
                mb: 1.5,
                textTransform: "uppercase",
              }}
            >
              Problem Solved
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
              }}
            >
              {project.problemSolved}
            </Typography>
          </Box>

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
                  height: 28,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  borderColor: "divider",
                  color: "text.secondary",
                  bgcolor: "transparent",
                  "& .MuiChip-label": {
                    px: 1.25,
                  },
                }}
              />
            ))}
          </Stack>

          {/* Features - Fixed height section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: { xs: 120, sm: 140 },
              minHeight: { xs: 120, sm: 140 },
            }}
          >
            <Stack spacing={1.25}>
              {project.features.map((feature, index) => (
                <Stack key={index} direction="row" spacing={1.5} alignItems="baseline">
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "secondary.main",
                      flexShrink: 0,
                      position: "relative",
                      top: "-0.15em",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.85rem", sm: "0.9rem" },
                      lineHeight: 1.5,
                    }}
                  >
                    {feature}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={1.5} sx={{ pt: 1.5 }}>
            {project.links.github && (
              <Button
                component="a"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
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
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
