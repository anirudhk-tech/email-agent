import { useCallback, useEffect, useState } from "react";
import { useStore } from "../../store.ts";
import { getEmailsFromList } from "../../api.ts";
import { Email } from "../../types.ts";

export const useFetchEditingEmailListDetails = () => {
  const [emailListName, setEmailListName] = useState<string>();
  const [emails, setEmails] = useState<Email[]>();

  const emailListEditing = useStore((state) => state.emailListEditing);
  const emailListEmailsEdittedFlag = useStore(
    (state) => state.emailListEmailsEdittedFlag
  );

  const fetchEmailListDetails = useCallback(async () => {
    if (!emailListEditing) return;
    const listData = await getEmailsFromList(emailListEditing);
    const listName = listData["name"];
    const emails = listData["emails"];
    setEmailListName(listName);
    setEmails(emails);
  }, [emailListEditing]);

  useEffect(() => {
    fetchEmailListDetails();
  }, [emailListEditing, fetchEmailListDetails, emailListEmailsEdittedFlag]);

  return { emailListName, emails, setEmailListName };
};
