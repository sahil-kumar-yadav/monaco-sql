"use client";

import { Box, Text, Table } from "@chakra-ui/react";

interface ResultsTableProps {
  columns: string[];
  rows: any[][];
}

export default function ResultsTable({ columns, rows }: ResultsTableProps) {
  if (columns.length === 0) {
    return (
      <Box
        p="4"
        borderWidth="1px"
        borderColor="border.disabled"
        color="fg.disabled"
        mt="4"
        rounded="md"
      >
        <Text>No results to display</Text>
      </Box>
    );
  }

  return (
    <Table.Root size="sm" showColumnBorder mt="4">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeader key={col}>{col}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row, i) => (
          <Table.Row key={i}>
            {row.map((val, j) => (
              <Table.Cell key={j}>{String(val)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
