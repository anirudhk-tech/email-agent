import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useStore } from "../../store.ts";
import { useFetchDailyEmails } from "../../hooks/common/useFetchDailyEmails.ts";

export const AccountBar = () => {
  const setSendDialogOpen = useStore((state) => state.setSendDialogOpen);
  const totalDailyMailsSent = useStore((state) => state.totalDailyMailsSent);
  useFetchDailyEmails();
  const handleSendDialogOpen = () => {
    setSendDialogOpen(true);
  };

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
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        {totalDailyMailsSent !== null && (
          <>
            <Typography variant="h1">{totalDailyMailsSent}</Typography>
            <Typography variant="body1">Emails Sent Today</Typography>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <Button variant="contained" size="large" onClick={handleSendDialogOpen}>
          Compose
        </Button>
      </Box>
    </Box>
  );
};
