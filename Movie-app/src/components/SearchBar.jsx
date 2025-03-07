import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieService from "../context/movieService";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const MovieCard = ({ movie, onClick }) => (
  <motion.div
    className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded-md mb-3" />
    <h3 className="text-lg font-bold">{movie.Title}</h3>
    <p className="text-gray-400">{movie.Year}</p>
    <p className="text-gray-400">{movie.Type}</p>
  </motion.div>
);

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (newPage = 1) => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.searchMovies(query, newPage, type);
      if (data.Search) {
        setMovies(newPage === 1 ? data.Search : [...movies, ...data.Search]);
        setTotalResults(parseInt(data.totalResults, 10));
        setPage(newPage);
      } else {
        setMovies([]);
        setError("No results found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full p-3 pr-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-10 top-3 text-red-400 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>
          )}
          <button
            onClick={() => handleSearch()}
            className="absolute right-3 top-3 text-blue-400 hover:text-blue-500"
          >
            <FaSearch size={20} />
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-700 text-white rounded-lg"
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center">
          <ClipLoader color="#ffffff" />
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
          />
        ))}
      </motion.div>

      {totalResults > movies.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handleSearch(page + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
