import { Box, useTheme } from "@mui/material";
import React from "react";

export const EmailWidget: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 5,
        height: "100%",
      }}
    ></Box>
  );
};
