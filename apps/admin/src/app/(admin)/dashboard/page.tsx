"use client";

import { Box, Card, CardContent, Typography, Button, useTheme } from "@mui/material";
import {
  Eye,
  FolderKanban,
  Download,
  FileText,
  Plus,
  Sparkles,
  Search,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Mock data for Page Views This Week
const pageViewsData = [
  { day: "Mon", views: 400 },
  { day: "Tue", views: 380 },
  { day: "Wed", views: 450 },
  { day: "Thu", views: 620 },
  { day: "Fri", views: 580 },
  { day: "Sat", views: 350 },
  { day: "Sun", views: 300 },
];

// Mock data for Project Views
const projectViewsData = [
  { name: "FreightFi", views: 2400 },
  { name: "IEPFlow", views: 1800 },
  { name: "Recruito", views: 1200 },
  { name: "Valour", views: 800 },
  { name: "InvoiceMailer", views: 700 },
];

// Custom Tooltip Component Factory for Recharts
function createCustomTooltip(theme: any) {
  return function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 1.25,
            boxShadow: theme.shadows[4],
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: "0.8rem" }}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color, fontSize: "0.8rem" }}>
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };
}

// Metric Card Component
function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  subtitle,
}: {
  title: string;
  value: string;
  change?: string;
  icon: any;
  subtitle?: string;
}) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 0.75,
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: subtitle ? 0.5 : 0.75,
                fontSize: { xs: "1.3rem", sm: "1.7rem", md: "1.8rem" },
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 0.75,
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                }}
              >
                {subtitle}
              </Typography>
            )}
            {change && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.success.main,
                  fontWeight: 600,
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                }}
              >
                {change}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: { xs: 34, sm: 40 },
              height: { xs: 34, sm: 40 },
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: `${theme.palette.primary.main}14`,
              color: theme.palette.primary.main,
              flexShrink: 0,
            }}
          >
            <Icon size={18} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const theme = useTheme();
  const ChartTooltip = createCustomTooltip(theme);

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 0.75,
            fontSize: { xs: "1.3rem", sm: "1.7rem", md: "1.8rem" },
          }}
        >
          Welcome back, William
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
          Here&apos;s what&apos;s happening with your portfolio today.
        </Typography>
      </Box>

      {/* Key Metrics */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: { xs: 1.5, sm: 2.5 },
          mb: { xs: 2.5, md: 3 },
        }}
      >
        <MetricCard title="Total Page Views" value="12,847" change="+23%" icon={Eye} />
        <MetricCard
          title="Most Viewed Project"
          value="FreightFi"
          subtitle="2.4k views"
          icon={FolderKanban}
        />
        <MetricCard title="Resume Downloads" value="342" change="+12%" icon={Download} />
        <MetricCard title="Active Resumes" value="5" subtitle="2 need updates" icon={FileText} />
      </Box>

      {/* Charts Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: { xs: 1.5, sm: 2.5 },
          mb: { xs: 2.5, md: 3 },
        }}
      >
        {/* Page Views Line Chart */}
        <Box>
          <Card
            sx={{
              height: "100%",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: { xs: 1.5, sm: 2.5 },
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                }}
              >
                Page Views This Week
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={pageViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis
                    dataKey="day"
                    stroke={theme.palette.text.secondary}
                    style={{ fontSize: "10px" }}
                    tick={{ fontSize: "10px" }}
                  />
                  <YAxis
                    stroke={theme.palette.text.secondary}
                    style={{ fontSize: "10px" }}
                    tick={{ fontSize: "10px" }}
                    domain={[0, 800]}
                    ticks={[0, 200, 400, 600, 800]}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: theme.palette.highlight.main }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Project Views Bar Chart */}
        <Box>
          <Card
            sx={{
              height: "100%",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: { xs: 1.5, sm: 2.5 },
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                }}
              >
                Project Views
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={projectViewsData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis
                    type="number"
                    stroke={theme.palette.text.secondary}
                    style={{ fontSize: "10px" }}
                    tick={{ fontSize: "10px" }}
                    domain={[0, 2400]}
                    ticks={[0, 600, 1200, 1800, 2400]}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke={theme.palette.text.secondary}
                    style={{ fontSize: "10px" }}
                    tick={{ fontSize: "10px" }}
                    width={70}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="views" fill={theme.palette.secondary.main} radius={[0, 4, 4, 0]}>
                    {projectViewsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={theme.palette.secondary.main} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: { xs: 1.5, sm: 2.5 },
        }}
      >
        {/* AI Demo Usage */}
        <Box>
          <Card
            sx={{
              height: "100%",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "flex-start" },
                  mb: { xs: 1.5, sm: 2.5 },
                  gap: { xs: 1.5, sm: 0 },
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      fontSize: { xs: "0.9rem", sm: "1.1rem" },
                    }}
                  >
                    AI Demo Usage
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
                  >
                    Public demo analytics
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.3rem", sm: "1.7rem" },
                    }}
                  >
                    1,247
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.success.main,
                      fontWeight: 600,
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    }}
                  >
                    +18% this month
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                  gap: { xs: 1.25, sm: 1.75 },
                  mb: 1.5,
                }}
              >
                <Box>
                  <Card
                    variant="outlined"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: theme.palette.background.default,
                    }}
                  >
                    <CardContent sx={{ p: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: `${theme.palette.primary.main}14`,
                            color: theme.palette.primary.main,
                          }}
                        >
                          <FileText size={18} />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                            412
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem" }}
                          >
                            Resume Only
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
                <Box>
                  <Card
                    variant="outlined"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: theme.palette.background.default,
                    }}
                  >
                    <CardContent sx={{ p: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: `${theme.palette.secondary.main}14`,
                            color: theme.palette.secondary.main,
                          }}
                        >
                          <Search size={18} />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                            358
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem" }}
                          >
                            Job Description Only
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
                <Box>
                  <Card
                    variant="outlined"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: theme.palette.background.default,
                    }}
                  >
                    <CardContent sx={{ p: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: `${theme.palette.highlight.main}14`,
                            color: theme.palette.highlight.main,
                          }}
                        >
                          <Sparkles size={18} />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                            477
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem" }}
                          >
                            Combined Analysis
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                This Week (89 total)
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Quick Actions */}
        <Box>
          <Card
            sx={{
              height: "100%",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: { xs: 1.5, sm: 2.5 },
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                }}
              >
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.25, sm: 1.75 } }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Plus size={18} />}
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    justifyContent: "space-between",
                    textTransform: "none",
                    py: 1.25,
                    fontSize: "0.875rem",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Add New Project
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FileText size={18} />}
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    justifyContent: "space-between",
                    textTransform: "none",
                    py: 1.25,
                    fontSize: "0.875rem",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Resume Intelligence
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
