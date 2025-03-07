import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-72 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-bold text-center text-white">{movie.Title}</h3>
      <p className="text-gray-400 text-center">{movie.Year}</p>
    </motion.div>
  );
};

export default MovieCard;
