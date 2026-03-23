"use client";

import {
  Box,
  Text,
  Flex,
  ButtonGroup,
  IconButton,
  Icon,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip
} from "@chakra-ui/react";

import { LuDownload, LuInfo } from "react-icons/lu";

interface ResultsTableProps {
  columns: string[];
  rows: any[][];
  execTime?: number;
}

export default function ResultsTable({
  columns,
  rows,
  execTime
}: ResultsTableProps) {
  const downloadCSV = () => {
    if (rows.length === 0) return;

    const headers = columns.join(",");
    const csvRows = rows.map((row) =>
      row.map((field) => JSON.stringify(field ?? "")).join(",")
    );
    const csvContent = [headers, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "query-results.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  if (columns.length === 0) {
    return (
      <Box
        p="4"
        borderWidth="1px"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700" }}
        color="gray.500"
        rounded="md"
      >
        <Text>No results to display</Text>
      </Box>
    );
  }

  const rowCount = rows.length;

  return (
    <Box flex={1} minW={0}>
      <Flex justify="flex-end" mb={2}>
        <ButtonGroup size="sm">
          <Tooltip label="Export CSV">
            <IconButton
              aria-label="Export CSV"
              icon={<LuDownload />}
              onClick={downloadCSV}
              isDisabled={rowCount === 0}
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>

      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              {columns.map((col) => (
                <Th key={col}>{col}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {rows.map((row, i) => (
              <Tr key={i}>
                {row.map((val, j) => (
                  <Td key={j}>{String(val ?? "")}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex
        justify="space-between"
        align="center"
        mt={4}
        fontSize="sm"
        color="gray.500"
      >
        <Text>
          {rowCount} row{rowCount !== 1 ? "s" : ""}
        </Text>

        {execTime !== undefined && (
          <Text display="flex" alignItems="center">
            <Icon as={LuInfo} boxSize={3} mr={1} />
            {execTime.toFixed(1)}ms
          </Text>
        )}
      </Flex>
    </Box>
  );
}