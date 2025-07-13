import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export interface AxiosMovieResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<AxiosMovieResponse>(`/search/movie`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data.results;
};
