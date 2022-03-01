export const getData = (search) => {
   return fetch(`https://www.omdbapi.com/?s=${search}&apikey=8523cbb8`).then(res => res.json());
}