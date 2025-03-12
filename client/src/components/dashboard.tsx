import { Box } from "@mui/material";
import React from "react";
import { TemplateWidget } from "./template/templateWidget.tsx";
import { EmailListWidget } from "./email/emailListWidget.tsx";

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
      <TemplateWidget />
      <EmailListWidget />
    </Box>
  );
};
