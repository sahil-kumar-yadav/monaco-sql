"use client";

import { VStack, Button, Text, Box, HStack, IconButton } from "@chakra-ui/react";
import { LuTrash2, LuPlay } from "react-icons/lu";

interface QueryHistoryProps {
  history: string[];
  onReRun: (query: string) => void;
  onClear: () => void;
  onRemove: (query: string) => void;
}

export default function QueryHistory({ history, onReRun, onClear, onRemove }: QueryHistoryProps) {
  if (history.length === 0) {
    return (
      <Box p={4} textAlign="center" opacity={0.5}>
        <Text fontSize="sm">No query history yet</Text>
      </Box>
    );
  }

  return (
    <VStack gap={2} align="stretch" p={3} maxH="200px" overflowY="auto">
      {history.map((query, i) => (
        <HStack key={i} justify="space-between" p={2} bg="gray.50" _dark={{ bg: "gray.800" }} rounded="md">
          <Button
            variant="ghost"
            size="sm"
            flex={1}
            textAlign="left"
            whiteSpace="normal"
            onClick={() => onReRun(query)}
            css={{
              _icon: {
                width: "4",
                height: "4",
              },
            }}
          >
            <HStack>
              <span>{query.length > 60 ? `${query.slice(0, 60)}...` : query}</span>
              <LuPlay />
            </HStack>
          </Button>
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="Remove"
            css={{
              _icon: {
                width: "4",
                height: "4",
              },
            }}
            onClick={() => onRemove(query)}
          >
            <LuTrash2 />
          </IconButton>
        </HStack>
      ))}
      <Button size="xs" variant="ghost" onClick={onClear} alignSelf="flex-end">
        Clear All
      </Button>
    </VStack>
  );
}

