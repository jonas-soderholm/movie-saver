import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("users/me/");
        setUser(response.data);
        fetchUserMovies();
      } catch (error) {
        navigate("/login");
        console.error("You need to login", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchUserMovies = async () => {
    try {
      const response = await axiosInstance.get("users/movies/");
      setMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user's movies", error);
    }
  };

  const openMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const removeFromMyList = async (movieId) => {
    try {
      const response = await axiosInstance.delete(`users/remove_movie/${movieId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      fetchUserMovies();
    } catch (error) {
      if (error.response) {
        console.error("Error removing movie from list:", error.response.data);
      } else {
        console.error("Error removing movie from list:", error.message);
      }
    }
  };

  if (!user) return <div></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {user.username}</h1>
      <p className="text-lg mb-4 text-center">Email: {user.email}</p>
      <h2 className="text-2xl font-bold mb-4 text-center pt-12">Your saved movies/series</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center pt-2">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg overflow-hidden shadow-lg relative">
            <img src={movie.cover_image} alt={movie.title} className="w-full h-32 object-cover" />
            <div className="p-2">
              <h3 className="text-sm font-semibold mb-1">{movie.title}</h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openMovieDetails(movie);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md absolute top-2 left-2 text-sm"
            >
              More Info
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromMyList(movie.id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md absolute top-2 right-2 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full p-4">
            <h2 className="text-xl font-bold mb-4">{selectedMovie.title}</h2>
            <p className="mb-2">
              <strong>Description:</strong> {selectedMovie.description}
            </p>
            <p className="mb-2">
              <strong>Release Date:</strong> {selectedMovie.release_date}
            </p>
            {/* Add more movie details here */}
            <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
