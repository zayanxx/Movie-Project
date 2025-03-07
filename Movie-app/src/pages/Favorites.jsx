import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowLeft, FaHeart } from "react-icons/fa";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <motion.div
      className="pt-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 px-4">
        <button
          className="text-white hover:text-blue-400 transition flex items-center gap-2 text-lg mt-10"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={24} /> <span className="hidden sm:inline">Back to Home</span>
        </button>
        <div className="relative flex items-center gap-2">
          <FaHeart className="text-red-500 text-3xl animate-pulse mt-2" />
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 shadow-md animate-bounce">
              {favorites.length}
            </span>
          )}
        </div>
      </div>

      <h2 className="text-4xl font-extrabold text-center mb-2 drop-shadow-lg">Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No favorite movies added yet.</p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {favorites.map((movie) => (
            <motion.div
              key={movie.imdbID}
              className="bg-gray-800 p-4 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-110 hover:shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-80 object-cover rounded-md mb-3 shadow-md"
              />
              <h3 className="text-lg font-bold text-center text-blue-300">{movie.Title}</h3>
              <p className="text-gray-400 text-center">{movie.Year}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FavoritesList;
