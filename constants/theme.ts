/** Aligns with Home + global.css tokens */
export const theme = {
  colors: {
    primary: "#93001B",
    primaryHover: "#BB162B",
    background: "#F9F9F9",
    surface: "#FFFFFF",
    text: "#1A1C1C",
    textSecondary: "#71717A",
    textMuted: "#71717A",
    border: "#F4F4F5",
    elevated: "#F8F9FA",
    badgeRed: "#FEE2E2",
    label: "#A1A1AA",
    error: "#93001B",
    success: "#1A1C1C",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    titleLarge: {
      fontSize: 28,
      fontWeight: "700" as const,
      color: "#1A1C1C",
    },
    section: {
      fontSize: 22,
      fontWeight: "700" as const,
      color: "#1A1C1C",
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
      color: "#1A1C1C",
    },
    bodySm: {
      fontSize: 14,
      fontWeight: "400" as const,
      color: "#71717A",
    },
    caption: {
      fontSize: 12,
      fontWeight: "600" as const,
      color: "#71717A",
    },
    label: {
      fontSize: 10,
      fontWeight: "700" as const,
      letterSpacing: 1,
      color: "#71717A",
    },
  },
};
