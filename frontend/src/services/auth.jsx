// services/auth.js

export const setAuthToken = (token,userid) => {
  if (token) {
    localStorage.setItem("jwtToken", token); // Save token to localStorage
    localStorage.setItem("userid", userid);
  } else {
    localStorage.removeItem("jwtToken"); // Remove token from localStorage
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("jwtToken"); // Get token from localStorage
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return token ? true : false;
};

export const logout = () => {
  setAuthToken(null); // Remove token when logging out
};
