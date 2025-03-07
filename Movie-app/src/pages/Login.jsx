import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    // Simulate successful login
    navigate("/");
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 relative">
        <button
          className="absolute top-4 left-4 text-white hover:text-blue-400 transition"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-400">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center bg-gray-700 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent text-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-gray-700 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent text-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
