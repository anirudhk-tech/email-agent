import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import { DialogAnimation } from "../animations/dialogAnimation.tsx";
import { useStore } from "../../store.ts";

export const LoginDialog = () => {
  const loginDialogOpen = useStore((state) => state.loginDialogOpen);
  const setLoginDialogOpen = useStore((state) => state.setLoginDialogOpen);

  const handleClose = () => {
    setLoginDialogOpen(false);
  };

  const handleLogin = () => {
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&` +
      `redirect_uri=http://localhost:3000&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(
        "openid email https://www.googleapis.com/auth/gmail.send"
      )}&` +
      `access_type=offline` +
      `&prompt=consent`;

    window.location.href = authUrl;
  };

  return (
    <Dialog
      open={loginDialogOpen}
      onClose={handleClose}
      slots={{ transition: DialogAnimation }}
    >
      <DialogTitle>Let's sign you in</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Login with the account you'd like to send emails with.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
    </Dialog>
  );
};
