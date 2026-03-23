import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@chakra-ui/react";
import { Providers } from "@/providers/Providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "SQL Playground",
  description: "Client-side SQL playground using sql.js and Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Box as="main" p={8} maxW="8xl" mx="auto">
            {children}
            <Toaster />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
