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

type IPayloadBound = Pick<IPayload, "value">;

interface ISuggestionData {
  country_iso_code: string;
  capital_marker: string;
  city: string;
  city_type_full: string;
  city_with_type: string;
  country: string;
  geo_lat: string;
  geo_lon: string;
}

type IPayloadLocation = Pick<ISuggestionData, "country">;

interface ISuggestion {
  value: string;
  unrestricted_value: string;
  data: ISuggestionData;
}
