import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesTI = () => {
  const user = localStorage.getItem("isLoggedMembroTI") === "true";
  return user ? <Outlet /> : <Navigate to="ti-login" />;
};

export default ProtectedRoutesTI;
