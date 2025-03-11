import { Box } from "@mui/material";
import React from "react";
import { SendWidget } from "./sendWidget.tsx";
import { TemplateWidget } from "./templateWidget.tsx";
import { EmailWidget } from "./emailWidget.tsx";

export const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        flex: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: "1.5rem",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          gap: "1.5rem",
        }}
      >
        <SendWidget />
        <TemplateWidget />
      </Box>
      <EmailWidget />
    </Box>
  );
};
