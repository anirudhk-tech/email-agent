import { useEffect, useState } from "react";
import { Template } from "../../types";

export const useBuildTemplatesDict = ({
  templates,
}: {
  templates: Record<string, Template> | null;
}) => {
  const [templatesDict, setTemplatesDict] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    if (!templates) return;
    const dict = {};
    Object.keys(templates).map((key) => (dict[templates[key].subject] = key));
    setTemplatesDict(dict);
  }, [templates]);

  return { templatesDict };
};
