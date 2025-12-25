"use client";

<<<<<<< HEAD
import { useState, useRef } from "react";
import { motion } from "framer-motion";
=======
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
>>>>>>> master
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
<<<<<<< HEAD
import { Sparkles, FileText, Clipboard, CheckCircle2 } from "lucide-react";
=======
import {
  Sparkles,
  FileText,
  Clipboard,
  CheckCircle2,
  Construction,
  Zap,
  ArrowLeft,
} from "lucide-react";
>>>>>>> master

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

<<<<<<< HEAD
=======
  // Lock body scroll when component mounts (modal is always visible on this page)
  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

>>>>>>> master
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        bgcolor: "background.default",
<<<<<<< HEAD
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
=======
        position: "relative",
      }}
    >
      {/* Under Construction Overlay */}
      <Box
        sx={{
          position: "fixed",
          top: 64, // Start below navbar (navbar height is 64px)
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "center",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          py: { xs: 3, sm: 4 },
          px: { xs: 2, sm: 3 },
        }}
        onClick={(e) => {
          // Prevent clicks from bubbling to background
          e.stopPropagation();
        }}
      >
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            position: "relative",
            maxWidth: { xs: "100%", sm: 600, md: 700 },
            width: "100%",
            my: "auto",
            maxHeight: { xs: "calc(100vh - 100px)", sm: "90vh" },
            display: "flex",
            flexDirection: "column",
          }}
          onClick={(e) => {
            // Prevent clicks from bubbling
            e.stopPropagation();
          }}
        >
          {/* Animated Background Glow */}
          <Box
            sx={{
              position: "absolute",
              inset: -20,
              borderRadius: 4,
              background: (theme) =>
                `radial-gradient(ellipse at center, ${theme.palette.primary.main}30, transparent 70%)`,
              filter: "blur(40px)",
              animation: "pulse 3s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": {
                  opacity: 0.5,
                },
                "50%": {
                  opacity: 0.8,
                },
              },
            }}
          />

          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "2px solid",
              borderColor: "primary.main",
              position: "relative",
              overflow: "visible",
              boxShadow: (theme) =>
                `0 20px 60px ${theme.palette.primary.main}30, 0 0 0 1px ${theme.palette.primary.main}20`,
              display: "flex",
              flexDirection: "column",
              maxHeight: "100%",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 3, sm: 5, md: 6 },
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: (theme) => theme.palette.divider,
                  borderRadius: "4px",
                  "&:hover": {
                    background: (theme) => theme.palette.text.secondary,
                  },
                },
              }}
            >
              {/* Back to Home Button */}
              <Box sx={{ mb: 3 }}>
                <Button
                  component={Link}
                  href="/"
                  startIcon={<ArrowLeft size={18} />}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    px: 2.5,
                    py: 1,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "primary.dark",
                      bgcolor: (theme) => `${theme.palette.primary.main}08`,
                    },
                  }}
                >
                  Back to Home
                </Button>
              </Box>

              <Box sx={{ textAlign: "center", mb: 4 }}>
                {/* Construction Icon with Animation */}
                <MotionBox
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  sx={{
                    display: "inline-flex",
                    mb: 3,
                    p: 2,
                    borderRadius: "50%",
                    bgcolor: (theme) => `${theme.palette.primary.main}15`,
                  }}
                >
                  <Construction size={48} color={theme.palette.primary.main} />
                </MotionBox>

                {/* Title */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                    mb: 2,
                    color: "text.primary",
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Under Construction
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                    mb: 3,
                    color: "text.secondary",
                  }}
                >
                  Building Something Amazing
                </Typography>
              </Box>

              {/* Description */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
                    color: "text.secondary",
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  The RhodesHub AI Engine is currently under active development. This powerful
                  platform will provide intelligent resume analysis, job description parsing, and
                  match scoring capabilities.
                </Typography>

                {/* Features List */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    textAlign: "left",
                  }}
                >
                  {[
                    "AI-powered resume parsing and analysis",
                    "Intelligent job description matching",
                    "Explainable match scoring with detailed insights",
                    "Secure, temporary file processing",
                  ].map((feature, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: (theme) => `${theme.palette.primary.main}20`,
                          flexShrink: 0,
                        }}
                      >
                        <Zap size={14} color={theme.palette.primary.main} />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.9rem", sm: "0.95rem" },
                          color: "text.secondary",
                        }}
                      >
                        {feature}
                      </Typography>
                    </MotionBox>
                  ))}
                </Box>
              </Box>

              {/* Coming Soon Badge */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Chip
                  icon={<Sparkles size={16} />}
                  label="Coming Soon"
                  sx={{
                    px: 2,
                    py: 3,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    bgcolor: (theme) => `${theme.palette.primary.main}15`,
                    color: "primary.main",
                    border: "1px solid",
                    borderColor: "primary.main",
                    "& .MuiChip-icon": {
                      color: "primary.main",
                    },
                  }}
                />
>>>>>>> master
              </Box>
            </CardContent>
          </Card>
        </MotionBox>
<<<<<<< HEAD
      </Container>
=======
      </Box>

      {/* Disabled Content Below Overlay */}
      <Box
        sx={{
          pointerEvents: "none",
          opacity: 0.3,
          filter: "blur(2px)",
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
>>>>>>> master
    </Box>
  );
}
