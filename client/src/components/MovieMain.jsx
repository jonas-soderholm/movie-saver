import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../utils/AuthContext.js";
import { useSharedState } from "../SharedContext.js";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function MovieMain() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const { cartItems, setCartItems } = useSharedState();
  const [expanded, setExpanded] = useState({});
  const [addedMovieIds, setAddedMovieIds] = useState([]); // Store IDs of movies already added
  const [showAddedText, setShowAddedText] = useState(false); // Control visibility of "Added" text
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const [addedText, setAddedText] = useState("Added");

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
      const addedIds = storedCartItems.map((item) => item.id);
      setAddedMovieIds(addedIds);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (searchTerm) {
          response = await axiosInstance.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
          );
        } else {
          response = await axiosInstance.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        }

        const movies = response.data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          cover_image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          release_date: movie.release_date,
          price: "N/A",
        }));
        setMoviesData(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  const addToMyList = async (movie) => {
    try {
      // Check if movie is already added

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/add_movie/`,
        {
          title: movie.title,
          description: movie.description,
          cover_image: movie.cover_image,
          release_date: movie.release_date,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        setAddedText("Added")
      ); // Update addedMovieIds with the new ID
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("User not authenticated. Redirecting to login.");
          navigate("/login");
        } else {
          console.error("Error adding movie to list:", error.response.data);
          setAddedText("Movie already added");
        }
      } else {
        console.error("Error adding movie to list:", error.message);
      }
    }

    setTimeout(() => setShowAddedText(false), 1000);
    setAddedMovieIds([movie.id]);
    setShowAddedText(true);
  };

  function toggleDescription(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function moreInfo(movieId) {
    window.open(`/movies/${movieId}`, "_blank");
  }

  return (
    <>
      <div className="text-2xl text-center pt-[2rem]">Search for any movie or series</div>
      <div className="text-2xl text-center  pb-[1rem]">And save them to your profile</div>
      <div className="flex flex-wrap justify-center py-[6rem] text-sm gap-10 mx-4">
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
              <p className="text-gray-700">Release Date: {movie.release_date}</p>
              <p className="text-gray-700">
                {expanded[movie.id] ? movie.description : `${movie.description.substring(0, 100)}...`}
              </p>
            </div>
            <div className="flex justify-between mt-4 relative">
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
            {addedMovieIds.includes(movie.id) && showAddedText && (
              <span className="text-xl text-center absolute left-1/2 bottom-1/1 my-[14rem] transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-2 py-1 rounded-md">
                {addedText}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieMain;
