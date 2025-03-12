import { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

export const useSearch = ({
  word,
  wordArray,
}: {
  word: string;
  wordArray: string[] | null;
}) => {
  const [results, setResults] = useState<string[]>([]);

  const fuse = useMemo(() => {
    if (!wordArray) return null;
    const options = {
      includeScore: true,
      threshold: 0.3,
    };
    return new Fuse(wordArray, options);
  }, [wordArray]);

  const findResults = useCallback(() => {
    if (!fuse) return;
    const searchResults = fuse.search(word);
    setResults(searchResults.map((result) => result.item));
  }, [fuse, word]);

  useEffect(() => {
    if (!wordArray) return;
    if (word.trim().length === 0) {
      setResults(wordArray);
      return;
    } else {
      findResults();
    }
  }, [word, wordArray, findResults]);

  return { results };
};
