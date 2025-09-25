import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesAdmin = () => {
  const user = localStorage.getItem("isLoggedAdmin") === "true";
  return user ? <Outlet /> : <Navigate to="admin-login" />;
};

export default ProtectedRoutesAdmin;
