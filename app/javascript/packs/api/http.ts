async function http<T, B = undefined>(
  url: string,
  method: string = "get",
  body: B | {} = undefined,
  headers = {}
): Promise<T> {
  const res = await fetch(`${url}`, {
    method: method.toUpperCase(),
    body: typeof body === "object" ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return (await res.json()) as Promise<T>;
}

export default http;
