// components/Header.tsx
import { APP_PATHS } from "@/routes/path";
import { logoutService } from "@/service/auth.service";
import { useMutation } from "@tanstack/react-query";

import { Link, Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function MainLayout() {
  const { logout } = useAuth();

  const { mutate } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      logout();
    },
  });
  return (
    <div className="w-full h-full">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={APP_PATHS.home} className="text-xl font-bold text-gray-800">
            Tasks
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to={APP_PATHS.home}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Home
            </Link>
            <Link
              to={APP_PATHS.login}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Login
            </Link>
            <Button
              size={"icon"}
              onClick={() => {
                mutate();
              }}
            >
              <LogOut />
            </Button>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
