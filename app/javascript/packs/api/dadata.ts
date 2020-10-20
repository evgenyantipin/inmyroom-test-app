import http from "./http";

export const getSuggestions = async (query: string): Promise<ISuggestion[]> => {
  const payload: IPayload = {
    from_bound: { value: "city" },
    to_bound: { value: "city" },
    value: "city",
    language: "ru",
    locations: [{ country: "*" }],
    restrict_value: false,
    query,
    count: 10,
  };

  const data = await http<ISuggestion[]>(
    "https://dadata.ru/api/v2/suggest/address",
    "POST",
    payload,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.DADATA_TOKEN}`,
    }
  );

  return data;
};
