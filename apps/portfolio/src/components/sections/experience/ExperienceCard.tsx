"use client";

import { Box, Card, CardContent, Stack, Typography, Chip, Grid, Divider } from "@mui/material";
import { Building2, Calendar, MapPin } from "lucide-react";

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  contributions: string[];
  technologies: string[];
}

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.light",
          boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}14`,
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={3}>
          {/* Header Row - Company/Title on left, Dates/Location on right */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-start" }}
            spacing={{ xs: 2, md: 0 }}
          >
            {/* Left side - Company and Title */}
            <Stack spacing={0.75}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                    flexShrink: 0,
                  }}
                >
                  <Building2 size={20} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontSize: { xs: "0.9rem", sm: "0.95rem" },
                    fontWeight: 500,
                  }}
                >
                  {experience.company}
                </Typography>
              </Stack>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  color: "text.primary",
                }}
              >
                {experience.title}
              </Typography>
            </Stack>

            {/* Right side - Dates and Location */}
            <Stack
              spacing={1}
              sx={{
                alignItems: { xs: "flex-start", md: "flex-end" },
                flexShrink: 0,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Calendar size={16} style={{ opacity: 0.7 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    fontWeight: 500,
                  }}
                >
                  {experience.startDate} – {experience.endDate}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <MapPin size={16} style={{ opacity: 0.7 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    fontWeight: 500,
                  }}
                >
                  {experience.location}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Divider */}
          <Divider sx={{ borderColor: "divider" }} />

          {/* Description - Full Width */}
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.7,
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            {experience.description}
          </Typography>

          {/* Key Contributions - Full Width */}
          <Box>
            <Typography
              variant="overline"
              sx={{
                display: "block",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "text.secondary",
                fontSize: "0.7rem",
                mb: 2,
                textTransform: "uppercase",
              }}
            >
              Key Contributions
            </Typography>
            <Grid container spacing={2}>
              {experience.contributions.map((contribution, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <Stack direction="row" spacing={1.5} alignItems="baseline">
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        flexShrink: 0,
                        position: "relative",
                        top: -2,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.9rem", sm: "0.95rem" },
                        lineHeight: 1.6,
                      }}
                    >
                      {contribution}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Technologies Used - Full Width */}
          <Box>
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
              Technologies Used
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {experience.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 1.5,
                    height: 28,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    borderColor: "divider",
                    color: "text.secondary",
                    bgcolor: "transparent",
                    "& .MuiChip-label": {
                      px: 1.5,
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
