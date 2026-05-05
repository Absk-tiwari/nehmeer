import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { PublicRoute } from "./PublicRoute.js";

import ForgotPassword from "../components/auth/ForgotPassword.js";
import ResetPassword from "../components/auth/ResetPassword.js";
import OtpVerify from "../components/auth/OtpVerify.js";
import CompleteProfile from "../components/CompleteProfile.js";
import Notifications from "../components/dashboard/Notifications.jsx";
import Search from "../components/search/Search.jsx";
import SelectAddress from "../components/location/SelectAddress.jsx";
import ServiceList from "../components/pages/ServiceList.jsx";
import ServiceDetails from "../components/pages/ServiceDetails.jsx";
import CreatePost from "../components/pages/CreatePost.jsx";
import AllPostsScreen from "../components/pages/AllPostsScreen.js";
import ManageWorkers from "../components/manageWorkers/ManageWorkers.jsx";
import FeedbackPage from "../components/manageWorkers/FeedbackPage.jsx";
import StopServicePage from "../components/manageWorkers/StopServicePage.jsx";
import WorkerProfile from "../components/manageWorkers/WorkerProfile.jsx";
import Profile from "../components/profile/Profile.jsx";
import LanguageSelector from "../components/common/LanguageSelector.jsx";
import Subscription from "../components/profile/Subscription.jsx";
import Terms from "../components/profile/Terms.jsx";
import PrivacyPolicy from "../components/profile/PrivacyPolicy.jsx";
import License from "../components/profile/License.jsx";
import Favourites from "../components/profile/Favourites.jsx";
import SavedLocation from "../components/profile/SavedLocation.jsx";
import Settings from "../components/profile/Settings.jsx";
import ChangePassword from "../components/profile/ChangePassword.jsx";
import HelpSupport from "../components/profile/HelpSupport.jsx";
import CustomRequirements from "../components/posts/CustomRequirements.jsx";
import CustomDuties from "../components/pages/CustomDuties.jsx";
import CustomSubmit from "../components/pages/CustomSubmit.jsx";

const FullLayout = lazy(() => import("../components/layouts/FullLayout.js"));

/***** Pages ****/
const Login = lazy(() => import("../components/auth/Login.js"));
const Register = lazy(() => import("../components/auth/Register.js"));
const Dashboard = lazy(() => import("../components/Dashboard.js"));

/**** Routes ****/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      // Default redirect
      { path: "/", element: <Navigate to="/dashboard" /> },

      // Public Routes (Auth pages - redirect to dashboard if logged in)
      { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "/register", element: <PublicRoute><Register /></PublicRoute> },
      { path: "/forgot-password", element: <PublicRoute><ForgotPassword /></PublicRoute> },
      { path: "/reset-password", element: <PublicRoute><ResetPassword /></PublicRoute> },
      { path: "/otp", element: <PublicRoute><OtpVerify /></PublicRoute> },

      // Protected Routes (require login)
      { path: "/complete-profile", element: <ProtectedRoute><CompleteProfile /></ProtectedRoute> },
      { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: "/notifications", element: <ProtectedRoute><Notifications /></ProtectedRoute> },
      { path: "/search", element: <ProtectedRoute><Search /></ProtectedRoute> },
      { path: "/select-address", element: <ProtectedRoute><SelectAddress /></ProtectedRoute> },
      { path: "/services/:type", element: <ProtectedRoute><ServiceList /></ProtectedRoute> },
      { path: "/services/:type/:id", element: <ProtectedRoute><ServiceDetails /></ProtectedRoute> },
      { path: "/create-post", element: <ProtectedRoute><CreatePost /></ProtectedRoute> },
      { path: "/all-posts", element: <ProtectedRoute><AllPostsScreen /></ProtectedRoute> },
      { path: "/manage-workers", element: <ProtectedRoute><ManageWorkers /></ProtectedRoute> },
      { path: "/manage-workers/feedback/:id", element: <ProtectedRoute><FeedbackPage /></ProtectedRoute> },
      { path: "/manage-workers/stop/:id", element: <ProtectedRoute><StopServicePage /></ProtectedRoute> },
      { path: "/manage-workers/profile/:id", element: <ProtectedRoute><WorkerProfile /></ProtectedRoute> },
      { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/language", element: <ProtectedRoute><LanguageSelector /></ProtectedRoute> },
      { path: "/subscription", element: <ProtectedRoute><Subscription /></ProtectedRoute> },
      { path: "/terms", element: <ProtectedRoute><Terms /></ProtectedRoute> },
      { path: "/privacy-policy", element: <ProtectedRoute><PrivacyPolicy /></ProtectedRoute> },
      { path: "/license", element: <ProtectedRoute><License /></ProtectedRoute> },
      { path: "/favourites", element: <ProtectedRoute><Favourites /></ProtectedRoute> },
      { path: "/saved-location", element: <ProtectedRoute><SavedLocation /></ProtectedRoute> },
      { path: "/settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },
      { path: "/change-password", element: <ProtectedRoute><ChangePassword /></ProtectedRoute> },
      { path: "/support", element: <ProtectedRoute><HelpSupport /></ProtectedRoute> },
      { path: "/custom-requirements", element: <ProtectedRoute><CustomRequirements /></ProtectedRoute> },
      { path: "/custom-duties", element: <ProtectedRoute><CustomDuties /></ProtectedRoute> },
      { path: "/custom-submit", element: <ProtectedRoute><CustomSubmit /></ProtectedRoute> },
    ],
  },
];

export default ThemeRoutes;
