"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/ai-demo", label: "AI Demo" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "none",
        px: { xs: 0, lg: 25 },
      }}
    >
      <Toolbar
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "100%",
          position: "relative",
        }}
      >
        {/* Logo - Left Section */}
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
            flex: { xs: 0, lg: 1 },
            zIndex: 1,
          }}
        >
          <Image
            src="/rhodes-hub-logo.png"
            alt="Logo"
            width={60}
            height={60}
            style={{ borderRadius: "8px" }}
          />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1a1a1a",
              display: { xs: "none", sm: "block" },
              whiteSpace: "nowrap",
            }}
            variant="h6"
          >
            William Rhodes
          </Typography>
        </Box>

        {/* Desktop Navigation - Center Section */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 4,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: isActive ? "#1a1a1a" : "#6b7280",
                  fontWeight: isActive ? 500 : 400,
                  fontSize: "14px",
                  textTransform: "none",
                  padding: "3px 6px",
                  borderRadius: "8px",
                  transition: "color 0.2s",
                  backgroundColor: "transparent",
                  position: "relative",
                  zIndex: 10,
                  pointerEvents: "auto",
                  "&:hover": {
                    color: "#1a1a1a",
                    backgroundColor: "transparent",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "10%",
                    right: "10%",
                    height: "2px",
                    backgroundColor: "#3b82f6",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>

        {/* Right Section - Social Icons (Desktop) / Menu Button (Mobile) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flex: { xs: 0, lg: 0 },
            justifyContent: { xs: "flex-end", lg: "flex-end" },
            zIndex: 1,
            position: "relative",
            pointerEvents: "auto",
            minWidth: "fit-content",
          }}
        >
          {/* Social Icons - Desktop */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <IconButton
              component="a"
              href="https://github.com/troyrhodes02"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: "#6b7280",
                borderRadius: "8px",
                padding: "8px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  color: "#1a1a1a",
                },
              }}
            >
              <Github size={20} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/williamrhodespvamu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: "#6b7280",
                borderRadius: "8px",
                padding: "8px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  color: "#1a1a1a",
                },
              }}
            >
              <Linkedin size={20} />
            </IconButton>
            <IconButton
              component="a"
              href="mailto:wtrhodes.dev@gmail.com"
              aria-label="Email"
              sx={{
                color: "#6b7280",
                borderRadius: "8px",
                padding: "8px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  color: "#1a1a1a",
                },
              }}
            >
              <Mail size={20} />
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{
              display: { xs: "flex", lg: "none" },
              color: "#6b7280",
              borderRadius: "8px",
              padding: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                display: { lg: "none" },
                px: { xs: 2, sm: 4 },
                py: 3,
              }}
            >
              {/* Navigation Links */}
              <List sx={{ py: 0, mb: 2, px: 0 }}>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <ListItem
                      key={link.href}
                      component={Link}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      sx={{
                        borderRadius: "8px",
                        px: 2,
                        py: 1.5,
                        mb: 0.5,
                        backgroundColor: isActive ? "rgba(59, 130, 246, 0.1)" : "transparent",
                        color: isActive ? "#1a1a1a" : "#6b7280",
                        fontWeight: isActive ? 500 : 400,
                        fontSize: "14px",
                        textTransform: "none",
                        transition: "all 0.2s",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        "&:hover": {
                          color: "#1a1a1a",
                          backgroundColor: isActive
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgba(0, 0, 0, 0.05)",
                        },
                        textDecoration: "none",
                        display: "block",
                      }}
                    >
                      {link.label}
                    </ListItem>
                  );
                })}
              </List>

              {/* Divider */}
              <Divider sx={{ my: 2, borderColor: "rgba(0, 0, 0, 0.1)" }} />

              {/* Social Icons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  px: 0,
                  justifyContent: "flex-start",
                }}
              >
                <IconButton
                  component="a"
                  href="https://github.com/troyrhodes02"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  sx={{
                    color: "#6b7280",
                    borderRadius: "8px",
                    padding: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                      color: "#1a1a1a",
                    },
                  }}
                >
                  <Github size={20} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/williamrhodespvamu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  sx={{
                    color: "#6b7280",
                    borderRadius: "8px",
                    padding: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                      color: "#1a1a1a",
                    },
                  }}
                >
                  <Linkedin size={20} />
                </IconButton>
                <IconButton
                  component="a"
                  href="mailto:contact@williamrhodes.dev"
                  aria-label="Email"
                  sx={{
                    color: "#6b7280",
                    borderRadius: "8px",
                    padding: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                      color: "#1a1a1a",
                    },
                  }}
                >
                  <Mail size={20} />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </AppBar>
  );
}
