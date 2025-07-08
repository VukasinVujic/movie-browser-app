const API_KEY = "d9d70785";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query: string) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
