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
        gap: { xs: 1, sm: 2 },
        mb: 4,
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
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
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
                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
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
                  width: { xs: 40, sm: 80, md: 120 },
                  height: 2,
                  bgcolor: completedSteps.includes(step.id)
                    ? theme.palette.primary.main
                    : theme.palette.divider,
                  mx: { xs: 0.5, sm: 1 },
                  mt: { xs: 0, sm: -3 },
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
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
          <LinkIcon size={20} color={theme.palette.text.secondary} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Paste Job Listing
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Provide the job URL and description. AI will extract all the details for you.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Job URL (optional)"
            placeholder="https://..."
            fullWidth
            value={formData.jobUrl}
            onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
          />
          <TextField
            label="Job Description *"
            placeholder="Paste the full job description here..."
            fullWidth
            multiline
            rows={8}
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            required
          />
        </Box>
      </CardContent>
    </Card>
  );
}

// Step 2: Parse Details
function ParseDetailsStep({
  formData,
  setFormData,
}: {
  formData: JobFormData;
  setFormData: (data: JobFormData) => void;
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
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
          <Sparkles size={20} color={theme.palette.primary.main} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            AI-Parsed Details
          </Typography>
          <Chip
            label="Editable"
            size="small"
            sx={{
              bgcolor: `${theme.palette.primary.main}14`,
              color: theme.palette.primary.main,
              fontWeight: 500,
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Review and edit the extracted information as needed.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              label="Job Title *"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              label="Company *"
              fullWidth
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
            <TextField
              label="Location"
              fullWidth
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Source</InputLabel>
              <Select
                label="Source"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              >
                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                <MenuItem value="Company Site">Company Site</MenuItem>
                <MenuItem value="Builtin">Builtin</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Seniority Level</InputLabel>
              <Select
                label="Seniority Level"
                value={formData.seniority}
                onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
              >
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Mid">Mid</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Lead">Lead</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Employment Type</InputLabel>
              <Select
                label="Employment Type"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="Role Summary"
            fullWidth
            multiline
            rows={4}
            value={formData.roleSummary}
            onChange={(e) => setFormData({ ...formData, roleSummary: e.target.value })}
          />

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Tech Stack
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
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
                placeholder="Add technology..."
                size="small"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && newTech.trim()) {
                    handleTechAdd(newTech.trim());
                    setNewTech("");
                  }
                }}
                sx={{ flex: 1 }}
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
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
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
                placeholder="Add skill..."
                size="small"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && newSkill.trim()) {
                    handleSkillAdd(newSkill.trim());
                    setNewSkill("");
                  }
                }}
                sx={{ flex: 1 }}
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
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Review & Save
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Review all details before saving
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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

  const handleNext = () => {
    if (currentStep === 1 && !parseMode) {
      // Show parse mode selection
      return;
    }
    if (currentStep === 1 && parseMode === "ai") {
      // Auto-fill form data (mock)
      setFormData({
        ...formData,
        title: "Senior Frontend Engineer",
        company: "Stripe",
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
      });
    }
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 2 && parseMode === "ai") {
      setParseMode(null);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    // Would save to database
    router.push("/job-applications");
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
              gap: 2,
              mt: 3,
            }}
          >
            <Card
              sx={{
                p: 3,
                border: `1px solid ${theme.palette.divider}`,
                cursor: "pointer",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                },
              }}
              onClick={() => {
                setParseMode("ai");
                handleNext();
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: `${theme.palette.primary.main}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                <Sparkles size={24} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                AI Parse
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Automatically extract job title, company, tech stack, and more from the description
              </Typography>
            </Card>
            <Card
              sx={{
                p: 3,
                border: `1px solid ${theme.palette.divider}`,
                cursor: "pointer",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                },
              }}
              onClick={() => {
                setParseMode("manual");
                setCurrentStep(2);
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: `${theme.palette.primary.main}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                <Pencil size={24} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Manual Entry
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
        return <ParseDetailsStep formData={formData} setFormData={setFormData} />;
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
        startIcon={<ChevronLeft size={18} />}
        sx={{
          mb: 2,
          textTransform: "none",
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
          mb: 1,
          fontSize: { xs: "1.5rem", sm: "2rem" },
        }}
      >
        Add Job Application
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
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
          mt: 3,
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ChevronLeft size={18} />}
          onClick={handleBack}
          disabled={currentStep === 1 && !parseMode}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>

        {currentStep === 3 ? (
          <Button
            variant="contained"
            startIcon={<Check size={18} />}
            onClick={handleSave}
            sx={{ textTransform: "none" }}
          >
            Save Job Application
          </Button>
        ) : currentStep === 1 && !parseMode ? (
          <Button
            variant="contained"
            endIcon={<ChevronRight size={18} />}
            onClick={handleNext}
            disabled={!formData.jobDescription.trim()}
            sx={{ textTransform: "none" }}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<ChevronRight size={18} />}
            onClick={handleNext}
            sx={{ textTransform: "none" }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}
