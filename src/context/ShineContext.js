import { createContext, useContext, useState } from "react";

export const ShineContext = createContext(null);


const initialUserData = {
  session: {},
  user: {},
}

export function useShine() {
  return useContext(ShineContext);
}

export function ShineProvider({ children }) {
  // user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(initialUserData);

  // 로그인 핸들러
  const handleLogin = (auth) => {
    setUser({ ...auth });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(initialUserData);
    setIsLoggedIn(false);
  }

  return (
    <ShineContext.Provider
      value={{ isLoggedIn, user, handleLogin, handleLogout }}
    >
      {children}
    </ShineContext.Provider>
  );
}