import { Navigate, Outlet } from "react-router-dom";
import { useShine } from "../context/ShineContext";

export const ProtectedForNotAuthenticatedRoute = () => {
  const { isLoggedIn } = useShine();

  console.log("isLoggedIn", isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
