import { useCallback } from "react";
import { useStore } from "../../store.ts";
import { SnackbarConfig } from "../../types.ts";

export const useSnackbar = () => {
  const setSnackbarConfig = useStore((state) => state.setSnackbarConfig);
  const setSnackbarOpen = useStore((state) => state.setSnackbarOpen);

  const showSnackbar = useCallback(
    (config: SnackbarConfig) => {
      setSnackbarConfig(config);
      setSnackbarOpen(true);
    },
    [setSnackbarConfig, setSnackbarOpen]
  );

  return { showSnackbar };
};
