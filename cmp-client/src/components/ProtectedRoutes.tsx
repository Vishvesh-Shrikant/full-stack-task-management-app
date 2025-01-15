import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.ts'
import { useAuthRedirect } from '@/hooks/useAuthRedirect.ts';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    useAuthRedirect()
    console.log(isAuthenticated)
  
    return children;
  };
  
  export default ProtectedRoute;