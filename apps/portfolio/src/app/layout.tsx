import type { Metadata } from "next";
import localFont from "next/font/local";
import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeRegistry from "@/components/ThemeRegistry";

// Sora font for headers - variable font
const sora = localFont({
  src: "../../public/fonts/Sora-VariableFont_wght.ttf",
  variable: "--font-sora",
  fallback: ["sans-serif"],
  display: "swap",
});

// Inter font for text - variable font
const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  fallback: ["sans-serif"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RhodesHub",
  description:
    "Full-stack software engineer building modern SaaS applications, automation tools, and AI-powered systems. Explore projects, experience, and connect.",
  icons: {
    icon: "/new_rhodeshub_logo.png",
  },
  openGraph: {
    title: "RhodesHub",
    description:
      "Full-stack software engineer building modern SaaS applications, automation tools, and AI-powered systems.",
    url: "https://rhodeshub.dev",
    siteName: "RhodesHub",
    images: [
      {
        url: "https://rhodeshub.dev/new_rhodeshub_logo.png",
        width: 1200,
        height: 630,
        alt: "RhodesHub Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RhodesHub",
    description:
      "Full-stack software engineer building modern SaaS applications, automation tools, and AI-powered systems.",
    images: ["https://rhodeshub.dev/new_rhodeshub_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <body className={`${sora.variable} ${inter.variable}`} style={{ margin: 0, padding: 0 }}>
        <ThemeRegistry>
          <Navbar />
          <Box
            sx={{
              pt: "64px",
              minHeight: "calc(100vh - 64px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flex: 1 }}>{children}</Box>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
