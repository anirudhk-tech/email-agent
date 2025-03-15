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
import { deleteEmailList } from "../../api.ts";
import { useSnackbar } from "../../hooks/common/useSnackbar.ts";

export const ConfirmDeleteEmailListDialog = () => {
  const deleteEmailListDialogOpen = useStore(
    (state) => state.deleteEmailListDialogOpen
  );
  const setDeleteEmailListDialogOpen = useStore(
    (state) => state.setDeleteEmailListDialogOpen
  );
  const toggleEmailListAddedFlag = useStore(
    (state) => state.toggleEmailListAddedFlag
  );
  const emailListEditing = useStore((state) => state.emailListEditing);
  const setEditEmailDialogOpen = useStore(
    (state) => state.setEditEmailDialogOpen
  );
  const { showSnackbar } = useSnackbar();

  const handleClose = () => setDeleteEmailListDialogOpen(false);
  const handleDelete = async () => {
    await deleteEmailList(emailListEditing!);
    toggleEmailListAddedFlag();
    setDeleteEmailListDialogOpen(false);
    setEditEmailDialogOpen(false);
    showSnackbar({
      message: "Email list deleted successfully",
      severity: "success",
    });
  };

  return (
    <Dialog
      open={deleteEmailListDialogOpen}
      onClose={handleClose}
      slots={{ transition: DialogAnimation }}
    >
      <DialogTitle>Delete Email List?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          All the emails within will be lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Okay</Button>
      </DialogActions>
    </Dialog>
  );
};
