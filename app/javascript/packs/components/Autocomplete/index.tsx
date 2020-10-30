import * as React from "react";
import { useClickAway } from "react-use";
import { useDispatch } from "react-redux";
import { getSuggestions } from "../../api/dadata";
import SuggestionItem from "../../components/SuggestionItem";
import { setLocation } from "../../store/location";

const Autocomplete: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState<string>("");
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(true);
  const [suggestions, setSuggestions] = React.useState<ISuggestion[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useClickAway(ref, (): void => {
    setShowSuggestions(false);
  });

  const onFocus = (): void => {
    setShowSuggestions(true);
  };

  const fetchSuggestions = async (value: string): Promise<any> => {
    return getSuggestions(value);
  };

  const onChange = async (
    e: React.FormEvent<HTMLInputElement>
  ): Promise<any> => {
    setQuery(e.currentTarget.value);
    setShowSuggestions(true);
    setLoading(true);

    try {
      const data = await fetchSuggestions(e.currentTarget.value);
      if (data && data.suggestions) setSuggestions(data.suggestions);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSuggestionClick = React.useCallback((index: number): void => {
    setSuggestions((prev) => {
      const {
        data: { city, country },
      } = prev[index];

      setQuery(city);
      dispatch(setLocation({ city, country }));
      setShowSuggestions(false);
      return prev;
    });
  }, []);

  const showSuggestionsList: boolean =
    showSuggestions && !!suggestions.length && !loading;

  return (
    <div className="container" ref={ref}>
      <input
        className="input"
        value={query}
        placeholder="Введите город"
        onChange={onChange}
        onFocus={onFocus}
      />

      {showSuggestionsList && (
        <div className="input__suggestions">
          <div className="input__suggestion-note">
            Выберите вариант или продолжите ввод
          </div>
          {suggestions.map((suggestion, index: number) => (
            <SuggestionItem
              key={suggestion.data.city}
              suggestion={suggestion}
              index={index}
              query={query}
              onSuggestionClick={handleSuggestionClick}
            />
          ))}
        </div>
      )}

      {loading && (
        <div className="input__suggestion">
          <div className="input__suggestion-note">Загружаем...</div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Autocomplete);
