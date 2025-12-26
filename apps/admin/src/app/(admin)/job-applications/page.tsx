"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Plus, Search, Filter, MoreVertical, MapPin, Calendar, ExternalLink } from "lucide-react";

// Mock data for job applications
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Stripe",
    location: "San Francisco, CA (Remote)",
    source: "LinkedIn",
    date: "3/17/2024",
    techStack: ["React", "TypeScript", "GraphQL", "Node.js"],
    status: "Interview",
    statusColor: "success",
  },
  {
    id: "2",
    title: "Software Engineer, Platform",
    company: "Vercel",
    location: "Remote (US)",
    source: "Company Site",
    date: "3/11/2024",
    techStack: ["Node.js", "TypeScript", "Go", "Rust"],
    status: "Applied",
    statusColor: "primary",
  },
  {
    id: "3",
    title: "Frontend Engineer",
    company: "Linear",
    location: "Remote (Worldwide)",
    source: "Builtin",
    date: "3/14/2024",
    techStack: ["React", "TypeScript", "Tailwind", "WebSockets"],
    status: "Not Applied",
    statusColor: "default",
  },
  {
    id: "4",
    title: "Full-Stack Engineer",
    company: "Notion",
    location: "New York, NY (Hybrid)",
    source: "LinkedIn",
    date: "3/19/2024",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    status: "Rejected",
    statusColor: "error",
  },
  {
    id: "5",
    title: "Developer Experience Engineer",
    company: "Unknown",
    location: "Remote",
    source: "Unknown",
    date: "3/20/2024",
    techStack: [],
    status: "Offer",
    statusColor: "success",
  },
];

// Summary stats
const summaryStats = {
  total: 5,
  applied: 1,
  interviewing: 1,
  offers: 1,
};

// Status options for filter
const statusOptions = ["All Status", "Applied", "Interview", "Offer", "Rejected", "Not Applied"];

// Source options for filter
const sourceOptions = ["All Sources", "LinkedIn", "Company Site", "Builtin", "Other"];

// Summary Card Component
function SummaryCard({ label, value, color }: { label: string; value: number; color?: string }) {
  const theme = useTheme();
  const colorMap: Record<string, string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.secondary.main,
    default: theme.palette.text.primary,
  };

  return (
    <Card
      sx={{
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: color ? colorMap[color] : theme.palette.text.primary,
        }}
      >
        {value}
      </Typography>
    </Card>
  );
}

// Job Card Component (Mobile)
function JobCard({ job }: { job: (typeof mockJobs)[0] }) {
  const theme = useTheme();
  const router = useRouter();
  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview":
      case "Offer":
        return { bg: `${theme.palette.secondary.main}1A`, color: theme.palette.secondary.main };
      case "Applied":
        return { bg: `${theme.palette.primary.main}1A`, color: theme.palette.primary.main };
      case "Rejected":
        return { bg: `${theme.palette.error.main}1A`, color: theme.palette.error.main };
      default:
        return { bg: `${theme.palette.text.secondary}1A`, color: theme.palette.text.secondary };
    }
  };

  const statusColors = getStatusColor(job.status);

  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        cursor: "pointer",
        "&:hover": {
          borderColor: theme.palette.primary.main,
        },
      }}
      onClick={() => router.push(`/job-applications/${job.id}`)}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Avatar
          sx={{
            bgcolor: `${theme.palette.primary.main}14`,
            color: theme.palette.primary.main,
            fontWeight: 700,
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
          }}
        >
          {getInitials(job.company)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
            {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.company}
          </Typography>
        </Box>
        <Chip
          label={job.status}
          size="small"
          sx={{
            bgcolor: statusColors.bg,
            color: statusColors.color,
            fontWeight: 500,
            height: 24,
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <MapPin size={14} color={theme.palette.text.secondary} />
          <Typography variant="caption" color="text.secondary">
            {job.location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ExternalLink size={14} color={theme.palette.text.secondary} />
          <Typography variant="caption" color="text.secondary">
            {job.source}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Calendar size={14} color={theme.palette.text.secondary} />
          <Typography variant="caption" color="text.secondary">
            {job.date}
          </Typography>
        </Box>
      </Box>

      {job.techStack.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {job.techStack.slice(0, 4).map((tech) => (
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
          {job.techStack.length > 4 && (
            <Chip
              label={`+${job.techStack.length - 4}`}
              size="small"
              sx={{
                fontSize: "0.75rem",
                height: 24,
                bgcolor: theme.palette.background.default,
              }}
            />
          )}
        </Box>
      )}
    </Card>
  );
}

export default function JobApplicationsPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sourceFilter, setSourceFilter] = useState("All Sources");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || job.status === statusFilter;
    const matchesSource = sourceFilter === "All Sources" || job.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview":
      case "Offer":
        return { bg: `${theme.palette.secondary.main}1A`, color: theme.palette.secondary.main };
      case "Applied":
        return { bg: `${theme.palette.primary.main}1A`, color: theme.palette.primary.main };
      case "Rejected":
        return { bg: `${theme.palette.error.main}1A`, color: theme.palette.error.main };
      default:
        return { bg: `${theme.palette.text.secondary}1A`, color: theme.palette.text.secondary };
    }
  };

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
            Job Applications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track and manage your job applications
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => router.push("/job-applications/add")}
          sx={{ textTransform: "none" }}
        >
          Add Job
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        <SummaryCard label="Total Jobs" value={summaryStats.total} />
        <SummaryCard label="Applied" value={summaryStats.applied} color="primary" />
        <SummaryCard label="Interviewing" value={summaryStats.interviewing} color="success" />
        <SummaryCard label="Offers" value={summaryStats.offers} color="success" />
      </Box>

      {/* Search and Filters */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search by company or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{
            flex: 1,
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
        <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 150 } }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
            startAdornment={<Filter size={16} style={{ marginRight: 8 }} />}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 150 } }}>
          <InputLabel>Source</InputLabel>
          <Select
            value={sourceFilter}
            label="Source"
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            {sourceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Job List */}
      {isMobile ? (
        <Box>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredJobs.map((job) => {
            const statusColors = getStatusColor(job.status);
            return (
              <Card
                key={job.id}
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                  },
                }}
                onClick={() => router.push(`/job-applications/${job.id}`)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.main}14`,
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {getInitials(job.company)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {job.company}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <MapPin size={14} color={theme.palette.text.secondary} />
                        <Typography variant="caption" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <ExternalLink size={14} color={theme.palette.text.secondary} />
                        <Typography variant="caption" color="text.secondary">
                          {job.source}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Calendar size={14} color={theme.palette.text.secondary} />
                        <Typography variant="caption" color="text.secondary">
                          {job.date}
                        </Typography>
                      </Box>
                    </Box>
                    {job.techStack.length > 0 && (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                        {job.techStack.slice(0, 4).map((tech) => (
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
                        {job.techStack.length > 4 && (
                          <Chip
                            label={`+${job.techStack.length - 4}`}
                            size="small"
                            sx={{
                              fontSize: "0.75rem",
                              height: 24,
                              bgcolor: theme.palette.background.default,
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Chip
                      label={job.status}
                      size="small"
                      sx={{
                        bgcolor: statusColors.bg,
                        color: statusColors.color,
                        fontWeight: 500,
                        height: 28,
                      }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: "none" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/job-applications/${job.id}`);
                      }}
                    >
                      View Details
                    </Button>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle menu
                      }}
                    >
                      <MoreVertical size={18} />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
