import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/token/`, {
        username,
        password,
      });
      console.log(response.data);
      // Save the token in local storage or state
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Redirect to profile page
      console.log("GO TO PROFILE");
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("There was an error logging in!", error.response.data);
      } else {
        console.error("There was an error logging in!", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-[4rem] mx-2">
      <div className="py-4 text-2xl font-bold">LOG IN</div>
      <div className="rounded bg-white p-8 shadow-md w-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username tjatjaj lolool@exmample.com asdasd1234!!asdas
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="text-sm mb-4">
            <span>
              <a className=" font-thin">No account? </a>
              <a href="/signup" className=" text-blue-600">
                Sign Up
              </a>
            </span>
          </div>

          {error && <div className="text-red-500">{error}</div>}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
