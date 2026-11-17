import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { homeDescription, homeTitle } from "./_lib/seo";
import { getSiteUrl } from "./_lib/site-url";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: homeTitle, template: "%s | bej" },
  description: homeDescription,
  metadataBase: getSiteUrl() ?? undefined,
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
