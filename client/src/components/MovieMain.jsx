import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is configured to handle authenticated requests
import { useSharedState } from "../SharedContext.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const API_KEY = "07b4e7818081deeb46a009a35c0d4535"; // Your TMDb API key

function MovieMain() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const { cartItems, setCartItems } = useSharedState();
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      axiosInstance
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`)
        .then((response) => {
          const movies = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            cover_image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            release_date: movie.release_date,
            price: "N/A", // TMDb API doesn't provide price info
          }));
          setMoviesData(movies);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, [searchTerm]);

  function addToMyList(movie) {
    axiosInstance
      .post("/api/movies/add_movie/", {
        title: movie.title,
        description: movie.description,
        cover_image: movie.cover_image,
        release_date: movie.release_date,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding movie to list:", error);
      });
  }
  function toggleDescription(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function moreInfo(movieId) {
    window.open(`/movies/${movieId}`, "_blank"); // Open in a new tab
  }

  return (
    <div className="flex flex-wrap justify-center py-[8rem] text-sm gap-10 mx-4">
      <input
        type="text"
        placeholder="Search for movies by title, keyword"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4 absolute mt-[-5.5rem] md:w-[25rem] w-[12rem]"
      />
      {moviesData.map((movie) => (
        <div
          key={movie.id}
          className="w-[25rem] h-auto bg-gray-100 p-4 rounded-lg shadow-md mb-4 mr-4 flex flex-col justify-between"
        >
          <div>
            <img src={movie.cover_image} alt={movie.title} className="mb-2 h-[10rem] mx-auto rounded-md" />
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p className="text-gray-700">Price: {movie.price}</p>
            <p className="text-gray-700">Release Date: {movie.release_date}</p>
            <p className="text-gray-700">
              {expanded[movie.id] ? movie.description : `${movie.description.substring(0, 100)}...`}
              {/* <button onClick={() => toggleDescription(movie.id)} className="text-indigo-500 hover:underline ml-1">
                {expanded[movie.id] ? "Read Less" : "Read More"}
              </button> */}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => moreInfo(movie.id)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              More Info
            </button>
            <button
              onClick={() => addToMyList(movie)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Add to My List
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieMain;