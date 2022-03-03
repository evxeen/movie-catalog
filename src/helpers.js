export const getData = (search, page) => {
  return fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=${search}&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.Error) {
        throw new Error(data.Error);
      }
      return data;
    });
};
