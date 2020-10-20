import * as React from "react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useClickAway } from "react-use";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { getSuggestions } from "../../api/dadata";
import SuggestionItem from "../../components/SuggestionItem";
import { setLocation, IState } from "../../store/location";

const Autocomplete: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState<string>("");
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(true);
  const [suggestions, setSuggestions] = React.useState<ISuggestion[]>([]);
  const [suggestionIndex, setSuggestionIndex] = React.useState(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const reset = (): void => {
    setShowSuggestions(false);
    setQuery("");
    setSuggestions([]);
    setSuggestionIndex(0);
  };

  useClickAway(ref, (): void => {
    reset();
  });

  const onFocus = (): void => {
    setShowSuggestions(true);
  };

  const fetchSuggestions = async (value: string): Promise<any> => {
    return getSuggestions(value);
  };

  const debounced = useDebouncedCallback(
    async (value) => {
      const data = await fetchSuggestions(value);
      if (data && data.suggestions) setSuggestions(data.suggestions);
      setLoading(false);
      setShowSuggestions(true);
    },
    500
  );

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setLoading(true);
    setQuery(e.currentTarget.value);
    debounced.callback(e.currentTarget.value);
  };

  const handleSuggestionClick = (index: number): void => {
    const {
      data: { city, country_iso_code },
    } = suggestions[index];
    dispatch(setLocation({ city, country: country_iso_code }));
    reset();
  };

  const onKeyDown = (event) => {
    if (event.which === 40 && suggestionIndex < suggestions.length - 1) {
      // Arrow down
      setSuggestionIndex(suggestionIndex + 1);
    } else if (event.which === 38 && suggestionIndex > 0) {
      // Arrow up
      setSuggestionIndex(suggestionIndex - 1);
    } else if (event.which === 13 && suggestionIndex >= 0) {
      // Enter
      const {
        data: { city, country_iso_code },
      } = suggestions[suggestionIndex];
      dispatch(setLocation({ city, country: country_iso_code }));
      reset();
    }
  };

  return (
    <div className="autocomplete" ref={ref}>
      <input
        list="data"
        type="text"
        className="autocomplete__input"
        value={query}
        placeholder="Введите город"
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      {!loading && query.length > 0 && (
        <div
          className="autocomplete__append autocomplete__append-close"
          onClick={reset}
        >
          {<AiOutlineClose />}
        </div>
      )}

      {loading && (
        <div className="autocomplete__append autocomplete__append-spinner">
          <AiOutlineLoading3Quarters />
        </div>
      )}

      {showSuggestions && !!suggestions.length && !loading && (
        <ul className="autocomplete__suggestions">
          <li key={-1} className="autocomplete__suggestion_note">
            Выберите вариант или продолжите ввод
          </li>

          {suggestions.map((suggestion, index: number) => (
            <SuggestionItem
              key={suggestion.data.city + suggestion.data.country}
              suggestion={suggestion}
              index={index}
              query={query}
              suggestionIndex={suggestionIndex}
              onSuggestionClick={handleSuggestionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
