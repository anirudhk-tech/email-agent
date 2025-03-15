import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useStore } from "../../store.ts";
import { DialogAnimation } from "../animations/dialogAnimation.tsx";
import { useState } from "react";
import { addEmail } from "../../api.ts";
import { useSnackbar } from "../../hooks/common/useSnackbar.ts";

export const AddEmailDialog = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [emailName, setEmailName] = useState<string>("");
  const addEmailListAddedKeys = useStore(
    (state) => state.addEmailListAddedKeys
  );
  const addEmailDialogOpen = useStore((state) => state.addEmailDialogOpen);
  const toggleEmailListEmailsEdittedFlag = useStore(
    (state) => state.toggleEmailListEmailsEdittedFlag
  );
  const setAddEmailDialogOpen = useStore(
    (state) => state.setAddEmailDialogOpen
  );
  const emailListEditing = useStore((state) => state.emailListEditing);
  const { showSnackbar } = useSnackbar();

  const handleClose = async () => {
    setAddEmailDialogOpen(false);
  };

  const handleCreate = async () => {
    if (!emailAddress || !emailName || !emailListEditing) return;
    const response = await addEmail(emailAddress, emailName, emailListEditing);
    addEmailListAddedKeys(response["key"]);
    toggleEmailListEmailsEdittedFlag();
    setAddEmailDialogOpen(false);
    showSnackbar({ message: "Email Added", severity: "success" });
  };

  return (
    <Dialog
      open={addEmailDialogOpen}
      onClose={handleClose}
      slots={{ transition: DialogAnimation }}
    >
      <DialogTitle>Add Email</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter an email addresses and name</DialogContentText>
        <TextField
          onChange={(e) => setEmailAddress(e.target.value)}
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          onChange={(e) => setEmailName(e.target.value)}
          required
          margin="dense"
          id="name"
          name="email"
          label="Associated Name"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
