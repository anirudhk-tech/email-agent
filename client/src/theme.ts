import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#334155",
      light: "#475569",
      dark: "#1e293b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F8FAFC",
      paper: "#ffffff",
    },
    text: {
      primary: "#1F2937",
      secondary: "#64748B",
    },
    divider: "#E2E8F0",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 550,
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      "@media (max-width:600px)": {
        fontSize: "0.75rem",
      },
    },
  },
});

export default theme;
