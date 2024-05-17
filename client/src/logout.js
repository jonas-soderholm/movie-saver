const logout = () => {
  // Clear tokens from local storage
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export default logout;
