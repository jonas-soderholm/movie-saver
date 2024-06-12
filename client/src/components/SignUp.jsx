import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/signup/`, {
        username,
        password,
        email,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("There was an error signing up!", error.response.data);

        const data = error.response.data;
        if (data.email && data.email[0].includes("already in use")) {
          setError("Email is already in use.");
        } else if (data.username && data.username[0].includes("already exists")) {
          setError("Username already exists.");
        } else if (data.email && data.email[0].includes("incorrect format")) {
          setError("Your email is in an incorrect format.");
        } else if (data.password && data.password[0].includes("invalid")) {
          setError("Password is invalid.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        console.error("There was an error signing up!", error.message);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-[4rem]">
      <div className="py-4 text-2xl font-bold text-slate-200">SIGN UP</div>
      <div className="rounded bg-white p-8 shadow-md w-96">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <a className="font-thin">Already have an account? </a>
              <a href="/login" className="text-blue-600">
                Login
              </a>
            </span>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
