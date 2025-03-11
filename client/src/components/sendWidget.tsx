import { Box, useTheme } from "@mui/material";
import React from "react";

export const SendWidget: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 5,
        width: "100%",
      }}
    ></Box>
  );
};
