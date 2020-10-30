interface IPayload {
  from_bound: IPayloadBound;
  to_bound: IPayloadBound;
  locations: IPayloadLocation[];
  value: string;
  language: string;
  restrict_value: boolean;
  count: number;
  query: string;
}

interface IPayloadBound {
  value: string;
}

interface IPayloadLocation {
  country: string;
}

interface ISuggestionData {
  capital_marker: string;
  city: string;
  city_type_full: string;
  city_with_type: string;
  country: string;
  geo_lat: string;
  geo_lon: string;
}

interface ISuggestion {
  value: string;
  unrestricted_value: string;
  data: ISuggestionData;
}

interface ILocationContext {
  location: { city: string | null; country: string | null; },
  handleSetLocation: ({ city, country }) => void;
}

interface IState {
  location: {
    city: null | string;
    country: null | string;
  };
}


declare module 'react-redux' {
  interface DefaultRootState extends IState {}
}