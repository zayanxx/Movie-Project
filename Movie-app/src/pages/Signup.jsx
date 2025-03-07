// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <button
          className="absolute top-4 left-4 text-white hover:text-blue-400 transition"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        
        <form>
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <FaUser className="text-blue-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <FaEnvelope className="text-green-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2">
              <FaLock className="text-red-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </label>
          </div>

          <motion.button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignupPage;
