import { useState, useEffect } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom";
import movieService from "../context/MovieService";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      fetchMovies(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, type]);

  const fetchMovies = async (newPage) => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.searchMovies(query, newPage, type);
      if (data.Search) {
        setMovies((prevMovies) => (newPage === 1 ? data.Search : [...prevMovies, ...data.Search]));
        setTotalResults(parseInt(data.totalResults, 10));
        setPage(newPage);
      } else {
        setMovies([]);
        setError("No results found");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const MovieCard = ({ movie }) => (
    <motion.div
      key={movie.imdbID}
      className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded-md mb-3" />
      <h3 className="text-lg font-bold">{movie.Title}</h3>
      <p className="text-gray-400">{movie.Year}</p>
      <p className="text-gray-400">{movie.Type}</p>
    </motion.div>
  );

  return (
    <div className="pt-20 px-6 bg-gray-900 text-white min-h-screen"> {/* Added padding-top for fixed navbar */}
      <div className="flex items-center mb-6">
        <button
          className="text-white hover:text-blue-400 transition mr-4"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Search Results for "{query}"</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
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
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-white text-4xl" />
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {totalResults > movies.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchMovies(page + 1)}
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

export default SearchResults;
