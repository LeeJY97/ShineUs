import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

export const ShineContext = createContext(null);

const initialUserData = {
  session: {},
  user: {}
};

export function useShine() {
  return useContext(ShineContext);
}

addEventListener("auth", () => {});

export function ShineProvider({ children }) {
  // user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(initialUserData);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session); // session : user;

      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        setIsLoggedIn(true);
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        setIsLoggedIn(false);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  });

  // 저장하기

  // 로그인 핸들러
  const handleLogin = (data) => {
    setUser({ ...data });
    // setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(initialUserData);
    // setIsLoggedIn(false);
  };

  return (
    <ShineContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout }}>{children}</ShineContext.Provider>
  );
}
