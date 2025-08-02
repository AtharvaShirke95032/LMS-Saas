import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { dark } from '@clerk/themes'

import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider   appearance={{
        baseTheme: dark,
      }}>
      <html lang="en">
        <body
          className={`${montserrat.variable} bg-[#121212] antialiased`}
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
