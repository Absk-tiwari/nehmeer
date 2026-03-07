import { lazy } from "react";
import { Navigate } from "react-router-dom";
// import { ProtectedRoute } from "./ProtectedRoute.js";

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
// import ServiceList from "../components/services/ServiceList";
// import ServiceDetails from "../components/services/ServiceDetails";

const FullLayout = lazy(() => import("../components/layouts/FullLayout.js"));

// const Search = lazy(() => import("../components/search/Search.js"));
/***** Pages ****/
const Login = lazy(() => import("../components/auth/Login.js"));
const Register = lazy(() => import("../components/auth/Register.js"));
const Dashboard = lazy(() => import("../components/Dashboard.js"));

/***** Routes ******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [

      // Default redirect
      { path: "/", element: <Navigate to="/login" /> },

      // Public Routes
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/otp", element: <OtpVerify /> },
      {path: "/complete-profile", element:  <CompleteProfile />},
      {path: "/dashboard", element:  <Dashboard />},
      {path: "/notifications", element: <Notifications /> },
      { path: "/search", exact: true, element: <Search/> },
      { path: "/select-address", exact: true, element: <SelectAddress/> },
      { path: "/services/:type", element: <ServiceList /> },
      { path: "/services/:type/:id", element: <ServiceDetails /> },
      { path: "/create-post", element: <CreatePost/> },
      { path: "/all-posts", element: <AllPostsScreen/> },
      { path: "/manage-workers", element: <ManageWorkers /> },
      { path: "/manage-workers/feedback/:id", element: <FeedbackPage /> },
      { path: "/manage-workers/stop/:id", element: <StopServicePage /> },
      { path: "/manage-workers/profile/:id", element: <WorkerProfile /> },
      { path: "/profile/", element: <Profile /> },
       { path: "/complete-profile" , element: <CompleteProfile mode="create" /> },
      { path: "/language" , element: <LanguageSelector/> },
      { path: "/subscription" , element: <Subscription/> },
      { path: "/terms" , element: <Terms/> },
      { path: "/privacy-policy" , element: <PrivacyPolicy/> },
      { path: "/license" , element: <License/> },
      { path: "/favourites" , element: <Favourites/> },
     { path: "/saved-location", element: <SavedLocation /> },

     
      // 👉 Protected Route only for dashboard
      // {
      //   path: "/dashboard",
      //   element: (
      //     <ProtectedRoute>
      //       <Dashboard />
      //     </ProtectedRoute>
      //   ),
      // },

    ],
  },
];

export default ThemeRoutes;
