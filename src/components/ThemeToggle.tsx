"use client";

import { useState, useEffect } from "react";
import { IconButton, Skeleton } from "@chakra-ui/react";
import { LuMoon, LuSun, LuStar } from "react-icons/lu";
import { useColorMode } from "./ui/color-mode";

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
    <>
      <IconButton
        aria-label="Toggle Theme"
        size="sm"
        variant="outline"
        colorPalette="gray"
        onClick={() => {
          if (custom) {
            toggleColorMode();
            setCustom(false);
          } else {
            toggleColorMode();
          }
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
          ml={2}
          onClick={applyCustomAccent}
        >
          <LuStar />
        </IconButton>
      )}
    </>
  );
}
