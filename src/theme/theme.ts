import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",

  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    tokens: {
      colors: {
        brand: {
          50: { value: "#e3f2ff" },
          100: { value: "#b3daff" },
          200: { value: "#81c2ff" },
          300: { value: "#4faaff" },
          400: { value: "#1d92ff" },
          500: { value: "#0379e6" }, // primary accent
          600: { value: "#005db4" },
          700: { value: "#004182" },
          800: { value: "#002551" },
          900: { value: "#000a21" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: {
            _light: "white",
            _dark: "gray.900",
          },
        },
        text: {
          value: {
            _light: "gray.800",
            _dark: "gray.100",
          },
        },
        accent: {
          value: "{colors.brand.500}",
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
