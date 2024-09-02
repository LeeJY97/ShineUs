import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useShine } from "../context/ShineContext";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useShine();
  const { pathname } = useLocation();

  console.log("isLoggedIn", isLoggedIn);
  console.log("pathname", pathname);

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          redirectedFrom: pathname
        }}
      />
    );
  }

  return <Outlet />;
};
