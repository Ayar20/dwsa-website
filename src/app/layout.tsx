import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030e1f" },
    { media: "(prefers-color-scheme: light)", color: "#030e1f" },
  ],
};

export const metadata: Metadata = {
  title: "DWSA Tech Academy | Software Engineering & AI Training (RC 9718724)",
  description:
    "Digital World Systems Africa Ltd Tech Academy — World-class software engineering, AI automation, and cloud training with automated GitHub PR grading and Paystack installment payments.",
  applicationName: "DWSA Tech Academy",
  keywords: ["software engineering", "tech academy", "AI training", "Nigeria", "DWSA", "coding bootcamp"],
  authors: [{ name: "Digital World Systems Africa Ltd" }],
  creator: "Digital World Systems Africa Ltd",
  publisher: "Digital World Systems Africa Ltd",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DWSA Academy",
    startupImage: ["/icons/icon-512.png"],
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "DWSA Tech Academy",
    title: "DWSA Tech Academy | Software Engineering & AI Training",
    description: "World-class software engineering, AI automation & cloud training. RC 9718724.",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icons/icon-192.png",
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <head>
        {/* PWA Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.warn('SW registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#030e1f] text-[#f0f4ff] font-sans selection:bg-[#00d2ff] selection:text-[#030e1f]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
