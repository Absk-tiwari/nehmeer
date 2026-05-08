import LoginPrompt from "../components/common/LoginPrompt";

export const SemiProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <LoginPrompt />;
  }

  return children;
};
