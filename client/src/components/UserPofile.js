import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("users/me/");
        setUser(response.data);
      } catch (error) {
        navigate("/login");
        console.error("You need to login", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div></div>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
