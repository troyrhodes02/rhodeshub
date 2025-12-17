"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  useTheme,
  Chip,
} from "@mui/material";
import { Sparkles, FileText, Clipboard, CheckCircle2 } from "lucide-react";

const MotionBox = motion(Box);

export default function AiDemo() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type === "application/pdf" || file.type.includes("wordprocessingml")) {
      setResumeFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = () => {
    // TODO: Implement analysis logic
    console.log("Analyzing...", { resumeFile, jobDescription });
  };

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            textAlign: "center",
          }}
        >
          {/* AI-Powered Demo Tag */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              px: 2,
              py: 0.75,
              borderRadius: "999px",
              bgcolor: isDark ? theme.palette.primary.main + "20" : "#E0F2FE",
              color: theme.palette.primary.main,
            }}
          >
            <Sparkles size={16} />
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              AI-Powered Demo
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: "text.primary",
              mb: 2,
            }}
          >
            RhodesHub AI Engine
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
              color: "text.secondary",
              lineHeight: 1.6,
              maxWidth: 800,
              mx: "auto",
              mb: 2,
            }}
          >
            Experience intelligent resume analysis and job description parsing. This public demo
            showcases the AI capabilities without storing any data.
          </Typography>

          {/* Data Persistence Note */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: theme.palette.success.main,
              mt: 1,
            }}
          >
            <CheckCircle2 size={16} />
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              No data persistence • Files processed temporarily
            </Typography>
          </Box>
        </MotionBox>

        {/* Resume & Job Match Demo Card */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "none",
              boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              {/* Card Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1,
                }}
              >
                <Sparkles size={24} color={theme.palette.primary.main} />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                    color: "text.primary",
                  }}
                >
                  Resume & Job Match Demo
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "0.875rem", sm: "0.95rem" },
                  color: "text.secondary",
                  mb: 4,
                }}
              >
                Upload a resume, paste a job description, or provide both for a combined analysis.
                Files are processed temporarily and never stored.
              </Typography>

              {/* Input Sections */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: { xs: 3, md: 4 },
                  mb: 4,
                }}
              >
                {/* Upload Resume Section */}
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <FileText size={20} color={theme.palette.text.secondary} />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "text.primary",
                      }}
                    >
                      Upload Resume (PDF/DOCX)
                    </Typography>
                  </Box>
                  <Box
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      border: `2px dashed ${
                        isDragging ? theme.palette.primary.main : theme.palette.divider
                      }`,
                      borderRadius: 2,
                      p: 4,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      bgcolor: isDragging ? theme.palette.primary.main + "08" : "transparent",
                      height: "280px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        bgcolor: theme.palette.primary.main + "08",
                      },
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileInputChange}
                      style={{ display: "none" }}
                    />
                    <FileText
                      size={48}
                      style={{
                        color: theme.palette.text.secondary,
                        marginBottom: 12,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    >
                      {resumeFile ? resumeFile.name : "Click or drag to upload"}
                    </Typography>
                    {resumeFile && (
                      <Chip
                        label="File selected"
                        size="small"
                        sx={{
                          mt: 1,
                          bgcolor: theme.palette.success.main + "20",
                          color: theme.palette.success.main,
                        }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Paste Job Description Section */}
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <Clipboard size={20} color={theme.palette.text.secondary} />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "text.primary",
                      }}
                    >
                      Paste Job Description
                    </Typography>
                  </Box>
                  <TextField
                    multiline
                    rows={10}
                    fullWidth
                    placeholder="Paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "background.default",
                        height: "280px",
                        alignItems: "flex-start",
                        "& textarea": {
                          height: "100% !important",
                          overflow: "auto !important",
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Analyze Button */}
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<Sparkles size={20} />}
                  onClick={handleAnalyze}
                  disabled={!resumeFile && !jobDescription.trim()}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textTransform: "none",
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    "&:disabled": {
                      bgcolor: theme.palette.action.disabledBackground,
                      color: theme.palette.action.disabled,
                    },
                  }}
                >
                  Analyze Match
                </Button>
              </Box>
            </CardContent>
          </Card>
        </MotionBox>
      </Container>
    </Box>
  );
}
