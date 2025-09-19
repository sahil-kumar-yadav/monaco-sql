"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import initSqlJs, { Database, SqlJsStatic } from "sql.js";

import SQLEditor from "@/components/SqlEditor";
import ResultsTable from "@/components/ResultsTable";
import { toaster } from "@/components/ui/toaster";

export default function Home() {
  const [SQL, setSQL] = useState<SqlJsStatic | null>(null);
  const [db, setDb] = useState<Database | null>(null);
  const [query, setQuery] = useState("SELECT * FROM users;");
  const [results, setResults] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const loadDB = async () => {
      const SQL = await initSqlJs({
        locateFile: (file) => `/sql-wasm.wasm`,
      });
      const db = new SQL.Database();

      db.run(`
        CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);
        INSERT INTO users (name, age) VALUES ('Alice', 25);
        INSERT INTO users (name, age) VALUES ('Bob', 30);
        INSERT INTO users (name, age) VALUES ('Charlie', 22);
      `);

      setSQL(SQL);
      setDb(db);
    };

    loadDB();
  }, []);

  const runQuery = () => {
    if (!db) return;

    try {
      const res = db.exec(query);

      if (res.length > 0) {
        const { columns, values } = res[0];
        setColumns(columns);
        setResults(values);

        toaster.success({
          title: "Query successful",
          description: "Your SQL query ran successfully.",
        });
      } else {
        setColumns([]);
        setResults([]);

        toaster.success({
          title: "No results",
          description: "The query ran but returned no results.",
        });
      }
    } catch (err: any) {
      toaster.error({
        title: "SQL Error",
        description: err.message,
      });
    }
  };

  return (
    <Box bg={bg} minH="100vh">
      <Flex justify="space-between" align="center" mb={6} mt={6}>
        <Heading size="lg" color="accent">
          SQL Playground
        </Heading>
        <ColorModeButton />
      </Flex>

      <Flex direction="column" gap={6} bg={cardBg} p={6} rounded="xl" shadow="md">

        <SQLEditor value={query} onChange={setQuery} />
        <Button colorScheme="blue" alignSelf="flex-start" onClick={runQuery}>
          Run Query
        </Button>
        <ResultsTable columns={columns} rows={results} />
      </Flex>
    </Box>
  );
}
