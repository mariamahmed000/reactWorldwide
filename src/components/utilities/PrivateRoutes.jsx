import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user.email);

  return auth && user !== "admin@gmail.com" ? (
    <Outlet />
  ) : user !== "admin@gmail.com" ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/error" />
  );
};

export default PrivateRoutes;
