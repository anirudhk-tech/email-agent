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

export const ConfirmDiscardTemplateDraftDialog = () => {
  const confirmDiscardTemplateDraftDialogOpen = useStore(
    (state) => state.confirmDiscardTemplateDraftDialogOpen
  );
  const setConfirmDiscardTemplateDraftDialogOpen = useStore(
    (state) => state.setConfirmDiscardTemplateDraftDialogOpen
  );
  const setTemplateDialogOpen = useStore(
    (state) => state.setTemplateDialogOpen
  );
  const setTemplateEditing = useStore((state) => state.setTemplateEditing);

  const handleConfirm = async () => {
    setConfirmDiscardTemplateDraftDialogOpen(false);
    setTemplateDialogOpen(false);
    setTemplateEditing(null);
  };

  const handleClose = () => {
    setConfirmDiscardTemplateDraftDialogOpen(false);
  };

  return (
    <Dialog
      open={confirmDiscardTemplateDraftDialogOpen}
      onClose={handleClose}
      slots={{ transition: DialogAnimation }}
    >
      <DialogTitle>Discard draft?</DialogTitle>
      <DialogContent>
        <DialogContentText>Unsaved changes will be lost.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Okay</Button>
      </DialogActions>
    </Dialog>
  );
};
