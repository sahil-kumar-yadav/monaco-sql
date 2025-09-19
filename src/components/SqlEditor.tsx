"use client";

import Editor from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";

interface SQLEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SQLEditor({ value, onChange }: SQLEditorProps) {
  return (
    <Box border="1px solid" borderColor="gray.300" _dark={{ borderColor: "gray.600" }} rounded="md" overflow="hidden">
      <Editor
        height="200px"
        defaultLanguage="sql"
        value={value}
        onChange={(val) => onChange(val || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </Box>
  );
}
