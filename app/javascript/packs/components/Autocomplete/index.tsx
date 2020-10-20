import * as React from "react";
import { useClickAway } from "react-use";
import { getSuggestions } from "../../api/dadata";
import SuggestionItem from "../../components/SuggestionItem";
import { LocationContext } from "../../LocationContext";

interface IAutocompleteProps {
  token: string;
}

const Autocomplete: React.FC<IAutocompleteProps> = (props) => {
  const contextData = React.useContext<ILocationContext>(LocationContext);

  const [query, setQuery] = React.useState<string>("");
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(true);
  const [suggestions, setSuggestions] = React.useState<ISuggestion[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setQuery(contextData.location.city)
  }, [contextData.location]);

  useClickAway(ref, (): void => {
    setShowSuggestions(false);
  });

  const onFocus = (): void => {
    setShowSuggestions(true);
  };

  const fetchSuggestions = async (payload: IPayload): Promise<any> => {
    return getSuggestions(payload, props.token);
  };

  const onChange = async (
    e: React.FormEvent<HTMLInputElement>
  ): Promise<any> => {
    setQuery(e.currentTarget.value);
    setShowSuggestions(true);
    setLoading(true);

    const payload: IPayload = {
      from_bound: { value: "city" },
      to_bound: { value: "city" },
      value: "city",
      language: "ru",
      locations: [{ country: "*" }],
      restrict_value: false,
      query: e.currentTarget.value,
      count: 10,
    };

    try {
      const data = await fetchSuggestions(payload);
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
      contextData.setLocation({ city, country });
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

export default Autocomplete;
