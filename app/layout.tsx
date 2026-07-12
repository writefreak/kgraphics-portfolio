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
  metadataBase: new URL("https://kgraphics-portfolio.vercel.app"), // swap for the real production domain
  title: {
    default: "K-Graphics | Brand & Visual Design",
    template: "%s | K-Graphics",
  },
  description:
    "K-Graphics translates your vision into soul-rich, timeless visuals that reflect your values and identity. Brand identity, social design, and custom digital art.",
  keywords: [
    "brand identity design",
    "graphic design studio",
    "logo design",
    "visual identity",
    "packaging design",
    "K-Graphics",
  ],
  authors: [{ name: "K-Graphics" }],
  openGraph: {
    type: "website",
    title: "K-Graphics | Brand & Visual Design",
    description:
      "K-Graphics translates your vision into soul-rich, timeless visuals that reflect your values and identity.",
    url: "https://kgraphics-portfolio.vercel.app", // swap for the real production domain
    siteName: "K-Graphics",
    images: [{ url: "/kemi.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "K-Graphics | Brand & Visual Design",
    description:
      "K-Graphics translates your vision into soul-rich, timeless visuals that reflect your values and identity.",
    images: ["/kemi.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
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
        <body className="font-body antialiased">
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "K-Graphics",
                description:
                  "K-Graphics creates soul-rich, timeless visual identities, logos, brochures, packaging, and brand systems.",
                url: "https://kgraphics-portfolio.vercel.app",
                image: "https://kgraphics-portfolio.vercel.app/kemi.jpeg",
                priceRange: "$$",
              }),
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
