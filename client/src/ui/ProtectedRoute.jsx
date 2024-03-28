import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import FullPageSpinner from "./FullPageSpinner";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. LOAD THE AUTHENTICATED USER
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (user?.status !== "success" && !isLoading) navigate("/login");
  }, [isLoading, navigate, user?.status]);

  // 2. IF THE USER IS LOADING, RETURN A SPINNER
  if (isLoading) return <FullPageSpinner />;

  return user.status === "success" ? children : null;
};

export default ProtectedRoute;
