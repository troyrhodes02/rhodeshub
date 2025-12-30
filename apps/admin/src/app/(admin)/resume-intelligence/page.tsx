"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Plus,
  FileText,
  Eye,
  Pencil,
  Trash2,
  X,
  Upload,
  Target,
  Sparkles,
  Info,
  AlertCircle,
  Zap,
  TrendingUp,
  CheckCircle2,
  ThumbsUp,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock resume data
const mockResumes = [
  {
    id: "1",
    title: "General Software Engineer Resume",
    skills: ["Full-Stack", "React", "Node.js"],
    status: "Processed",
  },
  {
    id: "2",
    title: "Frontend-Focused Resume",
    skills: ["React", "TypeScript", "UI/UX"],
    status: "Processed",
  },
  {
    id: "3",
    title: "Full-Stack TypeScript Resume",
    skills: ["TypeScript", "Full-Stack", "Cloud"],
    status: "Processed",
  },
  {
    id: "4",
    title: "AI/ML Engineering Resume",
    skills: ["Python", "ML", "AI"],
    status: "Processed",
  },
  {
    id: "5",
    title: "Backend Systems Resume",
    skills: ["Backend", "Distributed Systems", "Go"],
    status: "Processed",
  },
];

// Tab Panel Component
function TabPanel({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Add Resume Dialog Component
function AddResumeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handleSave = () => {
    // Would save resume
    setTitle("");
    setTags("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add New Resume
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X size={18} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload a resume. Processing is automatic.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Resume Title"
            placeholder="e.g., Full-Stack Software Engineer"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Tags (comma separated)"
            placeholder="TypeScript, React, Node.js"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Upload File
            </Typography>
            <Box
              sx={{
                border: `2px dashed ${theme.palette.secondary.main}`,
                borderRadius: 2,
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: `${theme.palette.secondary.main}08`,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: `${theme.palette.secondary.main}14`,
                },
              }}
            >
              <Upload size={32} color={theme.palette.text.secondary} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Click to upload or drag and drop
              </Typography>
              <Typography variant="caption" color="text.secondary">
                PDF, DOCX up to 5MB
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} sx={{ textTransform: "none" }}>
          Save Resume
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Analysis Results Dialog Component
function AnalysisResultsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const theme = useTheme();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expandedSections.includes(section);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Sparkles size={20} color={theme.palette.primary.main} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Analysis Results
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <X size={18} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          AI-powered resume analysis for the provided job description.
        </Typography>

        {/* Overall Fit Score */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              89
            </Typography>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Best Match: Full-Stack Software Engineer
              </Typography>
              <Chip
                label="Confidence: 92%"
                size="small"
                sx={{
                  bgcolor: `${theme.palette.secondary.main}1A`,
                  color: theme.palette.secondary.main,
                  fontWeight: 500,
                  mt: 0.5,
                }}
              />
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Overall Fit Score
          </Typography>
        </Box>

        {/* Summary */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          This resume aligns strongly with the role based on skill coverage, experience depth, and
          domain relevance. The candidate demonstrates expertise in the required tech stack and has
          relevant SaaS development experience.
        </Typography>

        {/* Scoring Profile */}
        <Box
          sx={{
            p: 2,
            bgcolor: theme.palette.background.default,
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Info size={16} color={theme.palette.text.secondary} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Scoring Profile: Auto-selected
            </Typography>
          </Box>
          <Chip
            label="Skill-heavy + Experience-weighted"
            size="small"
            sx={{
              bgcolor: `${theme.palette.primary.main}14`,
              color: theme.palette.primary.main,
              fontWeight: 500,
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            Selected due to high explicit skill density and senior-level responsibility indicators
            in the job description.
          </Typography>
        </Box>

        {/* Collapsible Sections */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Resume Ranking */}
          <Card
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              cursor: "pointer",
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
            onClick={() => toggleSection("ranking")}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TrendingUp size={18} color={theme.palette.text.secondary} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Resume Ranking
                  </Typography>
                </Box>
                {isExpanded("ranking") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Box>
              {isExpanded("ranking") && (
                <Box sx={{ mt: 3 }}>
                  {/* Resume #1 */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        #1 Frontend-Focused Resume
                      </Typography>
                      <Chip
                        label="88%"
                        size="small"
                        sx={{
                          bgcolor: `${theme.palette.secondary.main}1A`,
                          color: theme.palette.secondary.main,
                          fontWeight: 600,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Overall score: 92
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Semantic
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          89%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={89}
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          bgcolor: `${theme.palette.secondary.main}1A`,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.secondary.main,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        Skills: 95%
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Experience
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          85%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={85}
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          bgcolor: `${theme.palette.secondary.main}1A`,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.secondary.main,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        Domain: 90%
                      </Typography>
                    </Box>
                  </Box>

                  {/* Resume #2 */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        #2 General Software Engineer Resume
                      </Typography>
                      <Chip
                        label="82%"
                        size="small"
                        sx={{
                          bgcolor: `${theme.palette.warning.main}1A`,
                          color: theme.palette.warning.main,
                          fontWeight: 600,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Overall score: 78
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Semantic
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          75%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={75}
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          bgcolor: `${theme.palette.warning.main}1A`,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.warning.main,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        Skills: 80%
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Experience
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          72%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={72}
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          bgcolor: `${theme.palette.warning.main}1A`,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.warning.main,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        Domain: 78%
                      </Typography>
                    </Box>
                  </Box>

                  {/* Resume #3 */}
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        #3 Full-Stack TypeScript Resume
                      </Typography>
                      <Chip
                        label="79%"
                        size="small"
                        sx={{
                          bgcolor: `${theme.palette.error.main}1A`,
                          color: theme.palette.error.main,
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        label="Below threshold"
                        size="small"
                        sx={{
                          bgcolor: `${theme.palette.error.main}1A`,
                          color: theme.palette.error.main,
                          fontWeight: 500,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Overall score: 74
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Semantic
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          72%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={72}
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          bgcolor: `${theme.palette.warning.main}1A`,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.warning.main,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        Skills: 78%
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Experience
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          68%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={68}
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          bgcolor: `${theme.palette.warning.main}1A`,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.warning.main,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        Domain: 75%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Evidence & Grounded Context */}
          <Card
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              cursor: "pointer",
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
            onClick={() => toggleSection("evidence")}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Info size={18} color={theme.palette.text.secondary} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Evidence & Grounded Context
                  </Typography>
                </Box>
                {isExpanded("evidence") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Box>
              {isExpanded("evidence") && (
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Retrieved Resume Context
                      </Typography>
                      <Chip
                        label="RAG-Powered"
                        size="small"
                        sx={{
                          bgcolor: `${theme.palette.primary.main}14`,
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      These snippets were semantically retrieved from the top-ranked resume and used
                      to ground the AI&apos;s analysis.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Why This Resume Ranked Highest
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This resume demonstrates strong alignment with the frontend engineering
                      requirements. The candidate has extensive React and TypeScript experience,
                      matching 95% of required skills. The component library and design system
                      experience directly relates to the role&apos;s focus on UI development.
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Retrieved Resume Snippets Used for Analysis
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Card
                        sx={{
                          bgcolor: theme.palette.background.default,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1, display: "block" }}
                          >
                            Chunk #1
                          </Typography>
                          <Typography variant="body2">
                            UI Engineer at DesignLab - Built component libraries and design
                            systems...
                          </Typography>
                        </CardContent>
                      </Card>
                      <Card
                        sx={{
                          bgcolor: theme.palette.background.default,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1, display: "block" }}
                          >
                            Chunk #2
                          </Typography>
                          <Typography variant="body2">
                            React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Figma...
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 2, display: "block" }}
                    >
                      These snippets were retrieved from the resume using semantic search and used
                      to ground the AI&apos;s explanation, ensuring transparent and verifiable
                      analysis.
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Gap Analysis */}
          <Card
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              cursor: "pointer",
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
            onClick={() => toggleSection("gap")}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AlertCircle size={18} color={theme.palette.text.secondary} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Gap Analysis
                  </Typography>
                </Box>
                {isExpanded("gap") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Box>
              {isExpanded("gap") && (
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
                      Missing or Weak Skills
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {[
                        "GraphQL",
                        "Next.js",
                        "Design Systems",
                        "Storybook",
                        "Web Accessibility (WCAG)",
                      ].map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          sx={{
                            bgcolor: `${theme.palette.error.main}1A`,
                            color: theme.palette.error.main,
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
                      Suggested Focus Areas
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Add specific metrics for UI performance improvements
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Highlight any accessibility work or certifications
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Include examples of design system contributions
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Mention any experience with component documentation
                        </Typography>
                      </li>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Suggested Resume Improvements */}
          <Card
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              cursor: "pointer",
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
            onClick={() => toggleSection("improvements")}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Zap size={18} color={theme.palette.text.secondary} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Suggested Resume Improvements
                  </Typography>
                </Box>
                {isExpanded("improvements") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Box>
              {isExpanded("improvements") && (
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
                      Project Impact Bullets
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Led development of a design system used by 50+ engineers, reducing UI
                          inconsistencies by 80%
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Built accessibility-first components achieving WCAG 2.1 AA compliance
                          across the platform
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Implemented performance monitoring reducing Core Web Vitals LCP by 40%
                        </Typography>
                      </li>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
                      Tech Stack Bullets
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Proficient in React 18 with concurrent features and Suspense patterns
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Experience with CSS-in-JS solutions (Styled Components, Emotion) and
                          utility-first CSS (Tailwind)
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Built reusable component libraries with TypeScript generics for type-safe
                          props
                        </Typography>
                      </li>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
                      Leadership Bullets
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Mentored 3 junior developers on React best practices and code review
                          standards
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Led frontend architecture discussions for a team of 8 engineers
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2" color="text.secondary">
                          Established testing culture increasing code coverage from 40% to 85%
                        </Typography>
                      </li>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Add to Job Applications */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: `${theme.palette.secondary.main}08`,
            borderRadius: 1,
            border: `1px solid ${theme.palette.secondary.main}33`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <ThumbsUp size={18} color={theme.palette.secondary.main} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Good fit! Decided to apply?
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
            Track this opportunity in your Job Applications with all the details pre-filled.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Send size={18} />}
            sx={{
              textTransform: "none",
              bgcolor: theme.palette.secondary.main,
              "&:hover": {
                bgcolor: theme.palette.secondary.dark,
              },
            }}
          >
            Add to Job Applications
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function ResumeIntelligencePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeTab, setActiveTab] = useState(0);
  const [addResumeOpen, setAddResumeOpen] = useState(false);
  const [analysisResultsOpen, setAnalysisResultsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeSelection, setResumeSelection] = useState("all");

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
            Resume Intelligence
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
            AI-powered resume analysis with automatic optimization.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => setAddResumeOpen(true)}
          sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
        >
          Add Resume
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 48,
            },
          }}
        >
          <Tab icon={<FileText size={18} />} iconPosition="start" label="Resumes" sx={{ gap: 1 }} />
          <Tab
            icon={<Target size={18} />}
            iconPosition="start"
            label="Analyze Job"
            sx={{ gap: 1 }}
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        {/* Resumes List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {mockResumes.map((resume) => (
            <Card
              key={resume.id}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.75 }}>
                      <FileText size={18} color={theme.palette.text.secondary} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                        {resume.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.75, fontSize: "0.8rem" }}
                    >
                      {resume.skills.join(" • ")}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}
                    >
                      <Chip
                        label={resume.status}
                        size="small"
                        sx={{
                          bgcolor: `${theme.palette.secondary.main}1A`,
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          height: 22,
                          fontSize: "0.7rem",
                        }}
                      />
                      {resume.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            height: 22,
                            bgcolor: theme.palette.background.default,
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.75 }}>
                    <IconButton size="small">
                      <Eye size={16} />
                    </IconButton>
                    <IconButton size="small">
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        {/* Analyze Job */}
        <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
          <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5 }}>
              <Target size={18} color={theme.palette.primary.main} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                Analyze Job
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2.5, fontSize: "0.85rem" }}
            >
              Paste a job description for full AI-powered analysis.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                label="Job Description"
                placeholder="Paste the full job description here..."
                fullWidth
                multiline
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.25, fontSize: "0.85rem" }}>
                  Resume Selection
                </Typography>
                <FormControl>
                  <RadioGroup
                    value={resumeSelection}
                    onChange={(e) => setResumeSelection(e.target.value)}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio size="small" />}
                      label="Use all resumes"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                startIcon={<Sparkles size={16} />}
                onClick={() => setAnalysisResultsOpen(true)}
                disabled={!jobDescription.trim()}
                sx={{
                  textTransform: "none",
                  fontSize: "0.875rem",
                  py: 0.75,
                  alignSelf: "flex-start",
                }}
              >
                Run Full Analysis
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Last Analysis Card */}
        <Card
          sx={{
            mt: 3,
            border: `1px solid ${theme.palette.divider}`,
            cursor: "pointer",
            "&:hover": {
              borderColor: theme.palette.primary.main,
            },
          }}
          onClick={() => setAnalysisResultsOpen(true)}
        >
          <CardContent sx={{ p: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: `${theme.palette.primary.main}14`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  89
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    Last Analysis: Full-Stack Software Engineer
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                    Click to view full results
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                startIcon={<Eye size={16} />}
                sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setAnalysisResultsOpen(true);
                }}
              >
                View Results
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Modals */}
      <AddResumeDialog open={addResumeOpen} onClose={() => setAddResumeOpen(false)} />
      <AnalysisResultsDialog
        open={analysisResultsOpen}
        onClose={() => setAnalysisResultsOpen(false)}
      />
    </Box>
  );
}
