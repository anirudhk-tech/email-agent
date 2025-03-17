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
import React, { useMemo, useState } from "react";
import { useStore } from "../../store.ts";
import { useFetchTemplates } from "../../hooks/template/useFetchTemplates.ts";
import { TemplateBar } from "./templateBar.tsx";
import { useSearch } from "../../hooks/common/useSearch.ts";
import { useBuildTemplatesDict } from "../../hooks/template/useBuildTemplatesDict.ts";

export const TemplateWidget: React.FC = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const setTemplateDialogOpen = useStore(
    (state) => state.setTemplateDialogOpen
  );
  const { templates } = useFetchTemplates();
  const { templatesDict } = useBuildTemplatesDict({ templates: templates });
  const wordArray = useMemo(
    () =>
      templates
        ? Object.keys(templates).map((key) => templates[key].subject)
        : [],
    [templates]
  );

  const { results } = useSearch({
    word: searchValue,
    wordArray: wordArray,
  });

  const handleTemplateDialogOpen = () => setTemplateDialogOpen(true);

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
        <Typography variant="h4">Templates</Typography>
        <Button
          onClick={handleTemplateDialogOpen}
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
          templatesDict &&
          results.map((result) => (
            <TemplateBar
              key={templatesDict[result]}
              name={result}
              id={templatesDict[result]}
            />
          ))}
      </Box>
    </Box>
  );
};
