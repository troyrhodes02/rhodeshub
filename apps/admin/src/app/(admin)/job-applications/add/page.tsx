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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Link as LinkIcon,
  Sparkles,
  FileText,
  Pencil,
} from "lucide-react";

// Step definitions
const steps = [
  { id: 1, label: "Paste Job", icon: LinkIcon },
  { id: 2, label: "Parse Details", icon: Sparkles },
  { id: 3, label: "Review", icon: FileText },
];

// Form state type
interface JobFormData {
  jobUrl: string;
  jobDescription: string;
  title: string;
  company: string;
  location: string;
  source: string;
  seniority: string;
  employmentType: string;
  roleSummary: string;
  techStack: string[];
  skills: string[];
}

const initialFormData: JobFormData = {
  jobUrl: "",
  jobDescription: "",
  title: "",
  company: "",
  location: "",
  source: "LinkedIn",
  seniority: "",
  employmentType: "",
  roleSummary: "",
  techStack: [],
  skills: [],
};

// Tech stack options
const techStackOptions = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "GraphQL",
  "Go",
  "Rust",
  "Tailwind",
  "WebSockets",
  "Ruby",
  "Python",
];

// Skills options
const skillsOptions = [
  "Frontend Development",
  "API Design",
  "System Architecture",
  "Team Collaboration",
  "Agile/Scrum",
  "Performance Optimization",
];

// Stepper Component
function Stepper({
  currentStep,
  completedSteps,
}: {
  currentStep: number;
  completedSteps: number[];
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 0.75, sm: 1.5 },
        mb: 3,
      }}
    >
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.includes(step.id);
        const Icon = step.icon;

        return (
          <Box key={step.id} sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  width: { xs: 28, sm: 34 },
                  height: { xs: 28, sm: 34 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor:
                    isActive || isCompleted
                      ? theme.palette.primary.main
                      : theme.palette.background.paper,
                  border: `2px solid ${
                    isActive || isCompleted ? theme.palette.primary.main : theme.palette.divider
                  }`,
                  color:
                    isActive || isCompleted
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.secondary,
                }}
              >
                {isCompleted ? <Check size={16} /> : <Icon size={16} />}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.75,
                  fontSize: "0.75rem",
                  color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                  fontWeight: isActive ? 600 : 400,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {step.label}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: { xs: 32, sm: 68, md: 100 },
                  height: 2,
                  bgcolor: completedSteps.includes(step.id)
                    ? theme.palette.primary.main
                    : theme.palette.divider,
                  mx: { xs: 0.5, sm: 0.75 },
                  mt: { xs: 0, sm: -2.5 },
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

// Step 1: Paste Job
function PasteJobStep({
  formData,
  setFormData,
}: {
  formData: JobFormData;
  setFormData: (data: JobFormData) => void;
}) {
  const theme = useTheme();

  return (
    <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5 }}>
          <LinkIcon size={18} color={theme.palette.text.secondary} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
            Paste Job Listing
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: "0.85rem" }}>
          Provide the job URL and description. AI will extract all the details for you.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box>
            <FieldLabel label="Job URL" />
            <TextField
              placeholder="e.g., https://stripe.com/jobs/senior-frontend-engineer"
              fullWidth
              value={formData.jobUrl}
              onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                  height: "40px",
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiOutlinedInput-input": {
                  py: 1,
                },
              }}
            />
          </Box>
          <Box>
            <FieldLabel label="Job Description" required />
            <TextField
              placeholder="e.g., Paste the full job description here..."
              fullWidth
              multiline
              rows={8}
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Label component with optional asterisk
function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <Typography
      variant="body2"
      sx={{
        fontWeight: 500,
        mb: 0.75,
        fontSize: "0.875rem",
        color: "text.primary",
      }}
    >
      {label}
      {required && (
        <Box component="span" sx={{ color: "error.main", ml: 0.25 }}>
          *
        </Box>
      )}
    </Typography>
  );
}

