"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  Filter,
  Settings,
  Mail,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle2,
  Unlink,
  AlertTriangle,
  Building2,
  Briefcase,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Extracted signals shape from API
interface ExtractedDate {
  iso: string;
  raw: string;
  kind: "interview" | "deadline" | "start" | "other";
}

interface ExtractedSignals {
  company: string | null;
  role: string | null;
  dates: ExtractedDate[];
  nextStepIndicators: string[];
}

// EmailMessage shape from API (with jobApplication and classification fields)
interface JobApplicationMinimal {
  id: string;
  company: string;
  role: string;
}

interface EmailMessageFromApi {
  id: string;
  externalId: string;
  from: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  createdAt: string;
  updatedAt: string;
  jobApplicationId: string | null;
  jobApplication: JobApplicationMinimal | null;
  // Classification fields (persisted)
  classificationLabel: string;
  classificationConfidence: number | null;
  extractedSignals: ExtractedSignals | null;
  classifiedAt: string | null;
}

// UI email shape (with display-only fields)
interface DisplayEmail {
  id: string;
  type: string; // Display-friendly label (e.g., "Confirmation")
  typeRaw: string; // Raw enum value from DB (e.g., "CONFIRMATION")
  confidence: number | null;
  company: string;
  date: string;
  subject: string;
  from: string;
  to: string;
  preview: string;
  linkedJob: string;
  linkedJobId: string | null;
  body: string;
  timestamp: string;
  needsReview: boolean;
  extractedSignals: ExtractedSignals | null;
  classifiedAt: string | null;
}

// Job application list item for dropdown
interface JobApplicationOption {
  id: string;
  company: string;
  role: string;
}

// Map Prisma enum values to display-friendly strings
function mapEnumToDisplayLabel(label: string): string {
  switch (label) {
    case "OFFER":
      return "Offer";
    case "REJECTION":
      return "Rejection";
    case "INTERVIEW":
      return "Interview";
    case "CONFIRMATION":
      return "Confirmation";
    case "UNCLASSIFIED":
    default:
      return "Unclassified";
  }
}

// Helper to extract company name from email address (fallback only)
function extractCompanyFromEmail(email: string): string {
  const match = email.match(/@([^.]+)/);
  if (match && match[1]) {
    const domain = match[1].toLowerCase();
    const genericDomains = ["gmail", "yahoo", "outlook", "hotmail", "icloud", "aol", "mail"];
    if (!genericDomains.includes(domain)) {
      return domain.charAt(0).toUpperCase() + domain.slice(1);
    }
  }
  return "Unknown";
}

// Helper to format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US");
}

// Helper to format timestamp for display
function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US");
}

// Map API EmailMessage to display shape
function mapEmailToDisplay(email: EmailMessageFromApi): DisplayEmail {
  const linkedJob = email.jobApplication
    ? `${email.jobApplication.company} — ${email.jobApplication.role}`
    : "Not linked";

  // Use extracted signals company if available, otherwise fallback to email domain
  const company = email.extractedSignals?.company || extractCompanyFromEmail(email.from);

  return {
    id: email.id,
    type: mapEnumToDisplayLabel(email.classificationLabel),
    typeRaw: email.classificationLabel,
    confidence: email.classificationConfidence,
    company,
    date: formatDate(email.receivedAt),
    subject: email.subject,
    from: email.from,
    to: email.to,
    preview: email.preview,
    linkedJob,
    linkedJobId: email.jobApplicationId,
    body: email.body,
    timestamp: formatTimestamp(email.receivedAt),
    needsReview: false,
    extractedSignals: email.extractedSignals,
    classifiedAt: email.classifiedAt,
  };
}

// Filter options
const filterOptions = ["All", "Unclassified", "Confirmation", "Interview", "Offer", "Rejection"];

