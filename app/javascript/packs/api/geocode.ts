import fetch from "isomorphic-unfetch";

export const getGeodata = () => {
  return fetch(`/api/v1/geocode`).then((r) => r.json());
};
