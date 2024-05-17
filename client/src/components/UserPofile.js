// import React, { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axiosInstance.get("users/me/");
//         setUser(response.data);
//       } catch (error) {
//         navigate("/login");
//         console.error("You need to login", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (!user) return <div></div>;

//   return (
//     <div>
//       <h1>Welcome, {user.username}</h1>
//       <p>Email: {user.email}</p>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("users/me/");
        setUser(response.data);
        // Fetch user movies after fetching user data
        fetchUserMovies();
      } catch (error) {
        navigate("/login");
        console.error("You need to login", error);
      }
    };

    fetchUser();
  }, [navigate]); // Add navigate to the dependencies array to prevent lint warnings

  const fetchUserMovies = async () => {
    try {
      const response = await axiosInstance.get("users/movies/");
      setMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user's movies", error);
    }
  };

  if (!user) return <div></div>;

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}</h1>
      <p className="text-lg mb-4">Email: {user.email}</p>
      <h2 className="text-2xl font-bold mb-4">Your Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[25rem]">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <img src={movie.cover_image} alt={movie.title} className="w-full h-32 object-cover" />
            <div className="p-2">
              <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-600">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
