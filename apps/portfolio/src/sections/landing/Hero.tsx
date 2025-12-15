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
  LinearProgress,
} from "@mui/material";
import { ArrowRight, Download, Code2, Layers, Zap, Database } from "lucide-react";

const techStack = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "Prisma"];

// Motion wrappers for MUI components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
        px: { xs: 2, sm: 3, lg: 0 },
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: (theme) =>
            `radial-gradient(ellipse at top right, ${theme.palette.highlight.main}14, transparent 60%),` +
            `radial-gradient(ellipse at bottom left, ${theme.palette.primary.main}14, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      {/* Grid pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: (theme) =>
            `linear-gradient(to right, ${theme.palette.divider}4D 1px, transparent 1px),
             linear-gradient(to bottom, ${theme.palette.divider}4D 1px, transparent 1px)`,
          backgroundSize: { xs: "2rem 2rem", sm: "4rem 4rem" },
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid
          container
          spacing={{ xs: 6, sm: 8, md: 8 }}
          alignItems="center"
          sx={{
            minHeight: "100vh",
            py: { xs: 8, sm: 10 },
          }}
        >
          {/* Left side */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              {/* Eyebrow */}
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                sx={{ display: "inline-flex", mb: 2, position: "relative" }}
              >
                <Chip
                  label="Full-Stack Software Engineer"
                  variant="outlined"
                  sx={{
                    borderColor: "primary.main",
                    // mimic your subtle pill feel
                    backgroundColor: (theme) => `${theme.palette.primary.main}0D`,
                    color: "primary.main",
                    fontWeight: 600,
                    "& .MuiChip-label": { px: 1.5 },
                    position: "relative",
                    pl: 3.25,
                  }}
                />
                {/* tiny dot */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    ml: "14px",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    pointerEvents: "none",
                  }}
                />
              </MotionBox>

              {/* Headline */}
              <MotionTypography
                variant="h2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.08,
                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                    md: "3.2rem",
                    lg: "3.6rem",
                  },
                }}
              >
                Building modern{" "}
                <Box
                  component="span"
                  sx={(theme) => ({
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  })}
                >
                  SaaS applications
                </Box>
                , automation tools, and clean frontend interfaces.
              </MotionTypography>

              {/* Subheadline */}
              <MotionTypography
                variant="body1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                sx={{
                  mt: { xs: 2, sm: 3 },
                  mx: { xs: "auto", md: 0 },
                  maxWidth: 560,
                  color: "text.secondary",
                  fontSize: { xs: "1rem", sm: "1.05rem", lg: "1.125rem" },
                }}
              >
                I specialize in TypeScript, React, and Node.js to create performant, type-safe
                applications with exceptional developer and user experience.
              </MotionTypography>

              {/* Buttons */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                sx={{ mt: 4 }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <Button
                    component={Link}
                    href="/projects"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight size={18} />}
                    sx={{ borderRadius: 2, px: 3, py: 1.25 }}
                  >
                    View Projects
                  </Button>

                  <Button
                    component={Link}
                    href="#"
                    download
                    variant="outlined"
                    size="large"
                    startIcon={<Download size={18} />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1.25,
                      color: "text.primary",
                      border: "1px solid",
                      borderColor: "primary.main",
                    }}
                  >
                    Download Resume
                  </Button>
                </Stack>
              </MotionBox>

              {/* Tech stack */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                sx={{ mt: 4 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    display: "block",
                    mb: 1,
                    color: "text.secondary",
                    letterSpacing: "0.16em",
                    fontWeight: 700,
                  }}
                >
                  Tech Stack
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  {techStack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        borderRadius: 999,
                        bgcolor: "action.hover",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Stack>
              </MotionBox>
            </MotionBox>
          </Grid>

          {/* Right side */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              sx={{ width: "100%", maxWidth: 520, mx: { xs: "auto", md: 0 } }}
            >
              <Box sx={{ position: "relative" }}>
                {/* Glow */}
                <Box
                  sx={(theme) => ({
                    position: "absolute",
                    inset: -16,
                    borderRadius: 6,
                    background: `radial-gradient(ellipse at center, ${theme.palette.highlight.main}26, transparent 80%)`,
                    pointerEvents: "none",
                  })}
                />

                <Stack spacing={2} sx={{ position: "relative" }}>
                  {/* Main card */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: (t) => `${t.palette.primary.main}14`,
                          }}
                        >
                          <Code2 size={20} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>Clean Architecture</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Maintainable &amp; scalable code
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack spacing={1.25}>
                        <LinearProgress
                          variant="determinate"
                          value={100}
                          sx={{ height: 8, borderRadius: 999 }}
                        />
                        <LinearProgress
                          variant="determinate"
                          value={80}
                          sx={{ height: 8, borderRadius: 999 }}
                        />
                        <LinearProgress
                          variant="determinate"
                          value={60}
                          sx={{ height: 8, borderRadius: 999 }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Two small cards */}
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 2,
                              display: "grid",
                              placeItems: "center",
                              bgcolor: (t) => `${t.palette.secondary.main}14`,
                              mb: 1,
                            }}
                          >
                            <Layers size={16} />
                          </Box>
                          <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}>
                            Full-Stack
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            End-to-end solutions
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid size={6}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                          <Box
                            sx={(theme) => ({
                              width: 32,
                              height: 32,
                              borderRadius: 2,
                              display: "grid",
                              placeItems: "center",
                              bgcolor: `${theme.palette.highlight.main}14`,
                              mb: 1,
                            })}
                          >
                            <Zap size={16} color="#00D4FF" />
                          </Box>
                          <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}>
                            Performance
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Optimized for speed
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {/* Bottom card */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 2,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: (t) => `${t.palette.primary.main}14`,
                          }}
                        >
                          <Database size={16} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                            Type-Safe APIs
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={80}
                            sx={{ mt: 1, height: 8, borderRadius: 999 }}
                          />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
