import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import type { Movie } from "../types/movie";
import axios from "axios";
import Loader from "../Loader/Loader";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface AxiosMovieRespons {
  results: Movie[];
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (formData: FormData) => {
    setIsLoading(true);
    const query = formData.get("query")?.toString().trim();

    if (!query) return;

    setMovies([]);

    try {
      const response = await axios.get<AxiosMovieRespons>(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${myKey}`,
          },
        }
      );

      const data = response.data;

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data.results);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => console.log("Клік по фільму:", movie)}
        />
      )}
    </div>
  );
}
