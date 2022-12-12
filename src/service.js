export const fetchData = (url, method = "get") => {
  return fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
};
