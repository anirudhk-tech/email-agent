import { Alert, Snackbar } from "@mui/material";
import { useStore } from "../../store.ts";
import * as React from "react";

export const Notification = () => {
  const snackbarOpen = useStore((state) => state.snackbarOpen);
  const snackbarConfig = useStore((state) => state.snackbarConfig);
  const setSnackbarOpen = useStore((state) => state.setSnackbarOpen);
  const setSnackbarConfig = useStore((state) => state.setSnackbarConfig);

  const handleClose = () => {
    setSnackbarOpen(false);
    setSnackbarConfig(null);
  };

  if (!snackbarConfig) return null;

  return (
    <Snackbar
      open={snackbarOpen}
      onClose={handleClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarConfig.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarConfig.message}
      </Alert>
    </Snackbar>
  );
};
