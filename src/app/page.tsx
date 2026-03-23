"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import SQLEditor from "@/components/SqlEditor";
import ResultsTable from "@/components/ResultsTable";
import DBControls from "@/components/DBControls";
import QueryHistory from "@/components/QueryHistory";
import {
  init,
  run,
  reset as dbReset,
  importDatabase,
} from "@/lib/sqlEngine";

export default function Home() {
  const [dbReady, setDbReady] = useState(false);
  const [query, setQuery] = useState("SELECT * FROM users;");
  const [results, setResults] = useState<any[][]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [execTime, setExecTime] = useState(0);

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const seedDB = () => {
    run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);"
    );
    run(
      "INSERT OR IGNORE INTO users (name, age) VALUES ('Alice', 25), ('Bob', 30), ('Charlie', 22);"
    );
  };

  const addToHistory = useCallback((q: string) => {
    setHistory((prev) => [q, ...prev.slice(0, 9)]);
  }, []);

  useEffect(() => {
    const loadDB = async () => {
      try {
        await init("/sql-wasm.wasm");
        seedDB();
        setDbReady(true);
      } catch (err) {
        console.error("DB init failed", err);
      }
    };

    loadDB();
  }, []);

  const runQuery = useCallback(() => {
    if (!dbReady) {
      toaster.create({
        title: "DB not ready",
      });
      return;
    }

    try {
      const start = performance.now();
      const result = run(query);
      const end = performance.now();

      setExecTime(end - start);

      if ("error" in result) {
        toaster.create({
          status: "error",
          title: "SQL Error",
          description: result.error as string,
        });
        return;
      }

      const res = result.results;

      if (res && res.length > 0) {
        const { columns: cols, values } = res[0];
        setColumns(cols || []);
        setResults(values || []);

        toaster.create({
          status: "success",
          title: "Success",
          description: `${values?.length || 0} rows`,
        });
      } else {
        setColumns([]);
        setResults([]);

        toaster.create({
          status: "success",
          title: "Executed",
          description: "No results",
        });
      }

      addToHistory(query);
    } catch (err: any) {
      toaster.create({
        status: "error",
        title: "Execution Failed",
        description: err.message,
      });
    }
  }, [query, dbReady, addToHistory]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runQuery();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [runQuery]);

  const handleReset = () => {
    dbReset();
    seedDB();
    setResults([]);
    setColumns([]);
    setExecTime(0);

    toaster.create({
      title: "Database reset",
    });
  };

  const handleImport = (bytes: Uint8Array) => {
    importDatabase(bytes);
    setDbReady(true);

    toaster.create({
      title: "Database imported",
    });
  };

  const reRun = (q: string) => {
    setQuery(q);
  };

  // Run query after query updates
  useEffect(() => {
    if (dbReady) {
      runQuery();
    }
  }, [query, dbReady, runQuery]);

  const clearHistory = () => setHistory([]);

  const removeFromHistory = useCallback((queryToRemove: string) => {
    setHistory((prev) => prev.filter((q) => q !== queryToRemove));
  }, []);

  return (
    <Box bg={bg} minH="100vh" p={4}>
      <Flex justify="space-between" mb={6}>
        <Heading size="lg">SQL Playground</Heading>
        <ColorModeButton />
      </Flex>

      <Box bg={cardBg} p={6} rounded="xl" shadow="md">
        <VStack gap={6} align="stretch">
          <SQLEditor value={query} onChange={setQuery} />

          <Flex gap={4} direction={{ base: "column", md: "row" }}>
            <Button colorScheme="blue" onClick={runQuery}>
              Run (Ctrl/Cmd + Enter)
            </Button>
            <DBControls onImport={handleImport} onReset={handleReset} />
          </Flex>

          <Flex gap={6} direction={{ base: "column", md: "row" }}>
            <QueryHistory
              history={history}
              onReRun={reRun}
              onClear={clearHistory}
              onRemove={removeFromHistory}
            />
            <ResultsTable
              columns={columns}
              rows={results}
              execTime={execTime}
            />
          </Flex>

          {execTime > 0 && (
            <Text textAlign="center" opacity={0.7}>
              {execTime.toFixed(1)} ms
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
}