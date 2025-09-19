// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { ChakraProvider, Box, Flex, Heading } from "@chakra-ui/react";
import ThemeToggle from "@/components/ThemeToggle";
import system from "@/theme/theme";

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
        <ChakraProvider value={system}>
          <Flex
            as="header"
            justify="space-between"
            align="center"
            p="4"
            borderBottom="1px solid"
            borderColor="gray.200"
            _dark={{ borderColor: "gray.700" }}
          >
            <Heading size="md" color="accent">
              SQL Playground
            </Heading>
            <ThemeToggle />
          </Flex>

          <Box as="main" p="4">
            {children}
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
