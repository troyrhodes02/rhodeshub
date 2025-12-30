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
  IconButton,
} from "@mui/material";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Mail,
  FileText,
  Plus,
  Home,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { useThemeMode } from "@/app/theme";

const SIDEBAR_WIDTH = 240;

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Job Applications", path: "/job-applications", icon: Briefcase },
  { label: "Job Inbox", path: "/job-inbox", icon: Mail },
  { label: "Resume Intel", path: "/resume-intelligence", icon: FileText },
];

// Get portfolio URL from env or fallback to localhost
const getPortfolioUrl = () => {
  return process.env.NEXT_PUBLIC_PORTFOLIO_URL || "http://localhost:3000";
};

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const { resolvedMode, toggleMode } = useThemeMode();

  const drawerContent = (
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
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* W Avatar matching portfolio navbar style */}
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 1.5,
              bgcolor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.primary.contrastText,
              fontWeight: 700,
              fontSize: "1.1rem",
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
              fontSize: "1rem",
            }}
          >
            Admin Panel
          </Typography>
        </Box>
        {/* Close button for mobile */}
        <IconButton
          onClick={onMobileClose}
          sx={{
            display: { xs: "flex", md: "none" },
            color: theme.palette.text.secondary,
          }}
        >
          <X size={18} />
        </IconButton>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, pt: 1.5 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              href={item.path}
              selected={isActive}
              onClick={onMobileClose}
              sx={{
                mx: 0.75,
                mb: 0.5,
                borderRadius: 1,
                py: 0.75,
                color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                backgroundColor: isActive ? `${theme.palette.primary.main}1A` : "transparent",
                border: isActive
                  ? `1px solid ${theme.palette.primary.main}33`
                  : "1px solid transparent",
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
                  minWidth: 36,
                  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                }}
              >
                <Icon size={18} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                  color: "inherit",
                  fontSize: "0.875rem",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      {/* Bottom Actions */}
      <Box sx={{ p: 1.5 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Plus size={18} />}
          component={Link}
          href="/projects"
          onClick={onMobileClose}
          sx={{
            mb: 1.5,
            textTransform: "none",
            fontSize: "0.875rem",
            py: 0.75,
          }}
        >
          Add Project
        </Button>
        <Button
          fullWidth
          component="a"
          href={getPortfolioUrl()}
          startIcon={<Home size={18} />}
          onClick={onMobileClose}
          sx={{
            mb: 1.5,
            textTransform: "none",
            fontSize: "0.875rem",
            py: 0.75,
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
          startIcon={resolvedMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          sx={{
            textTransform: "none",
            fontSize: "0.875rem",
            py: 0.75,
          }}
          aria-label="Toggle theme"
        >
          {resolvedMode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: (theme) => theme.zIndex.drawer,
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            zIndex: (theme) => theme.zIndex.drawer,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
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
        {drawerContent}
      </Drawer>
    </>
  );
}

export { SIDEBAR_WIDTH };
