import { Edit } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { useStore } from "../../store.ts";

interface EmailListBarProps {
  name: string;
  id: string;
}

export const EmailListBar: React.FC<EmailListBarProps> = ({ name, id }) => {
  const theme = useTheme();
  const setEditEmailDialogOpen = useStore(
    (state) => state.setEditEmailDialogOpen
  );
  const setEmailListEditing = useStore((state) => state.setEmailListEditing);

  const handleEmailListDialogOpen = () => {
    setEditEmailDialogOpen(true);
    setEmailListEditing(id);
  };

  return (
    <Box
      sx={{
        height: "fit-content",
        width: "100%",
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "0.5rem",
        paddingTop: "0.5rem",
        alignItems: "center",
      }}
    >
      <Typography variant="body2">{name}</Typography>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <IconButton size="small">
          <Edit sx={{ color: "white" }} onClick={handleEmailListDialogOpen} />
        </IconButton>
      </Box>
    </Box>
  );
};
