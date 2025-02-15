import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ThemeToggler } from "@/components/theme-toggler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Room Controller",
  description: "Control your room with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex justify-between items-center mb-8 p-4 sm:p-4 fixed z-20 bg-background w-full">
              <h1 className="text-2xl font-bold text-foreground">Smart Room Controller</h1>
              <div className="flex items-center gap-2">
                <ThemeToggler />
                <UserButton />
              </div>
            </div>
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
