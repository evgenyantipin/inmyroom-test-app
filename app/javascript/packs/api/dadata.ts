import fetch from "isomorphic-unfetch";

interface IPayload {
  query: string;
  count: number;
}

export const getSuggestions = (payload: IPayload, token: string) => {
  return fetch("https://dadata.ru/api/v2/suggest/address", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }).then((r) => r.json());
};
