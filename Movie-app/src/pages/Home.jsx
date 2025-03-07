// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFire, FaStar, FaCalendarAlt } from "react-icons/fa";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import movieService from "../context/movieService";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("popular");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.searchMovies(category);
        setMovies(data.Search || []);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category]);

  const handleCategoryChange = async (newCategory) => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieService.searchMovies(newCategory);
      setMovies(data.Search || []);
      setCategory(newCategory);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center bg-gray-900 text-white p-4 md:p-6 overflow-hidden mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 opacity-40 blur-3xl"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 3, ease: "easeInOut" }}
      ></motion.div>

      {/* Title */}
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold mb-4 text-center drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Welcome to Movie Explorer
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-sm md:text-lg text-gray-300 mb-6 text-center max-w-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        Discover and explore your favorite movies effortlessly with an immersive and user-friendly interface.
      </motion.p>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-lg px-4">
        {[
          { label: "Popular", icon: <FaFire />, category: "popular" },
          { label: "Top Rated", icon: <FaStar />, category: "top_rated" },
          { label: "Upcoming", icon: <FaCalendarAlt />, category: "upcoming" },
        ].map(({ label, icon, category: cat }) => (
          <motion.button
            key={cat}
            className="flex-1 bg-opacity-90 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-bold shadow-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange(cat)}
            style={{
              backgroundColor:
                cat === "popular"
                  ? "#1E40AF"
                  : cat === "top_rated"
                  ? "#B45309"
                  : "#047857",
              color: "white",
            }}
          >
            {icon} {label}
          </motion.button>
        ))}
      </div>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center text-white mt-8">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-8">{error}</p>}

      {/* Movie Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 w-full px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <motion.div
              key={movie.imdbID}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">No movies found.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
