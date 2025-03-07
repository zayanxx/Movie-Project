import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaTicketAlt, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import movieService from "../context/MovieService";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(storedFavorites.some(fav => fav.imdbID === id));
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter(fav => fav.imdbID !== id);
    } else {
      updatedFavorites = [...storedFavorites, movie];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleBookTicketClick = () => {
    alert("Ticket booked!");
  };

  const renderStars = useMemo(() => (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars).fill(<FaStar className="text-yellow-400" />)}
        {halfStar === 1 && <FaStarHalfAlt className="text-yellow-400" />}
        {Array(emptyStars).fill(<FaRegStar className="text-yellow-400" />)}
      </>
    );
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (

    <motion.div
      className="min-h-screen flex flex-col items-center p-6 bg-gray-900 text-white pt-20" // Added pt-20 for padding top
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <MoviePoster src={movie.Poster} alt={movie.Title} />
      <MovieTitle title={movie.Title} />
      <MovieInfo year={movie.Year} genre={movie.Genre} plot={movie.Plot} />
      <MovieRating rating={movie.imdbRating} renderStars={renderStars} />
      <MovieCast cast={movie.Actors} />
      <ActionButtons
        isFavorite={isFavorite}
        onFavoriteClick={handleFavoriteClick}
        onBookTicketClick={handleBookTicketClick}
      />
    </motion.div>
  );
};

const MoviePoster = ({ src, alt }) => (
  <motion.div
    className="w-64 md:w-80 rounded-lg shadow-lg mb-6 mt-6 overflow-hidden"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    <motion.img
      src={src}
      alt={alt}
      className="w-full h-auto"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ filter: "brightness(1.1) contrast(1.2)" }}
    />
  </motion.div>
);

const MovieTitle = ({ title }) => (
  <motion.h1
    className="text-3xl md:text-4xl font-bold mb-2"
    initial={{ y: -20 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {title}
  </motion.h1>
);

const MovieInfo = ({ year, genre, plot }) => (
  <>
    <motion.p
      className="text-lg text-gray-300 mb-2"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
    >
      {year} | {genre}
    </motion.p>
    <motion.p
      className="text-gray-400 max-w-2xl text-center mb-4"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
    >
      {plot}
    </motion.p>
  </>
);

const MovieRating = ({ rating, renderStars }) => (
  <motion.div
    className="flex items-center mb-4"
    initial={{ y: -20 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
  >
    <span className="text-yellow-400 font-bold mr-2">IMDB Rating:</span>
    {renderStars(rating)}
    <span className="ml-2">{rating}</span>
  </motion.div>
);

const MovieCast = ({ cast }) => (
  <>
    <motion.h2
      className="text-2xl font-semibold mb-2"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
    >
      Cast
    </motion.h2>
    <motion.p
      className="text-gray-300 mb-4"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
    >
      {cast}
    </motion.p>
  </>
);

const ActionButtons = ({ isFavorite, onFavoriteClick, onBookTicketClick }) => (
  <div className="flex space-x-4">
    <motion.button
      onClick={onFavoriteClick}
      className={`px-4 py-2 rounded-lg flex items-center ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white font-bold transition-transform transform hover:scale-105`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isFavorite ? <FaHeart className="mr-2 animate-pulse" /> : <FaRegHeart className="mr-2 animate-pulse" />}
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </motion.button>
    <motion.button
      onClick={onBookTicketClick}
      className="px-4 py-2 rounded-lg flex items-center bg-green-500 text-white font-bold transition-transform transform hover:scale-105"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaTicketAlt className="mr-2 animate-bounce" />
      Book Ticket
    </motion.button>
  </div>
);

export default MovieDetails;
