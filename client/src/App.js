import { ThemeProvider } from "@mui/material";
import { AccountBar } from "./components/common/accountBar.tsx";
import { Dashboard } from "./components/common/dashboard.tsx";
import theme from "./theme.ts";
import { TemplateDialog } from "./components/template/templateDialog.tsx";
import { EditEmailListDialog } from "./components/email/editEmailListDialog.tsx";
import { Notification } from "./components/common/notification.tsx";
import { SendDialog } from "./components/send/sendDialog.tsx";
import { LoginDialog } from "./components/common/loginDialog.tsx";
import { useLogin } from "./hooks/common/useLogin.ts";
import { useAuthCallback } from "./hooks/common/useAuthCallback.ts";

export default function App() {
  useLogin();
  useAuthCallback();

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
        <LoginDialog />
        <SendDialog />
        <Notification />
        <TemplateDialog />
        <EditEmailListDialog />
        <AccountBar />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}
