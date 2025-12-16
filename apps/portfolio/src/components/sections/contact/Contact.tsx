"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { SendHorizontal, Mail, Github, Linkedin } from "lucide-react";

const MotionBox = motion.create(Box);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

        {/* Two Column Layout */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Left Column - Send a Message Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        mb: 1,
                        color: "text.primary",
                      }}
                    >
                      Send a Message
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.9rem", sm: "0.95rem" },
                      }}
                    >
                      Fill out the form below and I'll get back to you as soon as possible.
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>
                      <TextField
                        name="name"
                        label="Name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "background.paper",
                          },
                        }}
                      />

                      <TextField
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "background.paper",
                          },
                        }}
                      />

                      <TextField
                        name="message"
                        label="Message"
                        placeholder="Tell me about your project or opportunity..."
                        value={formData.message}
                        onChange={handleChange}
                        fullWidth
                        required
                        multiline
                        rows={6}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "background.paper",
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<SendHorizontal size={18} />}
                        sx={{
                          borderRadius: 2,
                          py: 1.25,
                          fontSize: { xs: "0.95rem", sm: "1rem" },
                          fontWeight: 600,
                          textTransform: "none",
                          mt: 1,
                        }}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Direct Contact & Connect Online */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4}>
              {/* Direct Contact */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                          mb: 1,
                          color: "text.primary",
                        }}
                      >
                        Direct Contact
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.9rem", sm: "0.95rem" },
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
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: (theme) => `${theme.palette.primary.main}08`,
                        border: "1px solid",
                        borderColor: (theme) => `${theme.palette.primary.main}20`,
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: (theme) => `${theme.palette.primary.main}12`,
                          borderColor: (theme) => `${theme.palette.primary.main}30`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary.main",
                        }}
                      >
                        <Mail size={20} />
                      </Box>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: { xs: "0.95rem", sm: "1rem" },
                          fontWeight: 500,
                        }}
                      >
                        wtrhodes.dev@gmail.com
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Connect Online */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                          mb: 1,
                          color: "text.primary",
                        }}
                      >
                        Connect Online
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.9rem", sm: "0.95rem" },
                        }}
                      >
                        Find me on these platforms to see more of my work and professional
                        activity.
                      </Typography>
                    </Box>

                    <Stack spacing={2}>
                      {/* GitHub Card */}
                      <Box
                        component="a"
                        href="https://github.com/troyrhodes02"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          bgcolor: (theme) => `${theme.palette.primary.main}08`,
                          border: "1px solid",
                          borderColor: (theme) => `${theme.palette.primary.main}20`,
                          textDecoration: "none",
                          color: "inherit",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: (theme) => `${theme.palette.primary.main}12`,
                            borderColor: (theme) => `${theme.palette.primary.main}30`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "primary.main",
                          }}
                        >
                          <Github size={20} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              color: "text.primary",
                              fontSize: { xs: "0.95rem", sm: "1rem" },
                              fontWeight: 600,
                              mb: 0.25,
                            }}
                          >
                            GitHub
                          </Typography>
                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "0.8rem", sm: "0.85rem" },
                            }}
                          >
                            View my code and projects
                          </Typography>
                        </Box>
                      </Box>

                      {/* LinkedIn Card */}
                      <Box
                        component="a"
                        href="https://www.linkedin.com/in/williamrhodespvamu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          bgcolor: (theme) => `${theme.palette.primary.main}08`,
                          border: "1px solid",
                          borderColor: (theme) => `${theme.palette.primary.main}20`,
                          textDecoration: "none",
                          color: "inherit",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: (theme) => `${theme.palette.primary.main}12`,
                            borderColor: (theme) => `${theme.palette.primary.main}30`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "primary.main",
                          }}
                        >
                          <Linkedin size={20} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              color: "text.primary",
                              fontSize: { xs: "0.95rem", sm: "1rem" },
                              fontWeight: 600,
                              mb: 0.25,
                            }}
                          >
                            LinkedIn
                          </Typography>
                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "0.8rem", sm: "0.85rem" },
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
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

