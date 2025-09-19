import type { Metadata } from "next";
import "./globals.css";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Providers } from "@/providers/Providers";


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
          <Box as="main" p="1"  width="100%">
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