// Step 2: Parse Details
function ParseDetailsStep({
  formData,
  setFormData,
  entryMode,
}: {
  formData: JobFormData;
  setFormData: (data: JobFormData) => void;
  entryMode: "ai" | "manual" | null;
}) {
  const theme = useTheme();

  const handleTechAdd = (tech: string) => {
    if (!formData.techStack.includes(tech)) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, tech],
      });
    }
  };

  const handleTechRemove = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    });
  };

  const handleSkillAdd = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const [newTech, setNewTech] = useState("");
  const [newSkill, setNewSkill] = useState("");

  return (
    <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5 }}>
          {entryMode === "ai" ? (
            <Sparkles size={18} color={theme.palette.primary.main} />
          ) : (
            <Pencil size={18} color={theme.palette.primary.main} />
          )}
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
            {entryMode === "ai" ? "AI Parsed Details" : "Enter Job Details"}
          </Typography>
          {entryMode === "ai" && (
            <Chip
              label="Editable"
              size="small"
              sx={{
                bgcolor: `${theme.palette.primary.main}14`,
                color: theme.palette.primary.main,
                fontWeight: 500,
                fontSize: "0.7rem",
                height: 22,
              }}
            />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: "0.85rem" }}>
          {entryMode === "ai"
            ? "Review and edit the extracted information as needed."
            : "Fill in the job details manually."}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* Row 1: Job Title | Company */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {/* Job Title */}
            <Box>
              <FieldLabel label="Job Title" required />
              <TextField
                fullWidth
                placeholder="e.g., Senior Frontend Engineer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    height: "40px",
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    py: 1,
                  },
                }}
              />
            </Box>

            {/* Company */}
            <Box>
              <FieldLabel label="Company" required />
              <TextField
                fullWidth
                placeholder="e.g., Stripe"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    height: "40px",
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    py: 1,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Row 2: Location | Job Link */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {/* Location */}
            <Box>
              <FieldLabel label="Location" />
              <TextField
                fullWidth
                placeholder="e.g., Remote (US)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    height: "40px",
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    py: 1,
                  },
                }}
              />
            </Box>

            {/* Job Link */}
            <Box>
              <FieldLabel label="Job Link" required />
              <TextField
                fullWidth
                placeholder="e.g., https://stripe.com/jobs/senior-frontend-engineer"
                value={formData.jobUrl}
                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    height: "40px",
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    py: 1,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Row 3: Source (full width) */}
          <Box>
            <FieldLabel label="Source" />
            <FormControl fullWidth>
              <Select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                displayEmpty
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                  height: "40px",
                  "& .MuiSelect-select": {
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                  },
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select source
                </MenuItem>
                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                <MenuItem value="BuiltIn">BuiltIn</MenuItem>
                <MenuItem value="Company Site">Company Site</MenuItem>
                <MenuItem value="Referral">Referral</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Row 4: Seniority Level | Employment Type */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {/* Seniority Level */}
            <Box>
              <FieldLabel label="Seniority Level" />
              <FormControl fullWidth>
                <Select
                  value={formData.seniority}
                  onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                  displayEmpty
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    height: "40px",
                    "& .MuiSelect-select": {
                      py: 1,
                      display: "flex",
                      alignItems: "center",
                    },
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select level
                  </MenuItem>
                  <MenuItem value="Entry-Level">Entry-Level</MenuItem>
                  <MenuItem value="Associate">Associate</MenuItem>
                  <MenuItem value="Mid">Mid</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                  <MenuItem value="Lead">Lead</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Employment Type */}
            <Box>
              <FieldLabel label="Employment Type" />
              <FormControl fullWidth>
                <Select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  displayEmpty
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    height: "40px",
                    "& .MuiSelect-select": {
                      py: 1,
                      display: "flex",
                      alignItems: "center",
                    },
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select type
                  </MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Role Summary - Full Width */}
          <Box>
            <FieldLabel label="Role Summary" />
            <TextField
              fullWidth
              placeholder="e.g., Brief summary of the role..."
              multiline
              rows={4}
              value={formData.roleSummary}
              onChange={(e) => setFormData({ ...formData, roleSummary: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.25, fontSize: "0.85rem" }}>
              Tech Stack
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1.5 }}>
              {formData.techStack.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  onDelete={() => handleTechRemove(tech)}
                  sx={{
                    bgcolor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                placeholder="e.g., React"
                size="small"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && newTech.trim()) {
                    handleTechAdd(newTech.trim());
                    setNewTech("");
                  }
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    height: "36px",
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  if (newTech.trim()) {
                    handleTechAdd(newTech.trim());
                    setNewTech("");
                  }
                }}
                sx={{ textTransform: "none" }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {techStackOptions
                .filter((tech) => !formData.techStack.includes(tech))
                .map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    onClick={() => handleTechAdd(tech)}
                    sx={{
                      cursor: "pointer",
                      bgcolor: theme.palette.background.default,
                      border: `1px solid ${theme.palette.divider}`,
                      "&:hover": {
                        bgcolor: theme.palette.action.hover,
                      },
                    }}
                  />
                ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.25, fontSize: "0.85rem" }}>
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1.5 }}>
              {formData.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleSkillRemove(skill)}
                  sx={{
                    bgcolor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                placeholder="e.g., Frontend Development"
                size="small"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && newSkill.trim()) {
                    handleSkillAdd(newSkill.trim());
                    setNewSkill("");
                  }
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    height: "36px",
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  if (newSkill.trim()) {
                    handleSkillAdd(newSkill.trim());
                    setNewSkill("");
                  }
                }}
                sx={{ textTransform: "none" }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {skillsOptions
                .filter((skill) => !formData.skills.includes(skill))
                .map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onClick={() => handleSkillAdd(skill)}
                    sx={{
                      cursor: "pointer",
                      bgcolor: theme.palette.background.default,
                      border: `1px solid ${theme.palette.divider}`,
                      "&:hover": {
                        bgcolor: theme.palette.action.hover,
                      },
                    }}
                  />
                ))}
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary">
            *These details were automatically extracted from the job description. Feel free to edit
            as needed.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// Step 3: Review
