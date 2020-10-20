import * as React from "react";
import Highlighter from "react-highlight-words";

interface ISuggestionItemProps {
  suggestion: ISuggestion;
  query: string;
  index: number;
  onSuggestionClick: (index: number) => void;
}

const SuggestionItem: React.FC<ISuggestionItemProps> = ({
  suggestion,
  query,
  index,
  onSuggestionClick,
}) => {
  const wordsToPass: string[] = ["г"];

  const getHighlightWords = (query: string): string[] => {
    const words = query.replace(",", "").split(" ");
    const filteredWords = words.filter((word) => wordsToPass.indexOf(word) < 0);
    return filteredWords;
  };

  const handleClick = (index: number): void => {
    onSuggestionClick(index);
  };

  return (
    <div
      key={suggestion.data.city}
      onClick={() => handleClick(index)}
      className="input__suggestion"
    >
      <Highlighter
        highlightClassName="highlighted"
        searchWords={getHighlightWords(query)}
        textToHighlight={suggestion.data.city}
      />
    </div>
  );
};

export default React.memo(SuggestionItem);
