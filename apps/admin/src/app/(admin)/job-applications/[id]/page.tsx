"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  ChevronLeft,
  ExternalLink,
  Pencil,
  Trash2,
  Calendar,
  Mail,
  Clock,
  CheckCircle2,
  FileText,
  History,
  User,
  Bot,
} from "lucide-react";

// API response types
interface LinkedEmail {
  id: string;
  subject: string;
  from: string;
  preview: string;
  receivedAt: string;
}

interface StatusAudit {
  id: string;
  previousStatus: "APPLIED" | "INTERVIEW" | "REJECTED" | "OFFER" | null;
  newStatus: "APPLIED" | "INTERVIEW" | "REJECTED" | "OFFER";
  source: "MANUAL" | "AUTOMATED";
  reason: string;
  emailMessageId: string | null;
  createdAt: string;
}

interface JobApplicationDetail {
  id: string;
  company: string;
  role: string;
  link: string;
  dateApplied: string;
  status: "APPLIED" | "INTERVIEW" | "REJECTED" | "OFFER";
  statusSource: "MANUAL" | "AUTOMATED";
  statusOverriddenAt: string | null;
  createdAt: string;
  updatedAt: string;
  emails: LinkedEmail[];
  statusAudits: StatusAudit[];
}

// Timeline event type
interface TimelineEvent {
  id: string;
  type: "applied" | "status" | "email";
  title: string;
  description: string;
  date: Date;
  dateDisplay: string;
}

// Helper to format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US");
}

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US");
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

