import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import type { LoginResponse } from "../service/auth.service";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../routes/path";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  login: async () => {},
  logout: () => {},
});

interface AuthContextType {
  isLogin: boolean;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => void;
}

const ACCESS_COOKIE_NAME = "access-token";
const REFRESH_COOKIE_NAME = "refresh-token";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(
    Cookies.get(ACCESS_COOKIE_NAME) || undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(Cookies.get(ACCESS_COOKIE_NAME));
  }, []);

  useEffect(() => {
    if (!token) {
      navigate(APP_PATHS.login);
    }
  }, [token, navigate]);

  const login = async (data: LoginResponse) => {
    try {
      Cookies.set(ACCESS_COOKIE_NAME, data.accessToken);
      Cookies.set(REFRESH_COOKIE_NAME, data.refreshToken);
      setToken(data.accessToken);
      setTimeout(() => {
        navigate(APP_PATHS.home);
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  const logout = () => {
    Cookies.remove(ACCESS_COOKIE_NAME);
    Cookies.remove(REFRESH_COOKIE_NAME);
    setToken(undefined);
    setTimeout(() => {
      navigate(APP_PATHS.login);
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ isLogin: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
