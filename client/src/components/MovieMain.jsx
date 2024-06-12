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
  const [userMovies, setUserMovies] = useState([]);
  const { cartItems, setCartItems } = useSharedState();
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axiosInstance.get("users/me/");
        fetchUserMovies();
      } catch (error) {
        // navigate("/login");
        console.error("You need to login", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchUserMovies = async () => {
    try {
      const response = await axiosInstance.get("users/movies/");
      setUserMovies(response.data);
    } catch (error) {
      console.error("Error fetching user's movies", error);
    }
  };

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
        }
      );
      setUserMovies((prevMovies) => [...prevMovies, movie]);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("User not authenticated. Redirecting to login.");
          navigate("/login");
        } else {
          console.error("Error adding movie to list:", error.response.data);
        }
      } else {
        console.error("Error adding movie to list:", error.message);
      }
    }
  };

  function toggleDescription(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function moreInfo(movieId) {
    window.open(`/movies/${movieId}`, "_blank");
  }

  return (
    <>
      <div className="text-2xl text-center pt-[2rem] text-slate-200">Search for any movie or series</div>
      <div className="text-2xl text-center pb-[1rem] text-slate-200">and save them to your profile</div>
      <div className="flex flex-wrap justify-center py-[6rem] text-sm gap-10 mx-4">
        <input
          type="text"
          placeholder="Search for movies by title, keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-4 absolute mt-[-5.5rem] md:w-[25rem] w-[12rem]"
        />
        {moviesData.map((movie) => {
          const isAdded = userMovies.some((userMovie) => userMovie.title === movie.title);
          return (
            <div
              key={movie.id}
              className="w-[25rem] h-auto dark:bg-neutral-800 text-slate-200 p-4 rounded-lg shadow-md mb-4 mr-4 flex flex-col justify-between"
            >
              <div>
                <img src={movie.cover_image} alt={movie.title} className="mb-2 h-[10rem] mx-auto rounded-md" />
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="">Release Date: {movie.release_date}</p>
                <p className="">
                  {expanded[movie.id] ? movie.description : `${movie.description.substring(0, 100)}...`}
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
                  className={`${
                    isAdded ? "bg-green-500" : "bg-indigo-500 hover:bg-indigo-600"
                  } text-white px-4 py-2 rounded-md`}
                  disabled={isAdded}
                >
                  {isAdded ? "Added" : "Add to My List"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MovieMain;
