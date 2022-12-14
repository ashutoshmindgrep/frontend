export const fetchData = (url, method = "GET", data) => {
  return fetch(url, {
    method: method,
    data,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
};
