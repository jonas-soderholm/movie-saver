import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);

  const loginUser = async (username, password) => {
    const response = await axios.post("token/", {
      username,
      password,
    });
    setAuthTokens(response.data);
  };

  const logoutUser = () => {
    setAuthTokens(null);
  };

  return <AuthContext.Provider value={{ authTokens, loginUser, logoutUser }}>{children}</AuthContext.Provider>;
};
