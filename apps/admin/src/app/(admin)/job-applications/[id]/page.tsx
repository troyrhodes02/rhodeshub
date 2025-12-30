"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronLeft,
  ExternalLink,
  Pencil,
  Trash2,
  MapPin,
  Calendar,
  Mail,
  Clock,
  CheckCircle2,
  FileText,
  ChevronDown,
} from "lucide-react";

// Mock data for job application
const mockJob = {
  id: "1",
  title: "Senior Frontend Engineer",
  company: "Stripe",
  location: "San Francisco, CA (Remote)",
  source: "LinkedIn",
  dateAdded: "3/9/2024",
  status: "Interview",
  techStack: ["React", "TypeScript", "GraphQL", "Node.js", "Ruby"],
  seniority: "Senior",
  employmentType: "Full-time",
  roleSummary:
    "Senior role focused on building and maintaining the Stripe Dashboard using React, TypeScript, and GraphQL. Strong emphasis on performance optimization and accessibility.",
  originalDescription:
    "We are looking for a Senior Frontend Engineer to join our Dashboard team. You'll be responsible for building and maintaining the Stripe Dashboard using React, TypeScript, and GraphQL. Strong emphasis on performance optimization and accessibility.",
  resumeVersion: "Frontend-Focused Resume",
  activities: [
    {
      id: "1",
      type: "interview_request",
      title: "Interview request received",
      description: "Technical interview scheduled for next week",
      date: "3/18/2024 09:00 AM",
      icon: Mail,
    },
    {
      id: "2",
      type: "status_change",
      title: "Status changed to Interview",
      description: "Moved to interview stage after initial recruiter screen",
      date: "3/15/2024 02:00 PM",
      icon: Clock,
    },
    {
      id: "3",
      type: "confirmation",
      title: "Application confirmation received",
      description: "Received confirmation email from Stripe Recruiting",
      date: "3/10/2024 11:00 AM",
      icon: Mail,
    },
    {
      id: "4",
      type: "submitted",
      title: "Application submitted",
      description: "Submitted via LinkedIn Easy Apply with Frontend-Focused Resume",
      date: "3/10/2024 10:30 AM",
      icon: CheckCircle2,
    },
    {
      id: "5",
      type: "created",
      title: "Job application created",
      description: "Added Senior Frontend Engineer position at Stripe",
      date: "3/10/2024 10:00 AM",
      icon: FileText,
    },
  ],
  emails: [
    {
      id: "1",
      status: "Confirmation",
      date: "3/10/2024",
      subject: "Thank you for applying to Stripe",
      preview: "Thank you for your interest in the Senior Frontend Engineer position...",
      expanded: false,
    },
    {
      id: "2",
      status: "Interview",
      date: "3/18/2024",
      subject: "Interview Invitation - Senior Frontend Engineer at Stripe",
      preview: "We were impressed by your background and would like to invite you...",
      expanded: false,
    },
  ],
};

// Activity Icon Component
function ActivityIcon({ type, Icon }: { type: string; Icon: any }) {
  const theme = useTheme();
  const iconColors: Record<string, string> = {
    interview_request: theme.palette.secondary.main,
    status_change: theme.palette.primary.main,
    confirmation: theme.palette.secondary.main,
    submitted: theme.palette.secondary.main,
    created: theme.palette.text.secondary,
  };

  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        bgcolor: `${iconColors[type] || theme.palette.text.secondary}14`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: iconColors[type] || theme.palette.text.secondary,
        flexShrink: 0,
      }}
    >
      <Icon size={14} />
    </Box>
  );
}

