"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { LuDatabase } from "react-icons/lu";

interface SQLEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SQLEditor({
  value,
  onChange,
}: SQLEditorProps) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("sm", "md");
  const headerBg = useColorModeValue("gray.50", "gray.900");
  const theme = useColorModeValue("vs-light", "vs-dark");

  const handleMount: OnMount = (editor, monaco) => {
    const sqlKeywords = [
      "SELECT", "FROM", "WHERE", "GROUP", "ORDER", "HAVING",
      "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "ON", "AS",
      "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS",
      "NULL", "EXISTS", "ANY", "ALL", "CREATE", "TABLE",
      "VIEW", "INDEX", "DROP", "ALTER", "INSERT", "UPDATE",
      "DELETE", "VALUES", "DISTINCT", "LIMIT", "OFFSET",
      "UNION", "CASE", "WHEN", "THEN", "ELSE", "END",
      "SUM", "COUNT", "AVG", "MIN", "MAX", "ROW_NUMBER",
    ];

    monaco.languages.registerCompletionItemProvider("sql", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);

        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = sqlKeywords.map((keyword) => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
          range,
          documentation: `SQL keyword: ${keyword}`,
        }));

        return { suggestions };
      },
    });
  };

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
        bg={headerBg}
      >
        <Flex align="center" gap={2}>
          <Icon as={LuDatabase} boxSize={5} color="blue.500" />
          <Text
            fontWeight="medium"
            fontSize="sm"
            color="gray.600"
            _dark={{ color: "gray.300" }}
          >
            SQL Editor
          </Text>
        </Flex>
      </Flex>

      <Editor
        height="500px"
        defaultLanguage="sql"
        value={value}
        onChange={(val) => onChange(val || "")}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 12 },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          parameterHints: { enabled: true },
          cursorBlinking: "smooth",
          wordWrap: "on",
        }}
        onMount={handleMount}
      />
    </Box>
  );
}