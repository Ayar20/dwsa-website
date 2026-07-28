import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "DWSA Tech Academy | Software Engineering & AI Training (RC 9718724)",
  description: "Digital World Systems Africa Ltd Tech Academy — World-class software engineering, AI automation, and cloud training with automated GitHub PR grading and Paystack installment payments.",
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
      <body className="min-h-full flex flex-col bg-[#030e1f] text-[#f0f4ff] font-sans selection:bg-[#00d2ff] selection:text-[#030e1f]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
