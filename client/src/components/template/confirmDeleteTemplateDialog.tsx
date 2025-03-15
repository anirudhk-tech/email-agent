import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteTemplate } from "../../api.ts";
import { useStore } from "../../store.ts";
import * as React from "react";
import { DialogAnimation } from "../animations/dialogAnimation.tsx";
import { useSnackbar } from "../../hooks/common/useSnackbar.ts";

export const ConfirmDeleteTemplateDialog = () => {
  const templateEditing = useStore((state) => state.templateEditing);
  const toggleTemplateChangeFlag = useStore(
    (state) => state.toggleTemplateChangeFlag
  );
  const deleteTemplateDialogOpen = useStore(
    (state) => state.deleteTemplateDialogOpen
  );
  const setDeleteTemplateDialogOpen = useStore(
    (state) => state.setDeleteTemplateDialogOpen
  );
  const setTemplateDialogOpen = useStore(
    (state) => state.setTemplateDialogOpen
  );
  const setTemplateEditting = useStore((state) => state.setTemplateEditing);
  const { showSnackbar } = useSnackbar();

  const handleDelete = async () => {
    await deleteTemplate(templateEditing!);
    toggleTemplateChangeFlag();
    setDeleteTemplateDialogOpen(false);
    setTemplateDialogOpen(false);
    setTemplateEditting(null);
    showSnackbar({
      message: "Template deleted successfully",
      severity: "success",
    });
  };

  const handleClose = () => setDeleteTemplateDialogOpen(false);

  return (
    <Dialog
      open={deleteTemplateDialogOpen}
      onClose={handleClose}
      slots={{ transition: DialogAnimation }}
    >
      <DialogTitle>Delete Template?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This template's data will be erased.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Okay</Button>
      </DialogActions>
    </Dialog>
  );
};