// Summary Card Component
function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: "primary" | "success" | "error" | "default";
}) {
  const theme = useTheme();
  const colorMap: Record<string, string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.secondary.main,
    error: theme.palette.error.main,
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

// Extracted Signals Display Component
function ExtractedSignalsDisplay({ signals }: { signals: ExtractedSignals | null }) {
  const theme = useTheme();

  if (!signals) {
    return (
      <Box sx={{ py: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
          No extracted signals available. Run analysis via API to populate.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
      }}
    >
      {/* Company */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Building2 size={16} color={theme.palette.text.secondary} style={{ marginTop: 2 }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            Company
          </Typography>
          <Typography variant="body2">{signals.company || "—"}</Typography>
        </Box>
      </Box>

      {/* Role */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Briefcase size={16} color={theme.palette.text.secondary} style={{ marginTop: 2 }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            Role
          </Typography>
          <Typography variant="body2">{signals.role || "—"}</Typography>
        </Box>
      </Box>

      {/* Dates */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Calendar size={16} color={theme.palette.text.secondary} style={{ marginTop: 2 }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            Dates
          </Typography>
          {signals.dates.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
              {signals.dates.map((d, i) => (
                <Chip
                  key={i}
                  label={`${d.iso} (${d.kind})`}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    bgcolor: theme.palette.background.default,
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2">—</Typography>
          )}
        </Box>
      </Box>

      {/* Next Steps */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <ArrowRight size={16} color={theme.palette.text.secondary} style={{ marginTop: 2 }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            Next Steps
          </Typography>
          {signals.nextStepIndicators.length > 0 ? (
            <Typography variant="body2">{signals.nextStepIndicators.join(", ")}</Typography>
          ) : (
            <Typography variant="body2">—</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// Email Card Component
function EmailCard({
  email,
  jobOptions,
  onLinkChange,
  initialExpanded = false,
}: {
  email: DisplayEmail;
  jobOptions: JobApplicationOption[];
  onLinkChange: (emailId: string, jobApplicationId: string | null) => Promise<void>;
  initialExpanded?: boolean;
}) {
  const theme = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(initialExpanded);
  const [selectedJobId, setSelectedJobId] = useState<string>(email.linkedJobId || "");
  const [isLinking, setIsLinking] = useState(false);

  // Scroll into view if initially expanded (navigated from job detail)
  useEffect(() => {
    if (initialExpanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [initialExpanded]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Confirmation":
        return { bg: `${theme.palette.primary.main}1A`, color: theme.palette.primary.main };
      case "Interview":
      case "Offer":
        return { bg: `${theme.palette.secondary.main}1A`, color: theme.palette.secondary.main };
      case "Rejection":
        return { bg: `${theme.palette.error.main}1A`, color: theme.palette.error.main };
      default:
        return { bg: `${theme.palette.text.secondary}1A`, color: theme.palette.text.secondary };
    }
  };

  const typeColors = getTypeColor(email.type);

  // Format confidence as percentage
  const confidenceDisplay =
    email.confidence !== null ? `${Math.round(email.confidence * 100)}%` : null;

  const handleLinkChange = async (newJobId: string) => {
    setIsLinking(true);
    setSelectedJobId(newJobId);
    const jobIdOrNull = newJobId === "" ? null : newJobId;
    await onLinkChange(email.id, jobIdOrNull);
    setIsLinking(false);
  };

  const handleUnlink = async () => {
    setIsLinking(true);
    setSelectedJobId("");
    await onLinkChange(email.id, null);
    setIsLinking(false);
  };

  return (
    <>
      <Card
        ref={cardRef}
        onClick={() => setExpanded(!expanded)}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          mb: expanded ? 2 : 2,
          cursor: "pointer",
          "&:hover": {
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
          {/* Header Row */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 0.75,
              mb: 1.5,
            }}
          >
            {/* Classification Label Chip */}
            <Chip
              label={email.type}
              size="small"
              sx={{
                bgcolor: typeColors.bg,
                color: typeColors.color,
                fontWeight: 500,
                height: 22,
                fontSize: "0.7rem",
              }}
            />
            {/* Confidence Indicator */}
            {confidenceDisplay && (
              <Chip
                label={confidenceDisplay}
                size="small"
                sx={{
                  bgcolor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                  fontWeight: 500,
                  height: 22,
                  fontSize: "0.65rem",
                }}
              />
            )}
            {email.needsReview && (
              <Chip
                icon={<AlertTriangle size={12} />}
                label="Needs review"
                size="small"
                sx={{
                  bgcolor: `${theme.palette.warning.main}1A`,
                  color: theme.palette.warning.main,
                  fontWeight: 500,
                  height: 22,
                  fontSize: "0.7rem",
                }}
              />
            )}
            <Chip
              icon={<LinkIcon size={12} />}
              label={email.linkedJobId ? email.linkedJob : email.company}
              size="small"
              sx={{
                fontSize: "0.7rem",
                height: 22,
                bgcolor: email.linkedJobId
                  ? `${theme.palette.secondary.main}1A`
                  : theme.palette.background.default,
                border: `1px solid ${email.linkedJobId ? theme.palette.secondary.main : theme.palette.divider}`,
                color: email.linkedJobId ? theme.palette.secondary.main : undefined,
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: "auto", fontSize: "0.7rem" }}
            >
              {email.date}
            </Typography>
            <Box sx={{ ml: { xs: 0, sm: 0.75 }, color: theme.palette.text.secondary }}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Box>
          </Box>

          {/* Subject */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.75, fontSize: "0.95rem" }}>
            {email.subject}
          </Typography>

          {/* From */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75, fontSize: "0.8rem" }}>
            From: {email.from}
          </Typography>

          {/* Preview */}
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            {email.preview}
          </Typography>
        </CardContent>
      </Card>

      {/* Expanded Content - Separate Card Below */}
      {expanded && (
        <Card
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            mb: 2,
            ml: { xs: 2, sm: 3 },
            borderRadius: 1,
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
            {/* Email Details Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 3,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  From:
                </Typography>
                <Typography variant="body2">{email.from}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  To:
                </Typography>
                <Typography variant="body2">{email.to}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Date:
                </Typography>
                <Typography variant="body2">{email.timestamp}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Linked Job:
                </Typography>
                <Typography variant="body2">{email.linkedJob}</Typography>
              </Box>
            </Box>

            {/* Extracted Signals Section */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}
              >
                Extracted Signals
                {email.classifiedAt && (
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 400 }}
                  >
                    (analyzed {formatTimestamp(email.classifiedAt)})
                  </Typography>
                )}
              </Typography>
              <ExtractedSignalsDisplay signals={email.extractedSignals} />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Manual Job Link Dropdown */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                Link to Job Application:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <FormControl size="small" sx={{ minWidth: 250 }}>
                  <Select
                    value={selectedJobId}
                    onChange={(e) => handleLinkChange(e.target.value)}
                    displayEmpty
                    disabled={isLinking}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MenuItem value="">
                      <em>Not linked</em>
                    </MenuItem>
                    {jobOptions.map((job) => (
                      <MenuItem key={job.id} value={job.id}>
                        {job.company} — {job.role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {email.linkedJobId && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnlink();
                    }}
                    disabled={isLinking}
                    color="error"
                    title="Unlink"
                  >
                    <Unlink size={16} />
                  </IconButton>
                )}
                {isLinking && <CircularProgress size={16} />}
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {email.body}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}

// Settings Dialog Component
function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const theme = useTheme();
  const [email, setEmail] = useState("william.jobs@example.com");
  const [provider, setProvider] = useState("Gmail");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Job Inbox Settings
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X size={18} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Configure your email inbox connection
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Job Application Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Email Provider</InputLabel>
            <Select
              label="Email Provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              <MenuItem value="Gmail">Gmail</MenuItem>
              <MenuItem value="Outlook">Outlook</MenuItem>
              <MenuItem value="Yahoo">Yahoo</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Connection Status
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: theme.palette.secondary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.secondary.contrastText,
                }}
              >
                <CheckCircle2 size={14} />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Connected and syncing
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Close
        </Button>
        <Button variant="contained" onClick={onClose} sx={{ textTransform: "none" }}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function JobInboxPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const searchParams = useSearchParams();
  const highlightEmailId = searchParams.get("email");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [emails, setEmails] = useState<DisplayEmail[]>([]);
  const [jobOptions, setJobOptions] = useState<JobApplicationOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMatching, setIsMatching] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch emails and job applications
  const fetchData = async () => {
    try {
      const [emailsRes, jobsRes] = await Promise.all([
        fetch("/api/admin/job-inbox/messages"),
        fetch("/api/admin/job-applications"),
      ]);

      if (emailsRes.ok) {
        const emailData: EmailMessageFromApi[] = await emailsRes.json();
        setEmails(emailData.map(mapEmailToDisplay));
      }

      if (jobsRes.ok) {
        const jobData = await jobsRes.json();
        setJobOptions(
          jobData.map((j: { id: string; company: string; role: string }) => ({
            id: j.id,
            company: j.company,
            role: j.role,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || email.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Compute summary stats from loaded emails (using persisted labels)
  const summaryStats = {
    total: emails.length,
    confirmations: emails.filter((e) => e.type === "Confirmation").length,
    interviews: emails.filter((e) => e.type === "Interview").length,
    offers: emails.filter((e) => e.type === "Offer").length,
    rejections: emails.filter((e) => e.type === "Rejection").length,
  };

  // Match emails to jobs
  const handleMatchEmails = async () => {
    if (emails.length === 0 || isMatching) return;

    setIsMatching(true);

    try {
      const res = await fetch("/api/admin/job-inbox/match", {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();

        // Update emails with match results (mark ambiguous as needsReview)
        const updatedEmails = emails.map((email) => {
          const result = data.results.find(
            (r: { emailId: string; outcome: string }) => r.emailId === email.id
          );
          if (result) {
            if (result.outcome === "matched") {
              const job = jobOptions.find((j) => j.id === result.jobApplicationId);
              return {
                ...email,
                linkedJobId: result.jobApplicationId,
                linkedJob: job ? `${job.company} — ${job.role}` : "Linked",
                needsReview: false,
              };
            } else if (result.outcome === "ambiguous") {
              return { ...email, needsReview: true };
            }
          }
          return email;
        });

        setEmails(updatedEmails);
      }
    } catch (err) {
      console.error("Failed to match emails:", err);
    } finally {
      setIsMatching(false);
    }
  };

  // Analyze unclassified emails
  const handleAnalyzeUnclassified = async () => {
    if (isAnalyzing) return;

    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/admin/job-inbox/analyze", {
        method: "POST",
      });

      if (res.ok) {
        // Refresh the inbox to show updated classifications
        await fetchData();
      }
    } catch (err) {
      console.error("Failed to analyze emails:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle manual link change
  const handleLinkChange = async (emailId: string, jobApplicationId: string | null) => {
    try {
      const res = await fetch(`/api/admin/job-inbox/messages/${emailId}/link`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobApplicationId }),
      });

      if (res.ok) {
        const updatedEmail: EmailMessageFromApi = await res.json();

        // Update local state
        setEmails((prevEmails) =>
          prevEmails.map((email) => {
            if (email.id === emailId) {
              const linkedJob = updatedEmail.jobApplication
                ? `${updatedEmail.jobApplication.company} — ${updatedEmail.jobApplication.role}`
                : "Not linked";
              return {
                ...email,
                linkedJobId: updatedEmail.jobApplicationId,
                linkedJob,
                needsReview: false,
              };
            }
            return email;
          })
        );
      }
    } catch (err) {
      console.error("Failed to update email link:", err);
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
            Job Email Inbox
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
            View job-related emails with classification and extracted signals
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<Sparkles size={18} />}
            sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
            onClick={handleAnalyzeUnclassified}
            disabled={isAnalyzing || emails.length === 0}
          >
            {isAnalyzing ? "Classifying..." : "Classify Emails"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<LinkIcon size={18} />}
            sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
            onClick={handleMatchEmails}
            disabled={isMatching || emails.length === 0}
          >
            {isMatching ? "Matching..." : "Match Emails"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Settings size={18} />}
            onClick={() => setSettingsOpen(true)}
            sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
          >
            Settings
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(5, 1fr)" },
          gap: 1.5,
          mb: 2.5,
        }}
      >
        <SummaryCard label="Total Emails" value={summaryStats.total} />
        <SummaryCard label="Confirmations" value={summaryStats.confirmations} color="primary" />
        <SummaryCard label="Interviews" value={summaryStats.interviews} color="success" />
        <SummaryCard label="Offers" value={summaryStats.offers} color="success" />
        <SummaryCard label="Rejections" value={summaryStats.rejections} color="error" />
      </Box>

      {/* Search and Filter */}
      <Card sx={{ border: `1px solid ${theme.palette.divider}`, mb: 2.5 }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <TextField
              placeholder="Search by subject or sender..."
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
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
                startAdornment={<Filter size={16} style={{ marginRight: 8 }} />}
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Inbox Section */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Mail size={20} color={theme.palette.text.secondary} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Inbox ({filteredEmails.length} emails)
          </Typography>
        </Box>

        {loading ? (
          <Card sx={{ border: `1px solid ${theme.palette.divider}`, p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size={24} />
            </Box>
          </Card>
        ) : filteredEmails.length === 0 ? (
          <Card sx={{ border: `1px solid ${theme.palette.divider}`, p: 4 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              No emails found matching your search criteria.
            </Typography>
          </Card>
        ) : (
          <Box>
            {filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                jobOptions={jobOptions}
                onLinkChange={handleLinkChange}
                initialExpanded={email.id === highlightEmailId}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Box>
  );
}