// Activity Icon Component
function ActivityIcon({ type }: { type: string }) {
  const theme = useTheme();
  const iconColors: Record<string, string> = {
    email: theme.palette.secondary.main,
    status: theme.palette.primary.main,
    applied: theme.palette.secondary.main,
  };

  const Icon = type === "email" ? Mail : type === "status" ? Clock : CheckCircle2;

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
function EmailCard({ email }: { email: LinkedEmail }) {
  const theme = useTheme();
  const router = useRouter();

  const handleClick = () => {
    // Navigate to Job Inbox with email ID to auto-expand
    router.push(`/job-inbox?email=${email.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        mb: 2,
        cursor: "pointer",
        "&:hover": {
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                {formatDate(email.receivedAt)}
              </Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, fontSize: "0.85rem" }}>
              {email.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
              {email.preview}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function JobApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const theme = useTheme();
  const router = useRouter();
  const { id } = use(params);
  const [job, setJob] = useState<JobApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isSavingStatus, setIsSavingStatus] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/admin/job-applications/${id}`);
        if (res.ok) {
          const data: JobApplicationDetail = await res.json();
          setJob(data);
          setSelectedStatus(data.status);
        } else if (res.status === 404) {
          router.push("/job-applications");
        }
      } catch (err) {
        console.error("Failed to fetch job application:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id, router]);

  // Handle manual status override
  const handleSaveStatus = async () => {
    if (!job || selectedStatus === job.status || isSavingStatus) return;

    setIsSavingStatus(true);
    try {
      const res = await fetch(`/api/admin/job-applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (res.ok) {
        // Refetch job to get updated data and audits
        const updatedRes = await fetch(`/api/admin/job-applications/${id}`);
        if (updatedRes.ok) {
          const updatedData: JobApplicationDetail = await updatedRes.json();
          setJob(updatedData);
          setSelectedStatus(updatedData.status);
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsSavingStatus(false);
    }
  };

  // Build timeline from job data
  const buildTimeline = (job: JobApplicationDetail): TimelineEvent[] => {
    const events: TimelineEvent[] = [];

    // Add application event
    events.push({
      id: "applied",
      type: "applied",
      title: "Application submitted",
      description: `Applied for ${job.role} at ${job.company}`,
      date: new Date(job.dateApplied),
      dateDisplay: formatDateTime(job.dateApplied),
    });

    // Add status update if updatedAt differs from dateApplied
    const dateApplied = new Date(job.dateApplied);
    const updatedAt = new Date(job.updatedAt);
    if (updatedAt.getTime() - dateApplied.getTime() > 60000) {
      // More than 1 minute difference
      events.push({
        id: "status",
        type: "status",
        title: `Status: ${getStatusLabel(job.status)}`,
        description: `Application status updated`,
        date: updatedAt,
        dateDisplay: formatDateTime(job.updatedAt),
      });
    }

    // Add email events
    for (const email of job.emails) {
      events.push({
        id: `email-${email.id}`,
        type: "email",
        title: email.subject,
        description: `Email from ${email.from}`,
        date: new Date(email.receivedAt),
        dateDisplay: formatDateTime(email.receivedAt),
      });
    }

    // Sort by date descending (most recent first)
    events.sort((a, b) => b.date.getTime() - a.date.getTime());

    return events;
  };

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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!job) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Job application not found.
        </Typography>
      </Box>
    );
  }

  const statusColors = getStatusColor(job.status);
  const timeline = buildTimeline(job);

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
                {job.role}
              </Typography>
              <Chip
                label={getStatusLabel(job.status)}
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
                <Calendar size={16} color={theme.palette.text.secondary} />
                <Typography variant="body2" color="text.secondary">
                  Applied {formatDate(job.dateApplied)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ExternalLink size={16} />}
              component="a"
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
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
          {/* Activity Timeline */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: "1rem" }}>
                Activity Timeline
              </Typography>
              {timeline.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No activity yet.
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {timeline.map((event, index) => (
                    <Box key={event.id}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <ActivityIcon type={event.type} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {event.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {event.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {event.dateDisplay}
                          </Typography>
                        </Box>
                      </Box>
                      {index < timeline.length - 1 && (
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
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Related Emails */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <Mail size={18} color={theme.palette.text.secondary} />
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  Linked Emails ({job.emails.length})
                </Typography>
              </Box>
              {job.emails.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No emails linked to this application.
                </Typography>
              ) : (
                job.emails.map((email) => <EmailCard key={email.id} email={email} />)
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Right Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Manual Status Override */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: "1rem" }}>
                Manual Status Override
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    disabled={isSavingStatus}
                  >
                    <MenuItem value="APPLIED">Applied</MenuItem>
                    <MenuItem value="INTERVIEW">Interview</MenuItem>
                    <MenuItem value="OFFER">Offer</MenuItem>
                    <MenuItem value="REJECTED">Rejected</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={handleSaveStatus}
                  disabled={selectedStatus === job.status || isSavingStatus}
                  sx={{ textTransform: "none" }}
                >
                  {isSavingStatus ? "Saving..." : "Save Override"}
                </Button>
                {/* Status source indicator */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
                  {job.statusSource === "MANUAL" ? (
                    <User size={14} color={theme.palette.text.secondary} />
                  ) : (
                    <Bot size={14} color={theme.palette.text.secondary} />
                  )}
                  <Typography variant="caption" color="text.secondary">
                    {job.statusSource === "MANUAL" ? "Manual override" : "Set by automation"}
                    {job.statusOverriddenAt && (
                      <> on {formatDateTime(job.statusOverriddenAt)}</>
                    )}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Job Link */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: "1rem" }}>
                Job Listing
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  wordBreak: "break-all",
                }}
              >
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.palette.primary.main }}
                >
                  {job.link}
                </a>
              </Typography>
            </CardContent>
          </Card>

          {/* Status History */}
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <History size={18} color={theme.palette.text.secondary} />
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  Status History
                </Typography>
              </Box>
              {job.statusAudits.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No status changes recorded.
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {job.statusAudits.map((audit) => (
                    <Box
                      key={audit.id}
                      sx={{
                        p: 1.25,
                        borderRadius: 1,
                        bgcolor: theme.palette.background.default,
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                        {audit.source === "MANUAL" ? (
                          <User size={12} color={theme.palette.text.secondary} />
                        ) : (
                          <Bot size={12} color={theme.palette.text.secondary} />
                        )}
                        <Typography variant="caption" color="text.secondary">
                          {audit.source === "MANUAL" ? "Manual" : "Automated"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
                          {formatDateTime(audit.createdAt)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                        {audit.previousStatus ? getStatusLabel(audit.previousStatus) : "—"} →{" "}
                        <strong>{getStatusLabel(audit.newStatus)}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {audit.reason}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
