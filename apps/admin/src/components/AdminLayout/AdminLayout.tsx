"use client";

import { useState } from "react";
import { Box, AppBar, Toolbar, IconButton, useTheme } from "@mui/material";
import { Menu } from "lucide-react";
import Sidebar, { SIDEBAR_WIDTH } from "./Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Mobile AppBar */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "flex", md: "none" },
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer - 1, // Below drawer so sidebar can overlay
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            <Menu size={20} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 3, sm: 4, md: 5 },
          width: { xs: "100%", md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          mt: { xs: "64px", md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
