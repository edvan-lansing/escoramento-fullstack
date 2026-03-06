import { createTheme } from "@mui/material/styles";
import baseTheme from "./theme";

const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: baseTheme.colors.accent,
      contrastText: "#ffffff",
    },
    background: {
      default: baseTheme.colors.background,
      paper: baseTheme.colors.surface,
    },
    text: {
      primary: baseTheme.colors.textPrimary,
      secondary: baseTheme.colors.textMuted,
    },
    divider: baseTheme.colors.border,
  },
  typography: {
    fontFamily: baseTheme.typography.fontFamily,
    h1: {
      fontFamily: baseTheme.typography.headingFamily,
      fontSize: baseTheme.typography.heading.displayLg,
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: baseTheme.typography.headingFamily,
      fontSize: baseTheme.typography.heading.displayMd,
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: baseTheme.typography.headingFamily,
      fontSize: baseTheme.typography.heading.displaySm,
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    body1: {
      fontSize: baseTheme.typography.text.base,
    },
    body2: {
      fontSize: baseTheme.typography.text.xl,
    },
    caption: {
      fontSize: baseTheme.typography.text.xs,
      lineHeight: 1.4,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: baseTheme.colors.background,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          gap: "8px",
          borderRadius: baseTheme.radius.sm,
          fontWeight: 600,
          letterSpacing: "0.01em",
          padding: "10px 18px",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: baseTheme.shadow.sm,
          },
          "&.Mui-focusVisible": {
            outline: `2px solid ${baseTheme.colors.textPrimary}`,
            outlineOffset: "2px",
          },
        },
      },
    },
  },
});

export default muiTheme;
