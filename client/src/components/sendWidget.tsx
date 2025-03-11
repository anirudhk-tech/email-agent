import { Autocomplete, Box, Button, TextField, useTheme } from "@mui/material";
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
        flexDirection: "row",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 3,
          width: "100%",
          gap: "1rem",
          paddingLeft: "1rem",
        }}
      >
        <Autocomplete
          disablePortal
          options={[]}
          sx={{
            width: "90%",
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: 5,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Template"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          )}
        />
        <Autocomplete
          disablePortal
          options={[]}
          sx={{
            width: "90%",
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: 5,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="List"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          )}
        />
      </Box>
      <Box sx={{ flex: 1, paddingRight: "1rem" }}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
