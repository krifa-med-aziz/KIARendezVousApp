/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#93001B",
          hover: "#BB162B",
          foreground: "#FFFFFF",
        },
        background: "#F9F9F9",
        foreground: "#1A1C1C",
        muted: "#71717A",
        border: "#F4F4F5",
        surface: "#FFFFFF",
        badge: {
          red: "#FEE2E2",
        },
        elevated: "#F8F9FA",
        label: "#A1A1AA",
        /** Legacy aliases — map to design tokens */
        text: {
          primary: "#1A1C1C",
          secondary: "#71717A",
          muted: "#71717A",
        },
      },
      fontFamily: {
        jakarta: ["PlusJakartaSans_400Regular"],
        "jakarta-medium": ["PlusJakartaSans_500Medium"],
        "jakarta-semibold": ["PlusJakartaSans_600SemiBold"],
        "jakarta-bold": ["PlusJakartaSans_700Bold"],
        "jakarta-extrabold": ["PlusJakartaSans_800ExtraBold"],
        manrope: ["Manrope_400Regular"],
        "manrope-medium": ["Manrope_500Medium"],
        "manrope-semibold": ["Manrope_600SemiBold"],
        "manrope-bold": ["Manrope_700Bold"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.05)",
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
