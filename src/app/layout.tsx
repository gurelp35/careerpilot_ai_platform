import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://careerpilot-ai-platform-six.vercel.app";
const siteDescription =
  "CareerPilot AI helps students and graduates track applications, analyse job descriptions, identify skill gaps and prepare for interviews.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CareerPilot AI | Graduate Career Readiness",
    template: "%s | CareerPilot AI",
  },
  description: siteDescription,
  applicationName: "CareerPilot AI",
  openGraph: {
    title: "CareerPilot AI | Graduate Career Readiness",
    description: siteDescription,
    url: siteUrl,
    siteName: "CareerPilot AI",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "CareerPilot AI | Graduate Career Readiness",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
