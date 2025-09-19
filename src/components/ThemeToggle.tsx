"use client";

import { useState, useEffect } from "react";
import { IconButton, Skeleton, HStack } from "@chakra-ui/react";
import { LuMoon, LuSun, LuStar } from "react-icons/lu";
import { useColorMode } from "@/components/ui/color-mode";

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  const [custom, setCustom] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const applyCustomAccent = () => {
    setCustom(true);
    document.documentElement.style.setProperty("--ck-colors-accent", "#0379e6");
  };

  if (!mounted) return <Skeleton boxSize="8" />;

  const Icon = custom ? LuStar : colorMode === "light" ? LuMoon : LuSun;

  return (
    <HStack gap="2">
      <IconButton
        aria-label="Toggle Theme"
        size="sm"
        variant="outline"
        colorPalette="gray"
        onClick={() => {
          toggleColorMode();
          if (custom) setCustom(false);
        }}
      >
        <Icon />
      </IconButton>

      {!custom && (
        <IconButton
          aria-label="Custom Accent"
          size="sm"
          variant="outline"
          colorPalette="blue"
          onClick={applyCustomAccent}
        >
          <LuStar />
        </IconButton>
      )}
    </HStack>
  );
}
