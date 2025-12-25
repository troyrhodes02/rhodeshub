"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { ArrowRight } from "lucide-react";

const MotionBox = motion.create(Box);

export default function Connect() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative" }}>
        <Stack spacing={{ xs: 3, sm: 4 }} alignItems="center" textAlign="center">
          {/* Section Label */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="overline"
              sx={{
                display: "block",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "primary.main",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                textTransform: "uppercase",
              }}
            >
              Let's Connect
            </Typography>
          </MotionBox>

          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                color: "text.primary",
                lineHeight: 1.2,
              }}
            >
              Have a project in mind?
            </Typography>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ maxWidth: 500 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                lineHeight: 1.6,
              }}
            >
              I'm always open to exploring new opportunities and collaborations.
            </Typography>
          </MotionBox>

          {/* CTA Button */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            sx={{ pt: 1 }}
          >
            <Button
              component={Link}
<<<<<<< HEAD
              href="/contact"
=======
              href="/pages/contact"
>>>>>>> master
              variant="contained"
              size="large"
              endIcon={<ArrowRight size={18} />}
              sx={{
                borderRadius: 2,
                px: { xs: 4, sm: 5 },
                py: { xs: 1.25, sm: 1.5 },
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 600,
                textTransform: "none",
                boxShadow: (theme) => `0 4px 14px ${theme.palette.primary.main}40`,
                "&:hover": {
                  boxShadow: (theme) => `0 6px 20px ${theme.palette.primary.main}50`,
                },
              }}
            >
              Get in Touch
            </Button>
          </MotionBox>

          {/* Email */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            sx={{ pt: { xs: 2, sm: 3 } }}
          >
            <Typography
              component="a"
              href="mailto:wtrhodes.dev@gmail.com"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.9rem", sm: "0.95rem" },
                textDecoration: "none",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              wtrhodes.dev@gmail.com
            </Typography>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
