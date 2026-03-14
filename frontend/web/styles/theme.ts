const theme = {
  colors: {
    background: "#f6f5f2",
    surface: "#ffffff",
    textPrimary: "#000000",
    textMuted: "rgb(90, 90, 90)",
    card: "#dddddd",
    border: "#e2e0da",
    borderSearch: "#c4c4c4",
    accent: "#00562e",
    footer: "#006e3a",
    bottomBar: "#134F2E",
    interactive: "#007aff",
  },
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    headingFamily: "Roboto, Helvetica, Arial, sans-serif",

    text: {
      xs: "0.6rem", // 9.6px
      sm: "0.7rem", // 11.2px
      md: "0.8rem", // 12.8px
      lg: "0.8125rem", // 13px
      xl: "0.875rem", // 14px
      xxl: "0.9rem", // 14.4px
      base: "1rem", // 16px
    },

    heading: {
      xxs: "0.7rem", // 11.2px
      xs: "0.875rem", // 14px
      sm: "1rem", // 16px
      md: "1.1rem", // 17.6px
      lg: "1.4rem", // 22.4px
      xl: "1.5rem", // 24px
      xxl: "1.6rem", // 25.6px
      xxxl: "1.75rem", // 28px
      displaySm: "1.8rem", // 28.8px
      displayMd: "1.9rem", // 30.4px
      displayLg: "2.125rem", // 34px
      displayXl: "3.5rem", // 56px
    },
  },

  layout: {
    containerMaxWidth: "100%",
    containerPadding: { xs: 0, md: "24px" },
  },
  radius: {
    xxsm: "2px",
    xsm: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xlg: "36px",
  },
  shadow: {
    sm: "0 10px 30px rgba(0, 0, 0, 0.06)",
  },
} as const;

export type AppTheme = typeof theme;

export default theme;
