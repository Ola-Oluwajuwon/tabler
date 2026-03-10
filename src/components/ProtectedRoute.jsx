import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute — wraps children and redirects to /login
 * if the user is not authenticated (reads from Redux auth state).
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
