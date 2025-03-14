import { ThemeProvider } from "@mui/material";
import { AccountBar } from "./components/accountBar.tsx";
import { Dashboard } from "./components/dashboard.tsx";
import theme from "./theme.ts";
import { TemplateDialog } from "./components/template/templateDialog.tsx";
import { EditEmailListDialog } from "./components/email/editEmailListDialog.tsx";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 2rem)",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        <TemplateDialog />
        <EditEmailListDialog />
        <AccountBar />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}
