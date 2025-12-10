import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export default function useAuth() {
  const { isLogin, login, logout } = useContext(AuthContext);
  return { login, logout, isLogin };
}
