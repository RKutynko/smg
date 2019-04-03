let currentUser = null;
let currentToken = null;

const AUTH_TOKE_KEY = "auth token";
const USER_KEY = "user";

export const initializePreviouslyLoggedInUser = () => {
  currentToken = localStorage.getItem(AUTH_TOKE_KEY);
  currentUser = JSON.parse(localStorage.getItem(USER_KEY));
};

export const setCurrentUser = (token, user) => {
  if (!token) throw new Error("token is required");
  if (!user) throw new Error("user is required");
  storeToken(token, user);
  currentToken = token;
  currentUser = user;
};

export const logoutUser = () => {
  currentUser = null;
  currentToken = null;
  clearToken();
};

export const getCurrentUser = () => currentUser;
export const getToken = () => currentToken;
export const isAuthenticated = () => !!currentUser;

const storeToken = (token, user) => {
  localStorage.setItem(AUTH_TOKE_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearToken = () => {
  localStorage.removeItem(AUTH_TOKE_KEY);
  localStorage.removeItem(USER_KEY);
};
