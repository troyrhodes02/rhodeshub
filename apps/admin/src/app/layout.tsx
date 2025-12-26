import type { Metadata } from "next";
import localFont from "next/font/local";
import ThemeRegistry from "./components/ThemeRegistry";

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
  title: "RhodesHub Admin",
  description:
    "Admin dashboard for managing portfolio projects, job applications, resume intelligence, and email inbox. AI-powered resume analysis and job tracking tools.",
  icons: {
    icon: "/new_rhodeshub_logo.png",
  },
  openGraph: {
    title: "RhodesHub Admin",
    description:
      "Admin dashboard for managing portfolio projects, job applications, resume intelligence, and email inbox.",
    url: "https://admin.rhodeshub.dev",
    siteName: "RhodesHub Admin",
    images: [
      {
        url: "https://admin.rhodeshub.dev/new_rhodeshub_logo.png",
        width: 1200,
        height: 630,
        alt: "RhodesHub Admin Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RhodesHub Admin",
    description:
      "Admin dashboard for managing portfolio projects, job applications, resume intelligence, and email inbox.",
    images: ["https://admin.rhodeshub.dev/new_rhodeshub_logo.png"],
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
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
