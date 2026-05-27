import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { ThemeStyles } from "@/components/ThemeStyles";
import { getSiteConfig } from "@/lib/get-site-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateViewport(): Promise<Viewport> {
  const config = await getSiteConfig();
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: config.theme.sand,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: `${config.couple.displayNames} | Wedding Invitation`,
    description: `You're invited to celebrate the wedding of ${config.couple.displayNames}. RSVP, view details, and find directions.`,
    openGraph: {
      title: `${config.couple.displayNames} | Wedding Invitation`,
      description: `You're invited to celebrate our wedding on ${config.wedding.dateDisplay}.`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <head>
        <ThemeStyles theme={config.theme} />
      </head>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
