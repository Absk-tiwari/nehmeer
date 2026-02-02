import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute.js'

const FullLayout = lazy(() => import("../components/layouts/FullLayout.js"));

/***** Pages ****/
const Login = lazy(() => import("../components/auth/Login.js"))
const Register = lazy(() => import("../components/auth/Register.js"))
const Dashboard = lazy(() => import("../components/Dashboard.js"));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to={"/login"} /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/register", exact: true, element: <Register /> },
      {
        path: "/dashboard",
        exact: true,
        element: (
          <ProtectedRoute>
            <Dashboard key={11} />
          </ProtectedRoute>
        )
      },
    ],
  },

];

export default ThemeRoutes;
