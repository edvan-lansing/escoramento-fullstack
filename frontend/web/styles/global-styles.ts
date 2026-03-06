import theme from "./theme";

const globalStyles = {
  "*, *::before, *::after": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  html: {
    WebkitTextSizeAdjust: "100%",
    textRendering: "optimizeLegibility",
  },
  body: {
    minHeight: "100%",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.text.base,
    lineHeight: 1.6,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.background,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  "img, picture, video, canvas, svg": {
    display: "block",
    maxWidth: "100%",
  },
  "input, button, textarea, select": {
    font: "inherit",
    color: "inherit",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  "h1, h2, h3, h4, h5, h6": {
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  "p + p": {
    marginTop: "0.75rem",
  },
  ":root": {
    colorScheme: "light",
  },
  ".container": {
    width: "100%",
    maxWidth: theme.layout.containerMaxWidth,
    margin: "0 auto",
    padding: 0,
    "@media (min-width:900px)": {
      padding: "0 24px",
    },
  },
} as const;

export default globalStyles;
