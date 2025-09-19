"use client";

import Editor from "@monaco-editor/react";
import {
  Box,
  Flex,
  Text,
  Icon,
} from "@chakra-ui/react";
import { LuDatabase } from "react-icons/lu";
import { useColorModeValue } from "./ui/color-mode";

interface SQLEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SQLEditor({ value, onChange }: SQLEditorProps) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("sm", "md");

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      rounded="lg"
      shadow={shadow}
      overflow="hidden"
    >
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={2}
        borderBottom="1px solid"
        borderColor={borderColor}
        bg={useColorModeValue("gray.50", "gray.900")}
      >
        <Flex align="center" gap={2}>
          <Icon as={LuDatabase} boxSize={5} color="blue.500" />
          <Text fontWeight="medium" fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
            SQL Editor
          </Text>
        </Flex>
      </Flex>

      <Editor
        height="250px"
        defaultLanguage="sql"
        value={value}
        onChange={(val) => onChange(val || "")}
        theme={useColorModeValue("vs-light", "vs-dark")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 12 },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </Box>
  );
}
