"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Box, Container, Stack, Typography, Card, CardContent } from "@mui/material";
import { GraduationCap, Code, Building2, Rocket, Wrench } from "lucide-react";
import { ElementType } from "react";

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: ElementType;
}

const milestones: Milestone[] = [
  {
    id: "mech-eng",
    year: "2021",
    title: "Started Mechanical Engineering Degree",
    description:
      "Began my college journey in Mechanical Engineering in August 2021, exploring engineering fundamentals and problem-solving approaches.",
    icon: Wrench,
  },
  {
    id: "cs-major",
    year: "2022",
    title: "Changed Major to Computer Science",
    description:
      "Switched to Computer Science in January 2022, discovering my passion for software development and diving into programming fundamentals.",
    icon: Code,
  },
  {
    id: "it-job",
    year: "2023",
    title: "First Tech Job - IT Department",
    description:
      "Landed my first tech position as a student worker in an IT Department in November 2023, gaining hands-on experience with real-world systems and support.",
    icon: Building2,
  },
  {
    id: "internship",
    year: "2024",
    title: "Software Engineering Internship",
    description:
      "Started my first Software Engineering Internship in January 2024, working on production applications and learning industry best practices.",
    icon: Rocket,
  },
  {
    id: "graduated",
    year: "2025",
    title: "Graduated College",
    description:
      "Completed my Computer Science degree in August 2025, ready to take on full-time software engineering roles and continue building impactful applications.",
    icon: GraduationCap,
  },
];

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

function MilestoneCard({
  milestone,
  index,
  isActive,
  onToggle,
}: {
  milestone: Milestone;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const Icon = milestone.icon;
  const isEven = index % 2 === 0;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", lg: isEven ? "row" : "row-reverse" },
        pl: { xs: 5, lg: 0 },
        mb: { xs: 3, sm: 4, lg: 6 },
        ...(isEven
          ? {
              lg: {
                pr: 12,
              },
            }
          : {
              lg: {
                pl: 12,
              },
            }),
      }}
    >
      {/* Content Card */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "left", lg: isEven ? "right" : "left" },
        }}
      >
        <Card
          elevation={0}
          onClick={onToggle}
          sx={{
            borderRadius: { xs: 2, sm: 3 },
            border: "1px solid",
            borderColor: isActive ? "primary.light" : "divider",
            bgcolor: "background.paper",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: isActive ? (theme) => `0 0 20px ${theme.palette.primary.main}15` : "none",
            "&:hover": {
              borderColor: "primary.light",
              boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}15`,
            },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack
              direction={isEven ? { xs: "row", lg: "row-reverse" } : "row"}
              spacing={1.5}
              alignItems="center"
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isActive ? "primary.main" : (theme) => `${theme.palette.primary.main}14`,
                  color: isActive ? "primary.contrastText" : "primary.main",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </Box>

              {/* Year and Title */}
              <Stack spacing={0.5} sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "primary.main",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                  }}
                >
                  {milestone.year}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    color: "text.primary",
                  }}
                >
                  {milestone.title}
                </Typography>
              </Stack>
            </Stack>

            {/* Expandable Description */}
            <motion.div
              initial={false}
              animate={{
                height: isActive ? "auto" : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "text.secondary",
                  lineHeight: 1.6,
                  fontSize: { xs: "0.875rem", sm: "0.9rem" },
                  textAlign: { xs: "left", lg: isEven ? "right" : "left" },
                }}
              >
                {milestone.description}
              </Typography>
            </motion.div>
          </CardContent>
        </Card>
      </Box>

      {/* Center Dot */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: 16, lg: "50%" },
          top: "50%",
          transform: { xs: "translate(-50%, -50%)", lg: "translate(-50%, -50%)" },
          width: { xs: 12, lg: 16 },
          height: { xs: 12, lg: 16 },
          borderRadius: "50%",
          border: { xs: "2px solid", lg: "4px solid" },
          borderColor: "background.default",
          bgcolor: isActive ? "highlight.main" : "primary.main",
          zIndex: 2,
          transition: "all 0.3s ease",
          boxShadow: isActive ? (theme) => `0 0 12px ${theme.palette.highlight.main}40` : "none",
        }}
      />

      {/* Empty space for alternating layout on desktop */}
      <Box sx={{ display: { xs: "none", lg: "block" }, flex: 1 }} />
    </MotionBox>
  );
}

export default function EngineeringJourney() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        bgcolor: (theme) => `${theme.palette.action.hover}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
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
            Engineering Journey
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              lineHeight: 1.6,
            }}
          >
            Key milestones that shaped my path as a software engineer
          </Typography>
        </MotionBox>

        {/* Timeline Container */}
        <Box sx={{ position: "relative" }}>
          {/* Vertical Timeline Line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 16, lg: "50%" },
              top: 0,
              bottom: 0,
              width: "1px",
              background: (theme) =>
                `linear-gradient(to bottom, ${theme.palette.primary.main}40, ${theme.palette.secondary.main}40, ${theme.palette.highlight.main}40)`,
              transform: { lg: "translateX(-50%)" },
            }}
          />

          {/* Milestones */}
          <Stack spacing={0}>
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                index={index}
                isActive={activeId === milestone.id}
                onToggle={() => handleToggle(milestone.id)}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
