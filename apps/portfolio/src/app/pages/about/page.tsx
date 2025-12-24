"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import { ArrowRight } from "lucide-react";

const MotionBox = motion(Box);

export default function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: { xs: 4, sm: 5, md: 6 } }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: "text.primary",
              mb: 1,
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              color: "text.secondary",
              fontWeight: 400,
            }}
          >
            Full-stack software engineer focused on building type-safe, user-centric applications.
          </Typography>
        </MotionBox>

        {/* Divider */}
        <Divider sx={{ mb: { xs: 4, sm: 5, md: 6 } }} />

        {/* Content Grid */}
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Main Content Column */}
          <Grid size={{ xs: 12, md: 8 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: "none",
                  boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      color: "text.primary",
                      mb: 3,
                    }}
                  >
                    Hi, I'm William (Troy) Rhodes
                  </Typography>
                  <Stack spacing={2.5}>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        color: "text.primary",
                        lineHeight: 1.7,
                      }}
                    >
                      I'm a software engineer with an IT background who spends much of my time
                      building and learning outside of my day-to-day role. Over the past few years,
                      I've transitioned from helpdesk and desktop services into Enterprise
                      Applications while working on SaaS products, startup projects, and internal
                      tools that solve real, practical problems.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        color: "text.primary",
                        lineHeight: 1.7,
                      }}
                    >
                      I'm calm under pressure, methodical in how I think, and comfortable learning
                      new domains when I don't have all the answers upfront. I enjoy frontend
                      development and thoughtful design, but I'm most motivated by building software
                      that improves quality of life — especially tools that automate or optimize
                      everyday workflows.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        color: "text.primary",
                        lineHeight: 1.7,
                      }}
                    >
                      RhodesHub is both my portfolio and a real system I built to showcase my
                      full-stack and AI engineering skills while solving a personal problem:
                      optimizing my own job search and application process. It reflects how I
                      approach software — clean architecture, strong user experience, and
                      intentional scope.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        color: "text.primary",
                        lineHeight: 1.7,
                      }}
                    >
                      Outside of engineering, staying disciplined and healthy is a major part of my
                      life. I train in the gym six days a week and unwind with sports and games when
                      I can.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </MotionBox>
          </Grid>

          {/* Sidebar Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              {/* Quick Info Card */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "none",
                    boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        color: "text.primary",
                        mb: 3,
                      }}
                    >
                      Quick Info
                    </Typography>
                    <Stack spacing={3}>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            color: "text.secondary",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            mb: 0.5,
                          }}
                        >
                          LOCATION
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.95rem",
                            color: "text.primary",
                          }}
                        >
                          Texas, USA
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            color: "text.secondary",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            mb: 0.5,
                          }}
                        >
                          FOCUS AREAS
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.95rem",
                            color: "text.primary",
                          }}
                        >
                          Full-Stack Development, SaaS, Automation
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            color: "text.secondary",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            mb: 1,
                          }}
                        >
                          PRIMARY STACK
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                          {["TypeScript", "React", "Next.js", "Node.js"].map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              sx={{
                                borderRadius: "999px",
                                bgcolor: isDark ? theme.palette.action.hover : "#F3F4F6",
                                color: "text.primary",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                                height: 28,
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
              </MotionBox>

              {/* Let's Connect Card */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "none",
                    boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        color: "text.primary",
                        mb: 2,
                      }}
                    >
                      Let's Connect
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "text.secondary",
                        lineHeight: 1.6,
                        mb: 3,
                      }}
                    >
                      I'm always open to discussing new opportunities and interesting projects.
                    </Typography>
                    <Button
                      component={Link}
                      href="/pages/contact"
                      variant="contained"
                      endIcon={<ArrowRight size={18} />}
                      sx={{
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        px: 3,
                        py: 1.25,
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      }}
                    >
                      Get in Touch
                    </Button>
                  </CardContent>
                </Card>
              </MotionBox>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
