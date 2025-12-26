"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Switch,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Plus, Search, MoreVertical } from "lucide-react";

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    name: "FreightFi",
    category: "Full-Stack",
    techStack: ["TypeScript", "React", "Node.js"],
    status: "Published",
    featured: true,
    updatedAt: "2 days ago",
  },
  {
    id: "2",
    name: "IEPFlow",
    category: "Full-Stack",
    techStack: ["Next.js", "Prisma", "tRPC"],
    status: "Published",
    featured: true,
    updatedAt: "1 week ago",
  },
  {
    id: "3",
    name: "Recruito",
    category: "Automation",
    techStack: ["TypeScript", "Puppeteer", "Node.js"],
    status: "Draft",
    featured: false,
    updatedAt: "3 days ago",
  },
  {
    id: "4",
    name: "Valour",
    category: "Frontend",
    techStack: ["React", "Tailwind", "Framer Motion"],
    status: "Published",
    featured: false,
    updatedAt: "2 weeks ago",
  },
  {
    id: "5",
    name: "InvoiceMailer",
    category: "Automation",
    techStack: ["Node.js", "SendGrid", "PostgreSQL"],
    status: "Published",
    featured: true,
    updatedAt: "5 days ago",
  },
];

// Mobile Project Card Component
function ProjectCard({ project }: { project: (typeof mockProjects)[0] }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {project.name}
          </Typography>
          <Chip
            label={project.category}
            size="small"
            sx={{
              mt: 0.5,
              bgcolor: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`,
            }}
          />
        </Box>
        <IconButton size="small">
          <MoreVertical size={18} />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
        {project.techStack.slice(0, 3).map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            sx={{
              fontSize: "0.75rem",
              height: 24,
              bgcolor: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`,
            }}
          />
        ))}
        {project.techStack.length > 3 && (
          <Chip
            label={`+${project.techStack.length - 3}`}
            size="small"
            sx={{
              fontSize: "0.75rem",
              height: 24,
              bgcolor: theme.palette.background.default,
            }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Chip
          label={project.status}
          size="small"
          sx={{
            bgcolor:
              project.status === "Published"
                ? `${theme.palette.secondary.main}1A`
                : `${theme.palette.text.secondary}1A`,
            color:
              project.status === "Published"
                ? theme.palette.secondary.main
                : theme.palette.text.secondary,
            fontWeight: 500,
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Featured
          </Typography>
          <Switch checked={project.featured} size="small" />
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        Updated {project.updatedAt}
      </Typography>
    </Card>
  );
}

export default function ProjectsPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: { xs: 3, md: 4 },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your portfolio projects and case studies.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => router.push("/projects/add")}
          sx={{ textTransform: "none" }}
        >
          Add Project
        </Button>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
        sx={{
          mb: 3,
          width: { xs: "100%", sm: 300 },
          "& .MuiOutlinedInput-root": {
            bgcolor: theme.palette.background.paper,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} color={theme.palette.text.secondary} />
            </InputAdornment>
          ),
        }}
      />

      {/* Mobile: Card List */}
      {isMobile ? (
        <Box>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Box>
      ) : (
        /* Desktop: Table */
        <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Project
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Tech Stack
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Featured
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Updated
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>{project.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={project.category}
                        size="small"
                        sx={{
                          bgcolor: theme.palette.background.default,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {project.techStack.slice(0, 3).map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                              fontSize: "0.75rem",
                              height: 24,
                              bgcolor: theme.palette.background.default,
                              border: `1px solid ${theme.palette.divider}`,
                            }}
                          />
                        ))}
                        {project.techStack.length > 3 && (
                          <Chip
                            label={`+${project.techStack.length - 3}`}
                            size="small"
                            sx={{
                              fontSize: "0.75rem",
                              height: 24,
                              bgcolor: theme.palette.background.default,
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={project.status}
                        size="small"
                        sx={{
                          bgcolor:
                            project.status === "Published"
                              ? `${theme.palette.secondary.main}1A`
                              : `${theme.palette.text.secondary}1A`,
                          color:
                            project.status === "Published"
                              ? theme.palette.secondary.main
                              : theme.palette.text.secondary,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch checked={project.featured} size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {project.updatedAt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVertical size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  );
}
