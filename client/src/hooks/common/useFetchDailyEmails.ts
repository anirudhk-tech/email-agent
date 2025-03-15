import { useCallback, useEffect } from "react";
import { getDailyEmails } from "../../api.ts";
import { useStore } from "../../store.ts";

export const useFetchDailyEmails = () => {
  const setTotalDailyMailsSent = useStore(
    (state) => state.setTotalDailyMailsSent
  );

  const fetchDailyEmails = useCallback(async () => {
    const response = await getDailyEmails();
    setTotalDailyMailsSent(response.count);
  }, [setTotalDailyMailsSent]);

  useEffect(() => {
    fetchDailyEmails();
  }, [fetchDailyEmails]);
};
