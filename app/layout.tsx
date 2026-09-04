import { Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const embed = "/embed.png";

export const metadata: Metadata = {
  title: "Badcn",
  description:
    "Reusable components built on top Shadcn Base UI providing commonly used but unprovided components.",
  openGraph: {
    images: [
      {
        url: embed,
        secureUrl: embed,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: embed,
        secureUrl: embed,
      },
    ],
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
      suppressHydrationWarning
      className={cn(
        "antialiased dark",
        fontMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body>
        <Toaster />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
