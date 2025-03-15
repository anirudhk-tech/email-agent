import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import { useStore } from "../../store.ts";
import { DialogAnimation } from "../animations/dialogAnimation.tsx";
import { deleteEmail } from "../../api.ts";

interface ConfirmDiscardEmailListDraftDialogProps {
  oldEmailListName: string | undefined | null;
  setDraftEmailListName: React.Dispatch<React.SetStateAction<string>>;
}

export const ConfirmDiscardEmailListDraftDialog: React.FC<
  ConfirmDiscardEmailListDraftDialogProps
> = ({ oldEmailListName, setDraftEmailListName }) => {
  const confirmDiscardEmailListDraftDialogOpen = useStore(
    (state) => state.confirmDiscardEmailListDraftDialogOpen
  );
  const setConfirmDiscardEmailListDraftDialogOpen = useStore(
    (state) => state.setConfirmDiscardEmailListDraftDialogOpen
  );
  const setEditEmailDialogOpen = useStore(
    (state) => state.setEditEmailDialogOpen
  );
  const setEmailListEditing = useStore((state) => state.setEmailListEditing);
  const emptyEmailListAddedKeys = useStore(
    (state) => state.emptyEmailListAddedKeys
  );
  const emailsAddedKeys = useStore((state) => state.emailListAddedKeys);
  const emailListEditing = useStore((state) => state.emailListEditing);
  const emptyEmailListDeletedKeys = useStore(
    (state) => state.emptyEmailListDeletedKeys
  );

  const handleClose = () => {
    setConfirmDiscardEmailListDraftDialogOpen(false);
  };

  const handleConfirm = async () => {
    setDraftEmailListName(oldEmailListName || "");
    setConfirmDiscardEmailListDraftDialogOpen(false);
    setEditEmailDialogOpen(false);
    setEmailListEditing(null);
    await Promise.all(
      Array.from(emailsAddedKeys).map(async (key) => {
        await deleteEmail(key, emailListEditing!);
      })
    );
    emptyEmailListAddedKeys();
    emptyEmailListDeletedKeys();
  };

  return (
    <Dialog
      open={confirmDiscardEmailListDraftDialogOpen}
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
