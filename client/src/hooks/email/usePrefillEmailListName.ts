import { useEffect, useState } from "react";

export const usePrefillEmailListName = ({
  emailListName,
}: {
  emailListName: string | undefined | null;
}) => {
  const [newEmailListName, setNewEmailListName] = useState<string>(
    emailListName || ""
  );

  useEffect(() => {
    setNewEmailListName(emailListName || "");
  }, [emailListName]);

  return { newEmailListName, setNewEmailListName };
};
