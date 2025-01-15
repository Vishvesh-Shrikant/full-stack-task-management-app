import { createContext, ReactNode, useEffect} from "react";

interface AuthContextType {
    login: (token:string ) => void;
    logout: () => void;
  }
  
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
export const AuthProvider = ({ children }: { children: ReactNode  }) => {
    localStorage.setItem("isAuthenticated", "false")
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken)
      if (accessToken) {
        localStorage.setItem("isAuthenticated", "true")
      }
    }, []);
  
    const login = (token: string ) => {
      localStorage.setItem("accessToken", token)
      localStorage.setItem("isAuthenticated", "true")
      console.log("access token: " , localStorage.getItem("accessToken"));
      console.log("Is authenticated: ", localStorage.getItem("isAuthenticated"))
    };
  
    const logout = () => {
      localStorage.removeItem("accessToken");
      localStorage.setItem("isAuthenticated", "false")
    };
  
    return (
      <AuthContext.Provider value={{login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
