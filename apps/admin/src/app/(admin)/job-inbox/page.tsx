"use client";

import { useState, useEffect } from "react";
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
  Sparkles,
} from "lucide-react";

// EmailMessage shape from API
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
}

// UI email shape (with display-only fields)
interface DisplayEmail {
  id: string;
  type: string;
  company: string;
  date: string;
  subject: string;
  from: string;
  to: string;
  preview: string;
  linkedJob: string;
  body: string;
  timestamp: string;
}

// Helper to extract company name from email address
function extractCompanyFromEmail(email: string): string {
  const match = email.match(/@([^.]+)/);
  if (match && match[1]) {
    return match[1].charAt(0).toUpperCase() + match[1].slice(1);
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
  return {
    id: email.id,
    type: "Unclassified",
    company: extractCompanyFromEmail(email.from),
    date: formatDate(email.receivedAt),
    subject: email.subject,
    from: email.from,
    to: email.to,
    preview: email.preview,
    linkedJob: "Not linked",
    body: email.body,
    timestamp: formatTimestamp(email.receivedAt),
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

// Email Card Component
function EmailCard({ email }: { email: DisplayEmail }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

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

  return (
    <>
      <Card
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
            <Chip
              icon={<LinkIcon size={12} />}
              label={email.company}
              size="small"
              sx={{
                fontSize: "0.7rem",
                height: 22,
                bgcolor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`,
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
  const [connected, setConnected] = useState(true);

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [emails, setEmails] = useState<DisplayEmail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await fetch("/api/admin/job-inbox/messages");
        if (res.ok) {
          const data: EmailMessageFromApi[] = await res.json();
          setEmails(data.map(mapEmailToDisplay));
        }
      } catch (err) {
        console.error("Failed to fetch emails:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEmails();
  }, []);

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || email.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Compute summary stats from loaded emails
  const summaryStats = {
    total: emails.length,
    confirmations: emails.filter((e) => e.type === "Confirmation").length,
    interviews: emails.filter((e) => e.type === "Interview").length,
    offers: emails.filter((e) => e.type === "Offer").length,
    rejections: emails.filter((e) => e.type === "Rejection").length,
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
            View and classify job-related emails
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="contained"
            startIcon={<Sparkles size={18} />}
            sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
          >
            Classify Emails
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

        {filteredEmails.length === 0 ? (
          <Card sx={{ border: `1px solid ${theme.palette.divider}`, p: 4 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              No emails found matching your search criteria.
            </Typography>
          </Card>
        ) : (
          <Box>
            {filteredEmails.map((email) => (
              <EmailCard key={email.id} email={email} />
            ))}
          </Box>
        )}
      </Box>

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Box>
  );
}