// Email Card Component
function EmailCard({ email }: { email: (typeof mockJob.emails)[0] }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(email.expanded);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview":
        return { bg: `${theme.palette.secondary.main}1A`, color: theme.palette.secondary.main };
      case "Confirmation":
        return { bg: `${theme.palette.primary.main}1A`, color: theme.palette.primary.main };
      default:
        return { bg: `${theme.palette.text.secondary}1A`, color: theme.palette.text.secondary };
    }
  };

  const statusColors = getStatusColor(email.status);

  return (
    <Card
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        mb: 2,
      }}
    >
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75 }}>
              <Chip
                label={email.status}
                size="small"
                sx={{
                  bgcolor: statusColors.bg,
                  color: statusColors.color,
                  fontWeight: 500,
                  height: 20,
                  fontSize: "0.7rem",
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                {email.date}
              </Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, fontSize: "0.85rem" }}>
              {email.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
              {email.preview}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <ChevronDown size={16} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function JobApplicationDetailPage({ params }: { params: { id: string } }) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const job = mockJob; // In real app, fetch by params.id

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
    <Box>
      {/* Header */}
      <Box sx={{ mb: 2.5 }}>
        <Button
          component={Link}
          href="/job-applications"
          startIcon={<ChevronLeft size={16} />}
          sx={{
            mb: 1.5,
            textTransform: "none",
            fontSize: "0.875rem",
            color: theme.palette.primary.main,
          }}
        >
          Back to Job Applications
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1.5,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.75 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.3rem", sm: "1.7rem" },
                }}
              >
                {job.title}
              </Typography>
              <Chip
                label={job.status}
                sx={{
                  bgcolor: statusColors.bg,
                  color: statusColors.color,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  height: 26,
                }}
              />
            </Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 0.75, fontSize: "1rem" }}>
              {job.company}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <MapPin size={16} color={theme.palette.text.secondary} />
                <Typography variant="body2" color="text.secondary">
                  {job.location}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <ExternalLink size={16} color={theme.palette.text.secondary} />
                <Typography variant="body2" color="text.secondary">
                  {job.source}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Calendar size={16} color={theme.palette.text.secondary} />
                <Typography variant="body2" color="text.secondary">
                  Added {job.dateAdded}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ExternalLink size={16} />}
              sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
            >
              View Listing
            </Button>
            <Button
              variant="outlined"
              startIcon={<Pencil size={16} />}
              sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
            >
              Edit
            </Button>
            <IconButton color="error" size="small">
              <Trash2 size={16} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 2.5,
        }}
      >
        {/* Left Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Job Summary */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: "1rem" }}>
                Job Summary
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {job.roleSummary}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Tech Stack:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {job.techStack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.background.default,
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1,
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Seniority:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {job.seniority}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Employment Type:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {job.employmentType}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: "1rem" }}>
                Activity Timeline
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {job.activities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <Box key={activity.id}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <ActivityIcon type={activity.type} Icon={Icon} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {activity.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.date}
                          </Typography>
                        </Box>
                      </Box>
                      {index < job.activities.length - 1 && (
                        <Box
                          sx={{
                            ml: 2,
                            mt: 2,
                            width: 2,
                            height: 24,
                            bgcolor: theme.palette.divider,
                          }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>

          {/* Related Emails */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <Mail size={18} color={theme.palette.text.secondary} />
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  Related Emails ({job.emails.length})
                </Typography>
              </Box>
              {job.emails.map((email) => (
                <EmailCard key={email.id} email={email} />
              ))}
            </CardContent>
          </Card>
        </Box>

        {/* Right Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Quick Actions */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: "1rem" }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Update Status</InputLabel>
                  <Select label="Update Status" value={job.status}>
                    <MenuItem value="Not Applied">Not Applied</MenuItem>
                    <MenuItem value="Applied">Applied</MenuItem>
                    <MenuItem value="Interview">Interview</MenuItem>
                    <MenuItem value="Offer">Offer</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <InputLabel>Resume Version</InputLabel>
                  <Select label="Resume Version" value={job.resumeVersion}>
                    <MenuItem value="Frontend-Focused Resume">Frontend-Focused Resume</MenuItem>
                    <MenuItem value="Full-Stack Resume">Full-Stack Resume</MenuItem>
                    <MenuItem value="General Resume">General Resume</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          {/* Original Description */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: "1rem" }}>
                Original Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.originalDescription}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
