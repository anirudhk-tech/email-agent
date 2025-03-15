import React, { useEffect, useState } from "react";
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
import { addTemplate, editTemplate } from "../../api.ts";
import { usePrefillTemplate } from "../../hooks/template/usePrefillTemplate.ts";
import { ConfirmDeleteTemplateDialog } from "./confirmDeleteTemplateDialog.tsx";
import { ConfirmDiscardTemplateDraftDialog } from "./confirmDiscardTemplateDraftDialog.tsx";
import { useSnackbar } from "../../hooks/common/useSnackbar.ts";

export const TemplateDialog: React.FC = () => {
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const theme = useTheme();
  const { prefilledTemplate } = usePrefillTemplate();
  const templateDialogOpen = useStore((state) => state.templateDialogOpen);
  const templateEditing = useStore((state) => state.templateEditing);
  const setTemplateEditing = useStore((state) => state.setTemplateEditing);
  const setTemplateDialogOpen = useStore(
    (state) => state.setTemplateDialogOpen
  );
  const toggleTemplateChangeFlag = useStore(
    (state) => state.toggleTemplateChangeFlag
  );
  const setDeleteTemplateDialogOpen = useStore(
    (state) => state.setDeleteTemplateDialogOpen
  );
  const setConfirmDiscardTemplateDraftDialogOpen = useStore(
    (state) => state.setConfirmDiscardTemplateDraftDialogOpen
  );
  const { showSnackbar } = useSnackbar();

  const handleClose = () => {
    if (
      subject !== prefilledTemplate?.subject ||
      body !== prefilledTemplate?.body
    ) {
      handleDiscardDialogOpen();
      return;
    }
    setTemplateDialogOpen(false);
    setTemplateEditing(null);
    setSubject("");
    setBody("");
  };

  const handleAddTemplate = async () => {
    await addTemplate(subject, body);
    setTemplateDialogOpen(false);
    toggleTemplateChangeFlag();
    setSubject("");
    setBody("");
    showSnackbar({
      message: "Template added successfully",
      severity: "success",
    });
  };

  const handleDeleteDialogOpen = () => {
    setDeleteTemplateDialogOpen(true);
  };

  const handleDiscardDialogOpen = () => {
    setConfirmDiscardTemplateDraftDialogOpen(true);
  };

  const handleEditTemplate = async () => {
    if (!templateEditing) return;
    if (
      !(
        prefilledTemplate &&
        subject === prefilledTemplate.subject &&
        body === prefilledTemplate.body
      )
    ) {
      // Only edit template if there is a change
      await editTemplate(templateEditing, subject, body);
      toggleTemplateChangeFlag();

      showSnackbar({
        message: "Template edited successfully",
        severity: "success",
      });
    }
    setTemplateDialogOpen(false);
    setTemplateEditing(null);
  };

  useEffect(() => {
    if (!prefilledTemplate) return;
    setSubject(prefilledTemplate.subject);
    setBody(prefilledTemplate.body);
  }, [prefilledTemplate]);

  return (
    <Dialog
      fullScreen
      open={templateDialogOpen}
      onClose={handleClose}
      slots={{ transition: DialogAnimation }}
    >
      <ConfirmDiscardTemplateDraftDialog />
      <ConfirmDeleteTemplateDialog />
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
          New Template
        </Typography>
        <IconButton onClick={handleClose} sx={{ marginRight: "1rem" }}>
          <Cancel sx={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Box>
      <Typography sx={{ fontSize: 10, marginLeft: "1rem" }}>
        *Add a {"{name}"} tag wherever you want the name variable inserted
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          gap: "2rem",
        }}
      >
        <TextField
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          placeholder="Body"
          multiline
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={templateEditing ? handleEditTemplate : handleAddTemplate}
        >
          {templateEditing ? "Confirm" : "Create"}
        </Button>
      </Box>
      {templateEditing && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            marginBottom: "2rem",
          }}
        >
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
            sx={{
              backgroundColor: theme.palette.error.main,
              marginTop: "20px",
              width: "100%",
              alignSelf: "center",
            }}
            onClick={handleDeleteDialogOpen}
          >
            {"Delete Template"}
          </Button>
        </Box>
      )}
    </Dialog>
  );
};
