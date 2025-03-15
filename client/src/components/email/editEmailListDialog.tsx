import React from "react";
import { useStore } from "../../store.ts";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DialogAnimation } from "../animations/dialogAnimation.tsx";
import { Cancel } from "@mui/icons-material";
import { useFetchEditingEmailListDetails } from "../../hooks/email/useFetchEditingEmailDetails.ts";
import { EmailBar } from "./emailBar.tsx";
import { Email } from "../../types.ts";
import { AddEmailDialog } from "./addEmailDialog.tsx";
import { deleteEmail, editEmailName } from "../../api.ts";
import { usePrefillEmailListName } from "../../hooks/email/usePrefillEmailListName.ts";
import { ConfirmDeleteEmailListDialog } from "./confirmDeleteEmailListDialog.tsx";
import { ConfirmDiscardEmailListDraftDialog } from "./confirmDiscardEmailListDraftDialog.tsx";
import { useSnackbar } from "../../hooks/common/useSnackbar.ts";

interface EditEmailListDialogProps {
  listName: string;
}

export const EditEmailListDialog: React.FC<EditEmailListDialogProps> = () => {
  const theme = useTheme();
  const setAddEmailDialogOpen = useStore(
    (state) => state.setAddEmailDialogOpen
  );
  const editEmailDialogOpen = useStore((state) => state.editEmailDialogOpen);
  const setEditEmailDialogOpen = useStore(
    (state) => state.setEditEmailDialogOpen
  );
  const toggleEmailListAddedFlag = useStore(
    (state) => state.toggleEmailListAddedFlag
  );
  const emptyEmailListAddedKeys = useStore(
    (state) => state.emptyEmailListAddedKeys
  );
  const emptyEmailListDeletedKeys = useStore(
    (state) => state.emptyEmailListDeletedKeys
  );
  const emailListEditing = useStore((state) => state.emailListEditing);
  const emailListAddedKeys = useStore((state) => state.emailListAddedKeys);
  const emailListDeletedKeys = useStore((state) => state.emailListDeletedKeys);

  const { emailListName, emails } = useFetchEditingEmailListDetails();
  const { newEmailListName, setNewEmailListName } = usePrefillEmailListName({
    emailListName,
  });
  const setDeleteEmailListDialogOpen = useStore(
    (state) => state.setDeleteEmailListDialogOpen
  );
  const setConfirmDiscardEmailListDraftDialogOpen = useStore(
    (state) => state.setConfirmDiscardEmailListDraftDialogOpen
  );
  const toggleEmailListEmailsEdittedFlag = useStore(
    (state) => state.toggleEmailListEmailsEdittedFlag
  );
  const { showSnackbar } = useSnackbar();

  const handleClose = async () => {
    if (
      emailListName !== newEmailListName ||
      emailListAddedKeys.size > 0 ||
      emailListDeletedKeys.size > 0
    ) {
      setConfirmDiscardEmailListDraftDialogOpen(true);
      return;
    }
    setEditEmailDialogOpen(false);
  };

  const handleAddEmailOpen = () => {
    setAddEmailDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (newEmailListName !== emailListName) {
      await editEmailName(newEmailListName, emailListEditing!);
      toggleEmailListAddedFlag();
    }

    if (emailListDeletedKeys.size > 0) {
      await Promise.all(
        Array.from(emailListDeletedKeys).map(async (key) => {
          await deleteEmail(key, emailListEditing!);
        })
      );
      toggleEmailListEmailsEdittedFlag();
    }

    if (
      newEmailListName !== emailListName ||
      emailListAddedKeys.size > 0 ||
      emailListDeletedKeys.size > 0
    ) {
      showSnackbar({
        message: "Email list edited successfully",
        severity: "success",
      });
    }

    setEditEmailDialogOpen(false);
    emptyEmailListAddedKeys();
    emptyEmailListDeletedKeys();
  };

  const handleOpenConfirmDeleteEmailListDialog = () => {
    setDeleteEmailListDialogOpen(true);
  };

  return (
    <Dialog
      fullScreen
      open={editEmailDialogOpen}
      onClose={handleClose}
      slots={{ transition: DialogAnimation }}
    >
      <ConfirmDiscardEmailListDraftDialog
        oldEmailListName={emailListName}
        setDraftEmailListName={setNewEmailListName}
      />
      <ConfirmDeleteEmailListDialog />
      <AddEmailDialog />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "fit-content",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" sx={{ marginLeft: "1rem" }}>
          Edit Email List
        </Typography>
        <IconButton onClick={handleClose} sx={{ marginRight: "1rem" }}>
          <Cancel sx={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          gap: "2rem",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10%" }}>
          <TextField
            placeholder="Email list name"
            value={newEmailListName}
            onChange={(e) => setNewEmailListName(e.target.value)}
            sx={{ flex: 4 }}
          />
          <Button
            sx={{
              flex: 1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
            onClick={handleAddEmailOpen}
          >
            New Email
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "40vh",
            overflow: "auto",
            scrollbarWidth: "none",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {emails &&
            emails.map((email: Email) => (
              <EmailBar
                key={email.key}
                email={email.email}
                name={email.name}
                id={email.key}
              />
            ))}
        </Box>
        <Button variant="contained" onClick={handleConfirm}>
          {"Confirm"}
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: 0,
              border: `2px solid ${theme.palette.error.main}`,
            }}
          ></Box>
          <Typography
            sx={{
              color: theme.palette.error.main,
              flex: 1,
              textAlign: "center",
            }}
          >
            DANGER ZONE
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: 0,
              border: `2px solid ${theme.palette.error.main}`,
            }}
          ></Box>
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.error.main }}
          onClick={handleOpenConfirmDeleteEmailListDialog}
        >
          {"Delete List"}
        </Button>
      </Box>
    </Dialog>
  );
};
