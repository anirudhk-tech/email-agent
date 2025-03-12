import { useEffect, useState } from "react";
import { useStore } from "../../store.ts";
import { getEmailLists } from "../../api.ts";

export const useFetchEmailLists = () => {
  const [emailLists, setEmailLists] = useState<Record<string, string> | null>(
    null
  );
  const emailListAddedFlag = useStore((state) => state.emailListAddedFlag);

  const fetchEmailLists = async () => {
    const emailLists = await getEmailLists();
    setEmailLists(emailLists);
  };

  useEffect(() => {
    fetchEmailLists();
  }, [emailListAddedFlag]);

  return { emailLists };
};
