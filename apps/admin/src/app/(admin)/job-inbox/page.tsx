"use client";

import { useState } from "react";
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
} from "lucide-react";

// Mock email data
const mockEmails = [
  {
    id: "1",
    type: "Confirmation",
    company: "Stripe",
    date: "3/10/2024",
    subject: "Thank you for applying to Stripe",
    from: "recruiting@stripe.com",
    to: "william@example.com",
    preview: "Thank you for your interest in the Senior Frontend Engineer position...",
    linkedJob: "Senior Frontend Engineer at Stripe",
    body: `Hi William,

Thank you for your interest in the Senior Frontend Engineer position at Stripe.

We have received your application and our team is currently reviewing it. We receive many applications for each role, so this process may take some time.

If your background is a match for this role, a member of our recruiting team will reach out to you directly.

Best regards,
Stripe Recruiting Team`,
    timestamp: "3/10/2024, 11:00:00 AM",
  },
  {
    id: "2",
    type: "Interview",
    company: "Stripe",
    date: "3/18/2024",
    subject: "Interview Invitation - Senior Frontend Engineer at Stripe",
    from: "sarah@stripe.com",
    to: "william@example.com",
    preview: "We were impressed by your background and would like to invite you...",
    linkedJob: "Senior Frontend Engineer at Stripe",
    body: `Hi William,

We were impressed by your background and would like to invite you to interview for the Senior Frontend Engineer position at Stripe.

Please let us know your availability for the following dates:
- Monday, March 25th
- Wednesday, March 27th
- Friday, March 29th

Looking forward to speaking with you!

Best,
Sarah
Stripe Recruiting`,
    timestamp: "3/18/2024, 09:00:00 AM",
  },
  {
    id: "3",
    type: "Rejection",
    company: "Notion",
    date: "3/20/2024",
    subject: "Update on your application to Notion",
    from: "careers@notion.so",
    to: "william@example.com",
    preview:
      "After careful consideration, we have decided to move forward with other candidates...",
    linkedJob: "Full-Stack Engineer at Notion",
    body: `Hi William,

Thank you for your interest in the Full-Stack Engineer position at Notion.

After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.

We appreciate the time you took to apply and wish you the best in your job search.

Best regards,
Notion Careers Team`,
    timestamp: "3/20/2024, 02:30:00 PM",
  },
  {
    id: "4",
    type: "Offer",
    company: "Supabase",
    date: "3/22/2024",
    subject: "Offer Letter - Developer Experience Engineer at Supabase",
    from: "paul@supabase.com",
    to: "william@example.com",
    preview: "We are thrilled to extend an offer for the Developer Experience Engineer position...",
    linkedJob: "Developer Experience Engineer at Supabase",
    body: `Hi William,

We are thrilled to extend an offer for the Developer Experience Engineer position at Supabase!

We were impressed by your technical skills and passion for developer tools. We believe you would be a great addition to our team.

Please find the offer details attached. We look forward to hearing from you soon.

Best regards,
Paul
Supabase Team`,
    timestamp: "3/22/2024, 10:15:00 AM",
  },
  {
    id: "5",
    type: "Confirmation",
    company: "Vercel",
    date: "3/11/2024",
    subject: "Application Received - Software Engineer, Platform",
    from: "careers@vercel.com",
    to: "william@example.com",
    preview: "Thank you for applying to Vercel. We have received your application...",
    linkedJob: "Software Engineer, Platform at Vercel",
    body: `Hi William,

Thank you for applying to Vercel. We have received your application for the Software Engineer, Platform position.

Our team will review your application and get back to you within the next few weeks.

Best,
Vercel Careers`,
    timestamp: "3/11/2024, 03:45:00 PM",
  },
  {
    id: "6",
    type: "Interview",
    company: "Linear",
    date: "3/14/2024",
    subject: "Next Steps - Frontend Engineer Position",
    from: "hiring@linear.app",
    to: "william@example.com",
    preview: "We'd like to schedule a technical interview for the Frontend Engineer role...",
    linkedJob: "Frontend Engineer at Linear",
    body: `Hi William,

We'd like to schedule a technical interview for the Frontend Engineer role at Linear.

Please let us know your availability for next week.

Thanks,
Linear Hiring Team`,
    timestamp: "3/14/2024, 11:20:00 AM",
  },
];

// Summary stats
const summaryStats = {
  total: 6,
  confirmations: 2,
  interviews: 1,
  offers: 1,
  rejections: 1,
};

// Filter options
const filterOptions = ["All", "Confirmation", "Interview", "Offer", "Rejection"];

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
function EmailCard({ email }: { email: (typeof mockEmails)[0] }) {
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

  const filteredEmails = mockEmails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || email.type === filter;
    return matchesSearch && matchesFilter;
  });

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
        <Button
          variant="outlined"
          startIcon={<Settings size={18} />}
          onClick={() => setSettingsOpen(true)}
          sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
        >
          Settings
        </Button>
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
        <CardContent sx={{ p: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
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
