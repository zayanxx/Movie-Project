import { useState, useEffect } from "react";
import { FaSearch, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesCount(storedFavorites.length);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setMenuOpen(false); // Close the menu after search
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="text-2xl font-bold flex items-center hover:text-yellow-400 transition duration-300">
            🎬 MovieSearch
          </Link>
        </motion.div>

        {/* Desktop Search Bar */}
        <motion.div className="hidden md:flex items-center bg-gray-800 px-4 py-2 rounded-lg w-96" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-transparent text-white focus:outline-none w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch className="text-gray-400 ml-2 cursor-pointer hover:text-white transition duration-300" onClick={handleSearch} />
        </motion.div>

        {/* Icons for Favorites & Login */}
        <motion.div className="hidden md:flex space-x-6 items-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Link to="/favorites" className="hover:text-red-400 relative transition duration-300">
            <FaHeart size={22} />
            {favoritesCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{favoritesCount}</span>}
          </Link>
          <Link to="/login" className="hover:text-blue-400 transition duration-300">
            <FaUser size={22} />
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setMenuOpen(false)} />
            <motion.div className="fixed top-0 right-0 w-64 bg-gray-800 h-full z-20 p-4" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3 }}>
              <div className="flex flex-col space-y-4">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                  <Link to="/favorites" className="flex items-center space-x-2 hover:text-red-400 transition duration-300">
                    <FaHeart /> <span>Favorites</span>
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                  <Link to="/login" className="flex items-center space-x-2 hover:text-blue-400 transition duration-300">
                    <FaUser /> <span>Login / Sign Up</span>
                  </Link>
                </motion.div>
                <motion.div className="flex items-center bg-gray-700 px-3 py-2 rounded-md" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                  <input
                    type="text"
                    placeholder="Search movies..."
                    className="bg-transparent text-white focus:outline-none w-full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <FaSearch className="text-gray-400 ml-2 cursor-pointer hover:text-white transition duration-300" onClick={handleSearch} />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
