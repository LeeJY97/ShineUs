import { createBrowserRouter, Navigate, RouterProvider, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MyFeed from "../pages/MyFeed";
import MyPage from "../pages/MyPage";

import { ProtectedRoute } from "./ProtectedRoute";
import { useShine } from "../context/ShineContext";

// 인가되지 않은 페이지로 이동할 때 그냥 <Home/> 을 반환하면 렌더링은 되지만
// path는 그대로 남아있음
// 그래서 인가되지 않은 페이지일 경우 그냥 '/' 으로 보냄
// function CustomRedirect() {
//   const location = useLocation();

//   if (["/signin", "/signup"].includes(location.pathname)) {
//     return <Navigate to="/" />;
//   }

//   return <Navigate to="/" />;
// }

const Routes = () => {
  const { isLoggedIn } = useShine();
  // 로그인하지 않은 사용자에게만 접근 가능한 라우트 설정
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "signin",
      element: <SignIn />
    },
    {
      path: "signup",
      element: <SignUp />
    }
  ];

  // 로그인한 사용자에게만 접근 가능한 라우트 설정
  const routesForAuthenticatedOnly = [
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "mypage",
          element: <MyPage />
        },
        {
          path: "myfeed",
          element: <MyFeed />
        },
        {
          path: "*",
          element: <Home />
          // element: <Home />
        }
      ]
    }
  ];

  const router = createBrowserRouter([
    ...(!isLoggedIn ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
