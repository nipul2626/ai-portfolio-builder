import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Outfit, Inter } from "next/font/google";
import "./globals.css";
import "../styles/cursor.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PortfolioAI - Build Your Dream Portfolio in Minutes",
  description:
      "AI-powered portfolio builder. Create recruiter-ready portfolios instantly with zero coding required.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="dark" suppressHydrationWarning>
      <body
          className={`${spaceGrotesk.variable} ${outfit.variable} ${inter.variable} font-sans antialiased`}
      >
      {/* 🔥 Custom Cursor */}
      <CustomCursor />

      {/* App Providers */}
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
      </body>
      </html>
  );
}