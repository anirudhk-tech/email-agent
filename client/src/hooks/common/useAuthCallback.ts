import { useCallback, useEffect } from "react";
import { sendAuthCodeToServer } from "../../api.ts";
import { useStore } from "../../store.ts";

export const useAuthCallback = () => {
  const setLoginDialogOpen = useStore((state) => state.setLoginDialogOpen);

  const handleExchangeAuthCode = useCallback(
    async (code: string) => {
      const response = await sendAuthCodeToServer(code);

      if (response) {
        setLoginDialogOpen(false);
      }
    },
    [setLoginDialogOpen]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      handleExchangeAuthCode(code);
    }
  }, [handleExchangeAuthCode]);
};
