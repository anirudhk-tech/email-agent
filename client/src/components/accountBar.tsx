import { Box, Typography } from "@mui/material";
import React from "react";

export const AccountBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h1">Dashboard</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">March 6th 2024</Typography>
          <Typography variant="body1">2:04 PM</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 3,
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h1">96</Typography>
        <Typography variant="body1">Unread emails</Typography>
      </Box>
    </Box>
  );
};
