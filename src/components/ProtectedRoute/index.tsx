import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';

export function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};
