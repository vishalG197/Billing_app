import React, { createContext, useState, useContext } from 'react';

// Step 2: Define the context
const AuthContext = createContext({
  isAuth: false, // Default value for isAuth
  userData: null, // Default value for userData
  login: () => {}, // Placeholder function for login
  logout: () => {}, // Placeholder function for logout
});

// Step 3: Create the context provider
export function AuthContextProvider({ children }) {
  // Use useState to manage isAuth and userData
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);

  // Define functions to set isAuth and userData
  const login = (user) => {
    setIsAuth(true);
    setUserData(user);
  };

  const logout = () => {
    setIsAuth(false);
    setUserData(null);
  };

  // Provide the context values to children
  const contextValue = {
    isAuth,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Step 4: Export the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
