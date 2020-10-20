import * as React from "react";
import Highlighter from "react-highlight-words";

interface ISuggestionItemProps {
  suggestion: ISuggestion;
  query: string;
  index: number;
  suggestionIndex: number;
  onSuggestionClick: (index: number) => void;
}

const SuggestionItem: React.FC<ISuggestionItemProps> = ({
  suggestion,
  query,
  index,
  suggestionIndex,
  onSuggestionClick,
}) => {
  const getHighlightWords = (query: string): string[] => {
    const words = query.replace(",", "").split(" ");
    return words;
  };

  const handleSuggestionClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const index = parseInt(event.currentTarget.dataset.index, 10);
    onSuggestionClick(index);
  };

  return (
    <li
      className={`autocomplete__suggestion ${index === suggestionIndex && "autocomplete__suggestion-current"}`}
      key={suggestion.data.city}
      data-index={index}
      onClick={handleSuggestionClick}
    >
      <Highlighter
        highlightClassName="autocomplete__highlighted"
        searchWords={getHighlightWords(query)}
        textToHighlight={suggestion.data.city}
      />
    </li>
  );
};

export default SuggestionItem;
