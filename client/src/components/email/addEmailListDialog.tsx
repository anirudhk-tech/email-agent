import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogAnimation } from "../animations/dialogAnimation.tsx";
import { useStore } from "../../store.ts";
import { addEmailList } from "../../api.ts";
import { useState } from "react";
import { useSnackbar } from "../../hooks/common/useSnackbar.ts";

export const AddEmailListDialog = () => {
  const [listName, setListName] = useState("");
  const addEmailListDialogOpen = useStore(
    (state) => state.addEmailListDialogOpen
  );
  const setAddEmailListDialogOpen = useStore(
    (state) => state.setAddEmailListDialogOpen
  );
  const toggleEmailListAddedFlag = useStore(
    (state) => state.toggleEmailListAddedFlag
  );
  const { showSnackbar } = useSnackbar();

  const handleClose = () => {
    setAddEmailListDialogOpen(false);
  };

  const handleAdd = async () => {
    if (listName.trim().length !== 0) {
      await addEmailList(listName);
      showSnackbar({
        message: "Email list added successfully",
        severity: "success",
      });
    }
    toggleEmailListAddedFlag();
    setAddEmailListDialogOpen(false);
  };

  return (
    <Dialog
      open={addEmailListDialogOpen}
      onClose={handleClose}
      slots={{ transition: DialogAnimation }}
    >
      <DialogTitle>Add New Email List</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a name for your new list</DialogContentText>
        <TextField
          onChange={(e) => setListName(e.target.value)}
          required
          margin="dense"
          label="List Name"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
