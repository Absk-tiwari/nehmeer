import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { PublicRoute } from "./PublicRoute.js";
import { SemiProtectedRoute } from "./SemiProtectedRoute.js";

import ForgotPassword from "../components/auth/ForgotPassword.js";
import ResetPassword from "../components/auth/ResetPassword.js";
import OtpVerify from "../components/auth/OtpVerify.js";
import CompleteProfile from "../components/CompleteProfile.js";
import Notifications from "../components/dashboard/Notifications.jsx";
import Search from "../components/search/Search.jsx";
import SearchResults from "../components/search/SearchResults.jsx";
import SearchWorkerProfile from "../components/search/SearchWorkerProfile.jsx";
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
import PostDetails from "../components/posts/PostDetails.jsx";
import About from "../components/pages/About.jsx";

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

      // Public Routes (accessible without login)
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/search", element: <Search /> },
      { path: "/search-results", element: <SearchResults /> },
      { path: "/worker-profile/:id", element: <SearchWorkerProfile /> },
      { path: "/services/:type", element: <ServiceList /> },
      { path: "/services/:type/:id", element: <ServiceDetails /> },
      { path: "/terms", element: <Terms /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/license", element: <License /> },
      { path: "/about", element: <About /> },

      // Semi-Protected Routes (show login prompt if not logged in)
      { path: "/profile", element: <SemiProtectedRoute><Profile /></SemiProtectedRoute> },
      { path: "/notifications", element: <SemiProtectedRoute><Notifications /></SemiProtectedRoute> },
      { path: "/all-posts", element: <SemiProtectedRoute><AllPostsScreen /></SemiProtectedRoute> },
      { path: "/post/:id", element: <SemiProtectedRoute><PostDetails /></SemiProtectedRoute> },
      { path: "/post/:id/applicants", element: <SemiProtectedRoute><PostDetails /></SemiProtectedRoute> },
      { path: "/manage-workers", element: <SemiProtectedRoute><ManageWorkers /></SemiProtectedRoute> },
      { path: "/manage-workers/feedback/:id", element: <SemiProtectedRoute><FeedbackPage /></SemiProtectedRoute> },
      { path: "/manage-workers/stop/:id", element: <SemiProtectedRoute><StopServicePage /></SemiProtectedRoute> },
      { path: "/manage-workers/profile/:id", element: <SemiProtectedRoute><WorkerProfile /></SemiProtectedRoute> },
      { path: "/language", element: <SemiProtectedRoute><LanguageSelector /></SemiProtectedRoute> },
      { path: "/subscription", element: <SemiProtectedRoute><Subscription /></SemiProtectedRoute> },
      { path: "/favourites", element: <SemiProtectedRoute><Favourites /></SemiProtectedRoute> },
      { path: "/saved-location", element: <SemiProtectedRoute><SavedLocation /></SemiProtectedRoute> },
      { path: "/settings", element: <SemiProtectedRoute><Settings /></SemiProtectedRoute> },
      { path: "/change-password", element: <SemiProtectedRoute><ChangePassword /></SemiProtectedRoute> },
      { path: "/support", element: <SemiProtectedRoute><HelpSupport /></SemiProtectedRoute> },

      // Protected Routes (require login - redirect to login)
      { path: "/complete-profile", element: <ProtectedRoute><CompleteProfile /></ProtectedRoute> },
      { path: "/select-address", element: <ProtectedRoute><SelectAddress /></ProtectedRoute> },
      { path: "/create-post", element: <ProtectedRoute><CreatePost /></ProtectedRoute> },
      { path: "/custom-requirements", element: <ProtectedRoute><CustomRequirements /></ProtectedRoute> },
      { path: "/custom-duties", element: <ProtectedRoute><CustomDuties /></ProtectedRoute> },
      { path: "/custom-submit", element: <ProtectedRoute><CustomSubmit /></ProtectedRoute> },
    ],
  },
];

export default ThemeRoutes;
