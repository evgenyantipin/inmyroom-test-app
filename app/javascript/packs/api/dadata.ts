import fetch from "isomorphic-unfetch";

export const getSuggestions = (query: string) => {
  const payload: IPayload = {
    from_bound: { value: "city" },
    to_bound: { value: "city" },
    value: "city",
    language: "en",
    locations: [{ country: "*" }],
    restrict_value: false,
    query,
    count: 10,
  };

  return fetch("https://dadata.ru/api/v2/suggest/address", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.DADATA_TOKEN}`,
    },
  }).then((r) => r.json());
};
