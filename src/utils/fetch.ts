/* eslint-disable @typescript-eslint/no-explicit-any */
export const apiFetch = async (
  url: string,
  body: Record<string, any>,
  signal?: AbortSignal,
): Promise<any> => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
    signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.warn(error);
      return error;
    });
};