function ReviewStep({ formData }: { formData: JobFormData }) {
  const theme = useTheme();

  return (
    <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: "1rem" }}>
          Review & Save
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: "0.85rem" }}>
          Review all details before saving
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Job Details
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Title:
                </Typography>
                <Typography variant="body2">{formData.title || "Not set"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Company:
                </Typography>
                <Typography variant="body2">{formData.company || "Not set"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Location:
                </Typography>
                <Typography variant="body2">{formData.location || "Not set"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Source:
                </Typography>
                <Typography variant="body2">{formData.source || "Not set"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  URL:
                </Typography>
                <Typography variant="body2">{formData.jobUrl || "Not set"}</Typography>
              </Box>
            </Box>
          </Box>

          {formData.seniority && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                AI Analysis
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Seniority:
                  </Typography>
                  <Typography variant="body2">{formData.seniority}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Type:
                  </Typography>
                  <Typography variant="body2">{formData.employmentType}</Typography>
                </Box>
              </Box>
            </Box>
          )}

          {formData.roleSummary && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Role Summary
              </Typography>
              <Typography variant="body2">{formData.roleSummary}</Typography>
            </Box>
          )}

          {formData.techStack.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Tech Stack
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {formData.techStack.map((tech) => (
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
          )}

          {formData.skills.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {formData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.background.default,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function AddJobApplicationPage() {
  const theme = useTheme();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [parseMode, setParseMode] = useState<"ai" | "manual" | null>(null);

  // New states for behavior
  const [isParsing, setIsParsing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({ open: false, message: "", severity: "info" });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle AI Parse card click
  const handleAiParseClick = () => {
    if (!formData.jobDescription.trim()) {
      showSnackbar("Please paste a job description first", "warning");
      return;
    }

    setParseMode("ai");
    setIsParsing(true);

    // Mark step 1 as completed and advance to step 2
    if (!completedSteps.includes(1)) {
      setCompletedSteps([...completedSteps, 1]);
    }
    setCurrentStep(2);

    // Simulate AI parsing with delay (600-1200ms)
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      // Auto-fill form data with mock parsed values
      setFormData((prev) => ({
        ...prev,
        title: "Senior Frontend Engineer",
        company: "Stripe",
        jobUrl: prev.jobUrl || "https://stripe.com/jobs/senior-frontend-engineer",
        location: "Remote (US)",
        source: "LinkedIn",
        seniority: "Senior",
        employmentType: "Full-time",
        roleSummary:
          "This is a Senior Frontend Engineer position focused on building modern web applications with a focus on scalability and user experience. The ideal candidate will have strong problem-solving skills and experience with modern development practices.",
        techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
        skills: [
          "Frontend Development",
          "API Design",
          "System Architecture",
          "Team Collaboration",
          "Agile/Scrum",
        ],
      }));
      setIsParsing(false);
    }, delay);
  };

  // Handle Manual Entry card click
  const handleManualEntryClick = () => {
    setParseMode("manual");
    // Mark step 1 as completed and advance to step 2
    if (!completedSteps.includes(1)) {
      setCompletedSteps([...completedSteps, 1]);
    }
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep === 1 && !parseMode) {
      // Show parse mode selection
      return;
    }
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      // Going back from step 2 to step 1, reset parseMode
      setParseMode(null);
      setCurrentStep(1);
      // Remove step 1 from completed steps so mode selection shows again
      setCompletedSteps(completedSteps.filter((s) => s !== 1));
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    // Validate required fields for persistence
    const company = formData.company.trim();
    const role = formData.title.trim(); // UI uses 'title' but API expects 'role'
    const link = formData.jobUrl.trim() || ""; // Use jobUrl
    const dateApplied = new Date().toISOString(); // Default to now
    const status = "APPLIED"; // Default status

    if (!company) {
      showSnackbar("Company is required", "error");
      return;
    }
    if (!role) {
      showSnackbar("Job Title is required", "error");
      return;
    }
    if (!link) {
      showSnackbar("Job Link is required", "error");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          link,
          dateApplied,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showSnackbar(data.error || "Failed to save job application", "error");
        setIsSaving(false);
        return;
      }

      // Success - navigate to list page
      router.push("/job-applications");
    } catch (error) {
      showSnackbar("Failed to save job application", "error");
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    if (currentStep === 1 && !parseMode) {
      return (
        <>
          <PasteJobStep formData={formData} setFormData={setFormData} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 1.5,
              mt: 2.5,
            }}
          >
            <Card
              sx={{
                p: 2.5,
                border: `1px solid ${theme.palette.divider}`,
                cursor: "pointer",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                },
              }}
              onClick={handleAiParseClick}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  bgcolor: `${theme.palette.primary.main}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.primary.main,
                  mb: 1.5,
                }}
              >
                <Sparkles size={20} />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 0.75, fontSize: "0.95rem" }}
              >
                AI Parse
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                Automatically extract job title, company, tech stack, and more from the description
              </Typography>
            </Card>
            <Card
              sx={{
                p: 2.5,
                border: `1px solid ${theme.palette.divider}`,
                cursor: "pointer",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                },
              }}
              onClick={handleManualEntryClick}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  bgcolor: `${theme.palette.primary.main}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.primary.main,
                  mb: 1.5,
                }}
              >
                <Pencil size={20} />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 0.75, fontSize: "0.95rem" }}
              >
                Manual Entry
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                Fill in the details yourself if you prefer full control
              </Typography>
            </Card>
          </Box>
        </>
      );
    }

    switch (currentStep) {
      case 1:
        return <PasteJobStep formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <Box sx={{ position: "relative" }}>
            {isParsing && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(255,255,255,0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  borderRadius: 1,
                }}
              >
                <CircularProgress size={28} />
              </Box>
            )}
            <ParseDetailsStep formData={formData} setFormData={setFormData} entryMode={parseMode} />
          </Box>
        );
      case 3:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      {/* Back Link */}
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

      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 0.75,
          fontSize: { xs: "1.3rem", sm: "1.7rem" },
        }}
      >
        Add Job Application
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: "0.85rem" }}>
        Track a new job opportunity
      </Typography>

      {/* Stepper */}
      <Stepper currentStep={currentStep} completedSteps={completedSteps} />

      {/* Step Content */}
      {renderStep()}

      {/* Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2.5,
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ChevronLeft size={16} />}
          onClick={handleBack}
          disabled={currentStep === 1 && !parseMode}
          sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
        >
          Back
        </Button>

        {currentStep === 3 ? (
          <Button
            variant="contained"
            startIcon={
              isSaving ? <CircularProgress size={16} color="inherit" /> : <Check size={16} />
            }
            onClick={handleSave}
            disabled={isSaving}
            sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
          >
            {isSaving ? "Saving..." : "Save Job Application"}
          </Button>
        ) : currentStep === 1 && !parseMode ? (
          <Button
            variant="contained"
            endIcon={<ChevronRight size={16} />}
            onClick={handleNext}
            disabled={!formData.jobDescription.trim()}
            sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<ChevronRight size={16} />}
            onClick={handleNext}
            disabled={isParsing}
            sx={{ textTransform: "none", fontSize: "0.875rem", py: 0.75 }}
          >
            Next
          </Button>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
