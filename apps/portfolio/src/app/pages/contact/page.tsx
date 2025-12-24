"use client";

import { motion } from "framer-motion";
import { Box, Container, Stack, Typography, Card, CardContent, Grid, Divider } from "@mui/material";
import { Mail, Github, Linkedin } from "lucide-react";

const MotionBox = motion.create(Box);

export default function ContactPage() {
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
            Contact
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
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </Typography>
        </MotionBox>

        <Divider sx={{ mb: { xs: 4, sm: 5, md: 6 } }} />

        {/* Main Content - Two Cards Side by Side */}
        <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
          {/* Direct Contact Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              sx={{ height: "100%" }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.light",
                    boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}14`,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 }, height: "100%" }}>
                  <Stack spacing={3} sx={{ height: "100%" }}>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                          mb: 1.5,
                          color: "text.primary",
                        }}
                      >
                        Direct Contact
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                          lineHeight: 1.6,
                        }}
                      >
                        Prefer email? Reach out directly and I'll respond as soon as I can.
                      </Typography>
                    </Box>

                    <Box
                      component="a"
                      href="mailto:wtrhodes.dev@gmail.com"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2.5,
                        p: { xs: 2.5, sm: 3 },
                        borderRadius: 2,
                        bgcolor: (theme) => `${theme.palette.primary.main}08`,
                        border: "1px solid",
                        borderColor: (theme) => `${theme.palette.primary.main}20`,
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.2s ease",
                        mt: "auto",
                        "&:hover": {
                          bgcolor: (theme) => `${theme.palette.primary.main}12`,
                          borderColor: (theme) => `${theme.palette.primary.main}40`,
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: { xs: 44, sm: 48 },
                          height: { xs: 44, sm: 48 },
                          borderRadius: 2,
                          bgcolor: (theme) => `${theme.palette.primary.main}20`,
                          color: "primary.main",
                          flexShrink: 0,
                        }}
                      >
                        <Mail size={24} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            color: "text.primary",
                            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" },
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          Email Me
                        </Typography>
                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.9rem", sm: "0.95rem" },
                          }}
                        >
                          wtrhodes.dev@gmail.com
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </MotionBox>
          </Grid>

          {/* Connect Online Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{ height: "100%" }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.light",
                    boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}14`,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 }, height: "100%" }}>
                  <Stack spacing={3} sx={{ height: "100%" }}>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                          mb: 1.5,
                          color: "text.primary",
                        }}
                      >
                        Connect Online
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                          lineHeight: 1.6,
                        }}
                      >
                        Find me on these platforms to see more of my work and professional activity.
                      </Typography>
                    </Box>

                    <Stack spacing={2.5} sx={{ flex: 1, mt: "auto" }}>
                      {/* GitHub Card */}
                      <Box
                        component="a"
                        href="https://github.com/troyrhodes02"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2.5,
                          p: { xs: 2.5, sm: 3 },
                          borderRadius: 2,
                          bgcolor: (theme) => `${theme.palette.primary.main}08`,
                          border: "1px solid",
                          borderColor: (theme) => `${theme.palette.primary.main}20`,
                          textDecoration: "none",
                          color: "inherit",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: (theme) => `${theme.palette.primary.main}12`,
                            borderColor: (theme) => `${theme.palette.primary.main}40`,
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: 44, sm: 48 },
                            height: { xs: 44, sm: 48 },
                            borderRadius: 2,
                            bgcolor: (theme) => `${theme.palette.primary.main}20`,
                            color: "primary.main",
                            flexShrink: 0,
                          }}
                        >
                          <Github size={24} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              color: "text.primary",
                              fontSize: { xs: "1rem", sm: "1.1rem" },
                              fontWeight: 600,
                              mb: 0.5,
                            }}
                          >
                            GitHub
                          </Typography>
                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "0.85rem", sm: "0.9rem" },
                            }}
                          >
                            View my code and projects
                          </Typography>
                        </Box>
                      </Box>

                      {/* LinkedIn Card */}
                      <Box
                        component="a"
                        href="https://www.linkedin.com/in/wtrhodes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2.5,
                          p: { xs: 2.5, sm: 3 },
                          borderRadius: 2,
                          bgcolor: (theme) => `${theme.palette.primary.main}08`,
                          border: "1px solid",
                          borderColor: (theme) => `${theme.palette.primary.main}20`,
                          textDecoration: "none",
                          color: "inherit",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: (theme) => `${theme.palette.primary.main}12`,
                            borderColor: (theme) => `${theme.palette.primary.main}40`,
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: 44, sm: 48 },
                            height: { xs: 44, sm: 48 },
                            borderRadius: 2,
                            bgcolor: (theme) => `${theme.palette.primary.main}20`,
                            color: "primary.main",
                            flexShrink: 0,
                          }}
                        >
                          <Linkedin size={24} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              color: "text.primary",
                              fontSize: { xs: "1rem", sm: "1.1rem" },
                              fontWeight: 600,
                              mb: 0.5,
                            }}
                          >
                            LinkedIn
                          </Typography>
                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "0.85rem", sm: "0.9rem" },
                            }}
                          >
                            Connect professionally
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
