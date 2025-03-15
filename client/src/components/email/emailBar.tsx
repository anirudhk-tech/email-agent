import { Delete } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useStore } from "../../store.ts";

interface EmailBarProps {
  email: string;
  name: string;
  id: string;
}

export const EmailBar: React.FC<EmailBarProps> = ({ email, name, id }) => {
  const [deleted, setDeleted] = useState(false);
  const theme = useTheme();
  const emailListEditing = useStore((state) => state.emailListEditing);
  const addEmailListDeletedKeys = useStore(
    (state) => state.addEmailListDeletedKeys
  );

  const handleDelete = async () => {
    if (!emailListEditing) return;
    addEmailListDeletedKeys(id);
    setDeleted(true);
  };

  if (deleted) return null;

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10%",
          width: "fit-content",
        }}
      >
        <Typography sx={{ color: "black", fontWeight: "bold", width: "30vw" }}>
          {name}{" "}
        </Typography>
        <Typography
          sx={{
            color: "black",
            width: "fit-content",
          }}
        >
          {email}
        </Typography>
      </Box>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <IconButton size="small">
          <Delete sx={{ color: "black" }} onClick={handleDelete} />
        </IconButton>
      </Box>
    </Box>
  );
};
