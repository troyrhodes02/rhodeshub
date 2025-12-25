"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Container, Stack, Typography, IconButton } from "@mui/material";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
        py: { xs: 4, sm: 5, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 0 }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          {/* Left: Logo + Name + Copyright */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Logo Icon */}
            <Box
              sx={{
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.contrastText",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.375rem" },
                flexShrink: 0,
              }}
            >
              W
            </Box>

            {/* Name and Copyright */}
            <Stack spacing={0.5}>
              <Typography
                component={Link}
                href="/"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": {
                    color: "primary.main",
                  },
                  transition: "color 0.2s ease",
                }}
              >
                William Rhodes
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                }}
              >
                © 2025 All rights reserved.
              </Typography>
            </Stack>
          </Stack>

          {/* Center: Built with text */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              display: { xs: "none", md: "block" },
            }}
          >
            Built with TypeScript, React & MUI
          </Typography>

          {/* Right: Social Icons + Scroll to Top */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* GitHub */}
            <IconButton
              component="a"
              href="https://github.com/troyrhodes02"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: "text.secondary",
                borderRadius: 1.5,
                padding: "10px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
                },
              }}
            >
              <Github size={20} />
            </IconButton>

            {/* LinkedIn */}
            <IconButton
              component="a"
<<<<<<< HEAD
              href="https://www.linkedin.com/in/williamrhodespvamu/"
=======
              href="https://www.linkedin.com/in/wtrhodes/"
>>>>>>> master
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: "text.secondary",
                borderRadius: 1.5,
                padding: "10px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
                },
              }}
            >
              <Linkedin size={20} />
            </IconButton>

            {/* Email */}
            <IconButton
              component="a"
              href="mailto:wtrhodes.dev@gmail.com"
              aria-label="Email"
              sx={{
                color: "text.secondary",
                borderRadius: 1.5,
                padding: "10px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
                },
              }}
            >
              <Mail size={20} />
            </IconButton>

            {/* Scroll to Top */}
            {showScrollTop && (
              <IconButton
                onClick={scrollToTop}
                aria-label="Scroll to top"
                sx={{
                  color: "text.secondary",
                  borderRadius: 1.5,
                  padding: "10px",
                  transition: "all 0.2s ease",
                  ml: 0.5,
                  "&:hover": {
                    backgroundColor: "action.hover",
                    color: "text.primary",
                  },
                }}
              >
                <ArrowUp size={20} />
              </IconButton>
            )}
          </Stack>
        </Stack>

        {/* Mobile: Built with text */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.8rem",
            textAlign: "center",
            mt: 3,
            display: { xs: "block", md: "none" },
          }}
        >
          Built with TypeScript, React & MUI
        </Typography>
      </Container>
    </Box>
  );
}
