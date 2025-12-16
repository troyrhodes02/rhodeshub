"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { Github, Linkedin, Mail, Menu, X, Sun, Moon } from "lucide-react";
import { useThemeMode } from "@/theme";

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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedMode, toggleMode } = useThemeMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppBar
      position="fixed"
      suppressHydrationWarning
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "background.default",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        px: { xs: 0, lg: 4, xl: 12 },
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
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            color: "inherit",
            flex: { xs: 0, lg: 1 },
            zIndex: 1,
          }}
        >
          {/* W Logo */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.contrastText",
              fontWeight: 700,
              fontSize: "1.25rem",
              flexShrink: 0,
            }}
          >
            W
          </Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "text.primary",
              display: { xs: "none", sm: "block" },
              whiteSpace: "nowrap",
            }}
            variant="h6"
          >
            William Rhodes
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: { lg: 2, xl: 4 },
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          {navLinks.map((link) => {
            const isActive = mounted && pathname === link.href;
            return (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={(theme) => ({
                  color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
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
                  whiteSpace: "nowrap",
                  "&:hover": {
                    color: theme.palette.text.primary,
                    backgroundColor: "transparent",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "10%",
                    right: "10%",
                    height: "2px",
                    backgroundColor: theme.palette.primary.main,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                })}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>

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
                color: "text.secondary",
                borderRadius: "8px",
                padding: "8px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
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
                color: "text.secondary",
                borderRadius: "8px",
                padding: "8px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
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
                color: "text.secondary",
                borderRadius: "8px",
                padding: "8px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
                },
              }}
            >
              <Mail size={20} />
            </IconButton>
            <IconButton
              onClick={toggleMode}
              aria-label="Toggle dark mode"
              sx={{
                color: "text.secondary",
                borderRadius: "8px",
                padding: "8px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
                },
              }}
            >
              {resolvedMode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
          </Box>

          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{
              display: { xs: "flex", lg: "none" },
              color: "text.secondary",
              borderRadius: "8px",
              padding: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </Box>
      </Toolbar>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={(theme) => ({
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: `${theme.palette.background.paper}F2`,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                display: { lg: "none" },
                px: { xs: 2, sm: 4 },
                py: 3,
              })}
            >
              <List sx={{ py: 0, mb: 2, px: 0 }}>
                {navLinks.map((link) => {
                  const isActive = mounted && pathname === link.href;
                  return (
                    <ListItem
                      key={link.href}
                      component={Link}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      sx={(theme) => ({
                        borderRadius: "8px",
                        px: 2,
                        py: 1.5,
                        mb: 0.5,
                        backgroundColor: isActive
                          ? `${theme.palette.primary.main}1A`
                          : "transparent",
                        color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                        fontWeight: isActive ? 500 : 400,
                        fontSize: "14px",
                        textTransform: "none",
                        transition: "all 0.2s",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        "&:hover": {
                          color: theme.palette.text.primary,
                          backgroundColor: isActive
                            ? `${theme.palette.primary.main}1A`
                            : theme.palette.action.hover,
                        },
                        textDecoration: "none",
                        display: "block",
                      })}
                    >
                      {link.label}
                    </ListItem>
                  );
                })}
              </List>

              <Divider sx={{ my: 2, borderColor: "divider" }} />

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
                    color: "text.secondary",
                    borderRadius: "8px",
                    padding: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      color: "text.primary",
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
                    color: "text.secondary",
                    borderRadius: "8px",
                    padding: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      color: "text.primary",
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
                    color: "text.secondary",
                    borderRadius: "8px",
                    padding: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      color: "text.primary",
                    },
                  }}
                >
                  <Mail size={20} />
                </IconButton>
                <IconButton
                  onClick={toggleMode}
                  aria-label="Toggle dark mode"
                  sx={{
                    color: "text.secondary",
                    borderRadius: "8px",
                    padding: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      color: "text.primary",
                    },
                  }}
                >
                  {resolvedMode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </AppBar>
  );
}
