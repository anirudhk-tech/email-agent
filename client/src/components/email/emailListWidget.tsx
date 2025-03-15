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
import React, { useMemo, useState } from "react";
import { Cancel, Search } from "@mui/icons-material";
import { useFetchEmailLists } from "../../hooks/email/useFetchEmailLists.ts";
import { useSearch } from "../../hooks/common/useSearch.ts";
import { EmailListBar } from "./emailListBar.tsx";
import { useStore } from "../../store.ts";
import { AddEmailListDialog } from "./addEmailListDialog.tsx";

export const EmailListWidget: React.FC = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const { emailLists } = useFetchEmailLists();
  const wordArray = useMemo(
    () => (emailLists ? Object.keys(emailLists) : []),
    [emailLists]
  );
  const { results } = useSearch({
    word: searchValue,
    wordArray: wordArray,
  });
  const setAddEmailListDialogOpen = useStore(
    (state) => state.setAddEmailListDialogOpen
  );

  const handleOpenAddEmailListDialog = () => {
    setAddEmailListDialogOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 5,
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AddEmailListDialog />
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
        <Typography variant="h4">Emails List</Typography>
        <Button
          onClick={handleOpenAddEmailListDialog}
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
      <Box
        sx={{
          height: "100%",
          overflow: "scroll",
          width: "90%",
          marginTop: "2%",
          scrollbarWidth: "none",
        }}
      >
        {results &&
          emailLists &&
          results.map((result) => (
            <EmailListBar
              key={emailLists[result]}
              name={result}
              id={emailLists[result]}
            />
          ))}
      </Box>
    </Box>
  );
};
