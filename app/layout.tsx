import type { Metadata } from "next";
import { Sora, Manrope, Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "K-Graphics | Brand & Visual Design",
  description:
    "K-Graphics translates your vision into soul-rich, timeless visuals that reflect your values and identity. Brand identity, social design, and custom digital art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          display.variable,
          body.variable,
          "font-sans",
          geist.variable,
        )}
      >
        <body className="font-body antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
