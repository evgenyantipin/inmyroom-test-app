import * as React from "react";
import Highlighter from "react-highlight-words";

interface ISuggestionListProps {
  suggestions: any;
  suggestionIndex: number;
  query: string;
  onSuggestionClick: (index: number) => void;
}

const SuggestionsList: React.FC<ISuggestionListProps> = ({
  suggestions,
  suggestionIndex,
  query,
  onSuggestionClick,
}) => {
  const wordsToPass = [
    "г",
    "респ",
    "ул",
    "р-н",
    "село",
    "деревня",
    "поселок",
    "пр-д",
    "пл",
    "к",
    "кв",
    "обл",
    "д",
  ];

  const getHighlightWords = (query: string): Array<string> => {
    const words = query.replace(",", "").split(" ");
    const filteredWords = words.filter((word) => wordsToPass.indexOf(word) < 0);
    return filteredWords;
  };

  const handleClick = (index: number): void => {
    onSuggestionClick(index);
  };

  return (
    <div className="input__suggestions">
      <div className="input__suggestion-note">
        Выберите вариант или продолжите ввод
      </div>
      {suggestions.map(({ value }, index: number) => (
        <div
          key={value}
          onClick={() => handleClick(index)}
          className={`input__suggestion ${
            index === suggestionIndex && "input__suggestion--current"
          }`}
        >
          <Highlighter
            highlightClassName="highlighted"
            searchWords={getHighlightWords(query)}
            textToHighlight={value}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(SuggestionsList);
