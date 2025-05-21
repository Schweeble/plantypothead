import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#4caf50", // Green color for plant theme
    },
    secondary: {
      main: "#2e7d32", // Darker green
    },
  },
  components: {
    MuiBadge: {
      styleOverrides: {
        badge: {
          zIndex: 9999, // Ensure badge is always on top
          transform: "scale(1) translate(25%, -25%)", // Position the badge better
        },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
