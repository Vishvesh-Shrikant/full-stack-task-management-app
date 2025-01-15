// src/hooks/useAuthRedirect.ts
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export const useAuthRedirect = () => {
  const isAuthenticated= Boolean(localStorage.getItem("isAuthenticated"))
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated)
    setTimeout(()=>{
      if (!isAuthenticated) {
        // Save the current path in state and redirect to login
        const from = location.pathname + location.search;
        console.log(from, location.pathname, location.search)
        navigate(`/login?from=${encodeURIComponent(from)}`);
      }
    }, 500)
    
  }, [isAuthenticated, location, navigate]);
};
