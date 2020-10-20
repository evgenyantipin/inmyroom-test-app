import * as React from "react";
import { useClickAway } from "react-use";
import { getSuggestions } from "../../api/dadata";
import { getGeodata } from "../../api/geocode";
import SuggestionsList from "../../components/SuggestionList";

interface IGeodataData {
  cache_hit: null;
  bogon?: boolean;
  city?: string;
  country?: string;
  ip: string;
  loc?: string;
  postal?: string;
  readme?: string;
  region: string;
  timezone: string;
}

interface IGeodata {
  geodata: {
    ip: string;
    data: IGeodataData;
  };
}

interface IAutocompleteProps {
  token: string;
}

const Autocomplete: React.FC<IAutocompleteProps> = (props) => {
  const [query, setQuery] = React.useState<string>("");
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(true);
  const [suggestions, setSuggestions] = React.useState([]);
  const [suggestionIndex, setSuggestionIndex] = React.useState(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    setShowSuggestions(false);
    setQuery("");
    setSuggestions([]);
  });

  React.useEffect(() => {
    getGeodata().then((result: IGeodata) => {
      if (result.geodata.data.city) {
        setQuery(`${result.geodata.data.city}`);
      }
    });
  }, []);

  const onChange = (e): void => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setLoading(true);

    const payload = {
      from_bound: { value: "city" },
      to_bound: { value: "city" },
      value: "city",
      language: "ru",
      locations: [{ country: "*" }],
      restrict_value: false,
      query: e.target.value,
      count: 10,
    };

    getSuggestions(payload, props.token).then((data) => {
      setSuggestions(data.suggestions);
      setSuggestionIndex(0);
      setLoading(false);
    });
  };

  const handleSuggestionClick = React.useCallback((index: number): void => {
    setSuggestions((prev) => {
      const {
        data: { city },
      } = prev[index];

      setQuery(city);
      setShowSuggestions(false);
      setSuggestions([]);
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
        placeholder="Please, enter city"
        onChange={onChange}
      />

      {showSuggestionsList && (
        <SuggestionsList
          suggestions={suggestions}
          suggestionIndex={suggestionIndex}
          query={query}
          onSuggestionClick={handleSuggestionClick}
        />
      )}

      {loading && (
        <div className="input__suggestion">
          <span>Загружаем...</span>
        </div>
      )}

      {showSuggestions &&
        suggestions.length === 0 &&
        query.length > 0 &&
        !loading && (
          <div className="input__suggestion">
            <span>Ничего не найдено</span>
          </div>
        )}
    </div>
  );
};

export default Autocomplete;
