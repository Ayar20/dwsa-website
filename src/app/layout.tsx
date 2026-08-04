import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

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
  metadataBase: new URL("https://dwsa-academy.vercel.app"),
  title: {
    default: "Digital Technology Academy (DTA) | DWSA Digital Campus",
    template: "%s | DTA – Digital Technology Academy",
  },
  description:
    "Developing Africa's Next Generation of Technology Professionals. DTA is the education and human capability development engine of Digital World Systems Africa Ltd (RC 9718724), offering software engineering, AI integration, blockchain, and digital leadership training.",
  applicationName: "DWSA Digital Technology Academy",
  keywords: [
    "software engineering bootcamp",
    "tech academy Nigeria",
    "AI training Africa",
    "coding bootcamp Makurdi",
    "Nigeria tech institute",
    "DWSA Academy",
    "Digital Campus",
    "blockchain training",
    "Digital Technology Academy",
    "DTA",
  ],
  authors: [{ name: "Digital World Systems Africa Ltd", url: "https://dws-africa.vercel.app" }],
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
    locale: "en_NG",
    siteName: "Digital Technology Academy (DTA)",
    title: "Digital Technology Academy (DTA) | Developing Africa's Next Generation of Tech Leaders",
    description:
      "The education and human capability development engine of Digital World Systems Africa Ltd (RC 9718724). Practical technology education in AI, software engineering, and blockchain.",
    url: "https://dwsa-academy.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Technology Academy (DTA) – DWSA Digital Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Technology Academy (DTA) | DWSA Digital Campus",
    description:
      "Developing Africa's next generation of technology professionals. AI, software engineering, blockchain training. A pillar of Digital World Systems Africa Ltd (RC 9718724).",
    images: ["/og-image.png"],
    creator: "@dwsafrica",
    site: "@dwsafrica",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
      <body className="min-h-full flex flex-col bg-[#030e1f] text-[#f0f4ff] font-sans selection:bg-[#d4a017] selection:text-[#030e1f]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
