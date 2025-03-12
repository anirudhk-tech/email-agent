import { useEffect, useState, useCallback } from "react";
import { useStore } from "../../store.ts";
import { getTemplate } from "../../api.ts";
import { Template } from "../../types.ts";

export const usePrefillTemplate = () => {
  const [prefilledTemplate, setPrefilledTemplate] = useState<Template | null>(
    null
  );

  const templateEditing = useStore((state) => state.templateEditing);

  const fetchTemplate = useCallback(async () => {
    if (!templateEditing) return;
    const template = await getTemplate(templateEditing);
    setPrefilledTemplate(template);
  }, [templateEditing]);

  useEffect(() => {
    if (!templateEditing) return;
    fetchTemplate();
  }, [templateEditing, fetchTemplate]);

  return { prefilledTemplate };
};
