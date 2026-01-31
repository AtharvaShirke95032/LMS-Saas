import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { dark } from "@clerk/themes";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NavbarDemo } from "@/components/Navbar";
import { cn } from "@/lib/utils";

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
 <ClerkProvider appearance={{ baseTheme: dark }}>
  <html lang="en" className="dark">
    <body className={`${montserrat.variable} bg-[#0A0A0A] antialiased`}>
      
      {/* Navbar */}
      <NavbarDemo />

      {/* Background */}
      {/* <div className="fixed inset-0 -z-10">
        <div
          className={cn(
            
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          )}
        />
        <div className=" pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      </div> */}

      {/* Main content */}
      <div className="w-full bg-transparent pt-20 px-4 sm:px-8 lg:px-20 flex items-center justify-center">{children}</div>
    </body>
  </html>
</ClerkProvider>
  );
}