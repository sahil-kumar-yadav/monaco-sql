"use client";

import { Button, ButtonGroup, Flex, IconButton, Tooltip, useToast, VStack } from "@chakra-ui/react";
import { LuDownload, LuRefreshCw, LuUpload } from "react-icons/lu";
import { exportDatabase, reset } from "@/lib/sqlEngine";

interface DBControlsProps {
  onImport: (bytes: Uint8Array) => void;
  onReset: () => void;
}

export default function DBControls({ onImport, onReset }: DBControlsProps) {
  const toast = useToast();

  const handleExport = () => {
    try {
      const data = exportDatabase();
      const blob = new Blob([data]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "database.sqlite";
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Database exported", status: "success" });
    } catch (e) {
      toast({ title: "Export failed", status: "error" });
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const bytes = new Uint8Array(ev.target?.result as ArrayBuffer);
      onImport(bytes);
      toast({ title: "Database imported", status: "success" });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Flex gap={4} wrap="wrap" align="center">
      <ButtonGroup size="sm">
        <Tooltip label="Reset DB">
          <IconButton
            aria-label="Reset DB"
            icon={<LuRefreshCw />}
            variant="outline"
            onClick={onReset}
          />
        </Tooltip>
        <Tooltip label="Export">
          <IconButton aria-label="Export DB" icon={<LuDownload />} onClick={handleExport} />
        </Tooltip>
        <label>
          <input
            type="file"
            hidden
            onChange={handleFileImport}
            accept=".sqlite"
          />
          <Tooltip label="Import DB">
            <IconButton aria-label="Import DB" icon={<LuUpload />} />
          </Tooltip>
        </label>
      </ButtonGroup>
    </Flex>
  );
}

