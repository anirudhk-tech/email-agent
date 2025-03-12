import { useEffect, useState } from "react";
import { getTemplates } from "../../api.ts";
import { Template } from "../../types.ts";
import { useStore } from "../../store.ts";

export const useFetchTemplates = () => {
  const [templates, setTemplates] = useState<Record<string, Template> | null>(
    null
  );
  const templateAddedFlag = useStore((state) => state.templateAddedFlag);

  const fetchTemplates = async () => {
    const templates = await getTemplates();
    setTemplates(templates);
  };

  useEffect(() => {
    fetchTemplates();
  }, [templateAddedFlag]);

  return { templates };
};
