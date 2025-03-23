import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("🚀 ~ PrivateRoute ~ isAuthenticated:", isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth-signin" replace />;
};

export default PrivateRoute;