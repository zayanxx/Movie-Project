import axios from "axios";

const API_KEY = "ef5e1e51"; // Replace with your actual API key or use environment variables in a real project
const BASE_URL = "https://www.omdbapi.com/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: { apikey: API_KEY },
});

// Function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data.Error || "Unknown error");
    return error.response.data.Error || "An error occurred while fetching data.";
  } else if (error.request) {
    console.error("Network Error: No response received from API.");
    return "Network error. Please check your internet connection.";
  } else {
    console.error("Request Error:", error.message);
    return "Something went wrong. Please try again.";
  }
};

const movieService = {
  // Fetch movies based on search query, page number, and optional type filter
  searchMovies: async (query, page = 1, type = "") => {
    try {
      if (!query) throw new Error("Search query is required.");
      
      const { data } = await apiClient.get("", {
        params: { s: query, page, type },
      });

      if (data.Response === "False") {
        throw new Error(data.Error || "No movies found.");
      }

      return data;
    } catch (error) {
      return { error: handleApiError(error) };
    }
  },

  // Fetch movie details by IMDb ID
  getMovieDetails: async (movieId) => {
    try {
      if (!movieId) throw new Error("Movie ID is required.");
      
      const { data } = await apiClient.get("", {
        params: { i: movieId, plot: "full" },
      });

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie details not found.");
      }

      return data;
    } catch (error) {
      return { error: handleApiError(error) };
    }
  },
};

export default movieService;
