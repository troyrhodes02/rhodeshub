"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Mail,
  FileText,
  Settings,
  Plus,
  Home,
  Sun,
  Moon,
} from "lucide-react";
import { useThemeMode } from "@/app/theme";

const SIDEBAR_WIDTH = 280;

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Job Applications", path: "/job-applications", icon: Briefcase },
  { label: "Job Inbox", path: "/job-inbox", icon: Mail },
  { label: "Resume Intel", path: "/resume-intelligence", icon: FileText },
  { label: "Settings", path: "/settings", icon: Settings },
];

// Get portfolio URL from env or fallback to localhost
const getPortfolioUrl = () => {
  return process.env.NEXT_PUBLIC_PORTFOLIO_URL || "http://localhost:3000";
};

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useTheme();
  const { resolvedMode, toggleMode } = useThemeMode();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* W Avatar matching portfolio navbar style */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.primary.contrastText,
              fontWeight: 700,
              fontSize: "1.25rem",
              flexShrink: 0,
            }}
          >
            W
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        {/* Navigation */}
        <List sx={{ flex: 1, pt: 2 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <ListItemButton
                key={item.path}
                component={Link}
                href={item.path}
                selected={isActive}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 1,
                  color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                  backgroundColor: isActive
                    ? `${theme.palette.primary.main}1A`
                    : "transparent",
                  border: isActive ? `1px solid ${theme.palette.primary.main}33` : "1px solid transparent",
                  "&:hover": {
                    color: theme.palette.text.primary,
                    backgroundColor: isActive
                      ? `${theme.palette.primary.main}1A`
                      : `${theme.palette.action.hover}1A`,
                  },
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}1A`,
                    border: `1px solid ${theme.palette.primary.main}33`,
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.main}1A`,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                  }}
                >
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    color: "inherit",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Divider />

        {/* Bottom Actions */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Plus size={20} />}
            component={Link}
            href="/projects"
            sx={{
              mb: 2,
              textTransform: "none",
            }}
          >
            Add Project
          </Button>
          <Button
            fullWidth
            component="a"
            href={getPortfolioUrl()}
            startIcon={<Home size={20} />}
            sx={{
              mb: 2,
              textTransform: "none",
              color: theme.palette.text.secondary,
              border: `1px solid transparent`,
              "&:hover": {
                color: theme.palette.text.primary,
                backgroundColor: `${theme.palette.action.hover}1A`,
              },
            }}
          >
            View Site
          </Button>
          <Button
            onClick={toggleMode}
            fullWidth
            variant="outlined"
            startIcon={resolvedMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            sx={{
              textTransform: "none",
            }}
            aria-label="Toggle theme"
          >
            {resolvedMode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export { SIDEBAR_WIDTH };
