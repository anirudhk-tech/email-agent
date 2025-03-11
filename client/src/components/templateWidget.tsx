import { Cancel, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useStore } from "../store.ts";

export const TemplateWidget: React.FC = () => {
  const theme = useTheme();
  const searchValue = useStore((state) => state.templateWidgetSearchValue);
  const setSearchValue = useStore(
    (state) => state.setTemplateWidgetSearchValue
  );

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 5,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          marginTop: "2%",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Templates List</Typography>
        <Button
          sx={{
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.contrastText,
          }}
        >
          New
        </Button>
      </Box>
      <FormControl
        variant="standard"
        sx={{
          width: "90%",
          backgroundColor: theme.palette.primary.contrastText,
          marginTop: "2%",
          borderRadius: 2,
        }}
      >
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment
              position="end"
              onClick={() => setSearchValue("")}
              sx={{
                cursor: "pointer",
                visibility: searchValue.length ? "visible" : "hidden",
              }}
            >
              <IconButton>
                <Cancel />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};
