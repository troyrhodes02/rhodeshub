"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  CircularProgress,
} from "@mui/material";
import { Plus, Search, Filter, MoreVertical, Calendar } from "lucide-react";

// Job application list item from API
interface JobApplicationListItem {
  id: string;
  company: string;
  role: string;
  link: string;
  dateApplied: string;
  status: "APPLIED" | "INTERVIEW" | "REJECTED" | "OFFER";
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
  latestEmailReceivedAt?: string;
}

// Status options for filter
const statusOptions = ["All Status", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

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
        p: 1.5,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75, fontSize: "0.8rem" }}>
        {label}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: "1.5rem",
          color: color ? colorMap[color] : theme.palette.text.primary,
        }}
      >
        {value}
      </Typography>
    </Card>
  );
}

// Helper to format date
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US");
}

// Helper to get status display label
function getStatusLabel(status: string): string {
  switch (status) {
    case "APPLIED":
      return "Applied";
    case "INTERVIEW":
      return "Interview";
    case "OFFER":
      return "Offer";
    case "REJECTED":
      return "Rejected";
    default:
      return status;
  }
}

// Job Card Component (Mobile)
function JobCard({ job }: { job: JobApplicationListItem }) {
  const theme = useTheme();
  const router = useRouter();
  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "INTERVIEW":
      case "OFFER":
        return { bg: `${theme.palette.secondary.main}1A`, color: theme.palette.secondary.main };
      case "APPLIED":
        return { bg: `${theme.palette.primary.main}1A`, color: theme.palette.primary.main };
      case "REJECTED":
        return { bg: `${theme.palette.error.main}1A`, color: theme.palette.error.main };
      default:
        return { bg: `${theme.palette.text.secondary}1A`, color: theme.palette.text.secondary };
    }
  };

  const statusColors = getStatusColor(job.status);

  return (
    <Card
      sx={{
        p: 1.75,
        mb: 1.5,
        border: `1px solid ${theme.palette.divider}`,
        cursor: "pointer",
        "&:hover": {
          borderColor: theme.palette.primary.main,
        },
      }}
      onClick={() => router.push(`/job-applications/${job.id}`)}
    >
      <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
        <Avatar
          sx={{
            bgcolor: `${theme.palette.primary.main}14`,
            color: theme.palette.primary.main,
            fontWeight: 700,
            width: { xs: 34, sm: 40 },
            height: { xs: 34, sm: 40 },
            fontSize: "0.9rem",
          }}
        >
          {getInitials(job.company)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, fontSize: "0.95rem" }}>
            {job.role}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            {job.company}
          </Typography>
        </Box>
        <Chip
          label={getStatusLabel(job.status)}
          size="small"
          sx={{
            bgcolor: statusColors.bg,
            color: statusColors.color,
            fontWeight: 500,
            height: 22,
            fontSize: "0.7rem",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Calendar size={12} color={theme.palette.text.secondary} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
            Applied {formatDate(job.dateApplied)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default function JobApplicationsPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [jobs, setJobs] = useState<JobApplicationListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/admin/job-applications");
        if (res.ok) {
          const data: JobApplicationListItem[] = await res.json();
          setJobs(data);
        }
      } catch (err) {
        console.error("Failed to fetch job applications:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Compute summary stats
  const summaryStats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "APPLIED").length,
    interviewing: jobs.filter((j) => j.status === "INTERVIEW").length,
    offers: jobs.filter((j) => j.status === "OFFER").length,
  };

  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "INTERVIEW":
      case "OFFER":
        return { bg: `${theme.palette.secondary.main}1A`, color: theme.palette.secondary.main };
      case "APPLIED":
        return { bg: `${theme.palette.primary.main}1A`, color: theme.palette.primary.main };
      case "REJECTED":
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
          gap: 1.5,
          mb: { xs: 2.5, md: 3 },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.3rem", sm: "1.7rem" },
            }}
          >
            Job Applications
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
            Track and manage your job applications
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => router.push("/job-applications/add")}
          sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
        >
          Add Job
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
          gap: 1.5,
          mb: 2.5,
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
          gap: 1.5,
          mb: 2.5,
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
                <Search size={16} color={theme.palette.text.secondary} />
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
                {option === "All Status" ? option : getStatusLabel(option)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Job List */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={24} />
        </Box>
      ) : filteredJobs.length === 0 ? (
        <Card sx={{ border: `1px solid ${theme.palette.divider}`, p: 4 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            No job applications found.
          </Typography>
        </Card>
      ) : isMobile ? (
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
                  p: 1.75,
                  border: `1px solid ${theme.palette.divider}`,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                  },
                }}
                onClick={() => router.push(`/job-applications/${job.id}`)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.main}14`,
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      width: 40,
                      height: 40,
                      fontSize: "0.9rem",
                    }}
                  >
                    {getInitials(job.company)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 0.5, fontSize: "0.95rem" }}
                    >
                      {job.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.75, fontSize: "0.8rem" }}
                    >
                      {job.company}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Calendar size={12} color={theme.palette.text.secondary} />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: "0.7rem" }}
                        >
                          Applied {formatDate(job.dateApplied)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Chip
                      label={getStatusLabel(job.status)}
                      size="small"
                      sx={{
                        bgcolor: statusColors.bg,
                        color: statusColors.color,
                        fontWeight: 500,
                        height: 26,
                        fontSize: "0.75rem",
                      }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: "none", fontSize: "0.8rem", py: 0.5 }}
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
                      <MoreVertical size={16} />
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
