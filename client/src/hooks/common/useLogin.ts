import { useCallback, useEffect } from "react";
import { checkCredentials } from "../../api.ts";
import { useStore } from "../../store.ts";

export const useLogin = () => {
  const setLoginDialogOpen = useStore((state) => state.setLoginDialogOpen);

  const handleCheckCredentials = useCallback(async () => {
    const response = await checkCredentials();

    if (response) {
      setLoginDialogOpen(!response["credentials_found"]);
    }
  }, [setLoginDialogOpen]);

  useEffect(() => {
    handleCheckCredentials();
  }, [handleCheckCredentials]);
};
