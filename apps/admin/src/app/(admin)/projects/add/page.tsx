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
  Slider,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Check, Upload, Sparkles } from "lucide-react";

// Step definitions
const steps = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Details" },
  { id: 3, label: "Media" },
  { id: 4, label: "Review" },
];

// Category options
const categories = ["Full-Stack", "Frontend", "Automation / Tools", "Backend / API"];

// Tech stack options
const techStackOptions = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Fastify",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "tRPC",
  "Tailwind CSS",
  "Framer Motion",
  "Docker",
  "AWS",
  "Vercel",
  "Supabase",
];

// Form state type
interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  problemStatement: string;
  techStack: string[];
  achievements: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  architectureNotes: string;
  completion: number;
}

const initialFormData: ProjectFormData = {
  title: "",
  description: "",
  category: "frontend",
  problemStatement: "",
  techStack: [],
  achievements: ["", "", ""],
  imageUrl: "",
  githubUrl: "",
  liveUrl: "",
  architectureNotes: "",
  completion: 100,
};

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
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                {isCompleted ? <Check size={18} /> : step.id}
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

// Step 1: Basic Info
function BasicInfoStep({
  formData,
  setFormData,
}: {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
}) {
  const theme = useTheme();

  return (
    <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Basic Info
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Project title and description
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Project Title"
            placeholder="e.g., FreightFi"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            label="Short Description"
            placeholder="A brief 1-2 sentence summary of the project..."
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
}

// Step 2: Details
function DetailsStep({
  formData,
  setFormData,
}: {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
}) {
  const theme = useTheme();

  const handleTechToggle = (tech: string) => {
    if (formData.techStack.includes(tech)) {
      setFormData({
        ...formData,
        techStack: formData.techStack.filter((t) => t !== tech),
      });
    } else {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, tech],
      });
    }
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  return (
    <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Details
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Problem statement and tech stack
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Problem Statement"
            placeholder="What problem does this project solve?"
            fullWidth
            multiline
            rows={4}
            value={formData.problemStatement}
            onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
          />

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Tech Stack
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {techStackOptions.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  onClick={() => handleTechToggle(tech)}
                  sx={{
                    cursor: "pointer",
                    bgcolor: formData.techStack.includes(tech)
                      ? theme.palette.primary.main
                      : theme.palette.background.default,
                    color: formData.techStack.includes(tech)
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    border: `1px solid ${
                      formData.techStack.includes(tech)
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    "&:hover": {
                      bgcolor: formData.techStack.includes(tech)
                        ? theme.palette.primary.dark
                        : theme.palette.action.hover,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Key Achievements (up to 3)
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {formData.achievements.map((achievement, index) => (
                <TextField
                  key={index}
                  placeholder={`Achievement ${index + 1}`}
                  fullWidth
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Step 3: Media
function MediaStep({
  formData,
  setFormData,
}: {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
}) {
  const theme = useTheme();

  return (
    <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Media
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Images and links
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Image Upload Area */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Project Image
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
                PNG, JPG up to 5MB
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <TextField
              label="GitHub URL"
              placeholder="https://github.com/..."
              fullWidth
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />
            <TextField
              label="Live Demo URL"
              placeholder="https://..."
              fullWidth
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            />
          </Box>

          <TextField
            label="Architecture Notes (optional)"
            placeholder="Technical implementation details, design decisions..."
            fullWidth
            multiline
            rows={4}
            value={formData.architectureNotes}
            onChange={(e) => setFormData({ ...formData, architectureNotes: e.target.value })}
          />

          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Completion Percentage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formData.completion}%
              </Typography>
            </Box>
            <Slider
              value={formData.completion}
              onChange={(_, value) => setFormData({ ...formData, completion: value as number })}
              min={0}
              max={100}
              sx={{
                color: theme.palette.secondary.main,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Step 4: Review
function ReviewStep({
  formData,
  showAiSummary,
  onGenerateAi,
}: {
  formData: ProjectFormData;
  showAiSummary: boolean;
  onGenerateAi: () => void;
}) {
  const theme = useTheme();

  if (showAiSummary) {
    return (
      <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: `${theme.palette.primary.main}14`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.primary.main,
              }}
            >
              <Sparkles size={18} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              AI-Generated Summary
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Review and approve the generated content
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Generated Summary
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="body2">
                  Project is a modern frontend application that leverages cutting-edge technologies
                  to deliver an exceptional user experience. Built with scalability and performance
                  in mind, this project demonstrates expertise in modern web development practices
                  and clean architecture.
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Resume Bullets
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>
                    <Typography variant="body2">
                      Developed and deployed a production-ready frontend application using
                      TypeScript and React
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Implemented scalable architecture patterns resulting in 40% improved
                      performance metrics
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Designed intuitive user interfaces following modern UX principles and
                      accessibility standards
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Cleaned Tech Stack
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {["TypeScript", "React", "Node.js"].map((tech) => (
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

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Case Study Description
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="body2">
                  This case study explores the development journey of this project, from initial
                  problem identification through to deployment. We&apos;ll examine the architectural
                  decisions, technical challenges overcome, and lessons learned throughout the
                  development process.
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Review
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          AI-generated summary
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Summary
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
                Category:
              </Typography>
              <Typography variant="body2">{formData.category || "Not set"}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Tech Stack:
              </Typography>
              <Typography variant="body2">
                {formData.techStack.length > 0 ? formData.techStack.join(", ") : "None selected"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Completion:
              </Typography>
              <Typography variant="body2">{formData.completion}%</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            bgcolor: `${theme.palette.secondary.main}08`,
            border: `1px solid ${theme.palette.secondary.main}33`,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Sparkles size={18} color={theme.palette.secondary.main} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              AI Enhancement Ready
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Click &quot;Generate AI Summary&quot; to create an optimized project description, resume
            bullets, and case study content.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function AddProjectPage() {
  const theme = useTheme();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [showAiSummary, setShowAiSummary] = useState(false);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (showAiSummary) {
      setShowAiSummary(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateAi = () => {
    setShowAiSummary(true);
  };

  const handleApprove = () => {
    // Would save to database
    router.push("/projects");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <DetailsStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <MediaStep formData={formData} setFormData={setFormData} />;
      case 4:
        return (
          <ReviewStep
            formData={formData}
            showAiSummary={showAiSummary}
            onGenerateAi={handleGenerateAi}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      {/* Back Link */}
      <Button
        component={Link}
        href="/projects"
        startIcon={<ChevronLeft size={18} />}
        sx={{
          mb: 2,
          textTransform: "none",
          color: theme.palette.primary.main,
        }}
      >
        Back to Projects
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
        Add New Project
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Create a new project for your portfolio.
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
          disabled={currentStep === 1 && !showAiSummary}
          sx={{ textTransform: "none" }}
        >
          {showAiSummary ? "Edit Details" : "Back"}
        </Button>

        {currentStep === 4 ? (
          showAiSummary ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => router.push("/projects")}
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Check size={18} />}
                onClick={handleApprove}
                sx={{
                  textTransform: "none",
                  bgcolor: theme.palette.secondary.main,
                  "&:hover": {
                    bgcolor: theme.palette.secondary.dark,
                  },
                }}
              >
                Approve & Save
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              startIcon={<Sparkles size={18} />}
              onClick={handleGenerateAi}
              sx={{ textTransform: "none" }}
            >
              Generate AI Summary
            </Button>
          )
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
