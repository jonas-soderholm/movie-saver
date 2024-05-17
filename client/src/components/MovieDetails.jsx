import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useSharedState } from "../SharedContext.js";

const API_KEY = "07b4e7818081deeb46a009a35c0d4535"; // Your TMDb API key

function MovieDetails() {
  const { movieId } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const { cartItems, setCartItems } = useSharedState();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((response) => {
        setMovie({
          id: response.data.id,
          title: response.data.title,
          description: response.data.overview,
          cover_image: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
          release_date: response.data.release_date,
          price: "N/A", // TMDb API doesn't provide price info
        });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  function addToMyList(movie) {
    const newCartItems = [...cartItems, movie];
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    console.log(newCartItems);
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center py-[8rem] text-sm mx-4">
      <div className="w-[25rem] h-auto bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <img src={movie.cover_image} alt={movie.title} className="mb-2 h-[10rem] mx-auto rounded-md" />
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p className="text-gray-700">Price: {movie.price}</p>
          <p className="text-gray-700">Release Date: {movie.release_date}</p>
          <p className="text-gray-700">{movie.description}</p>
        </div>
        <button
          onClick={() => addToMyList(movie)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md mt-4"
        >
          Add to My List
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
