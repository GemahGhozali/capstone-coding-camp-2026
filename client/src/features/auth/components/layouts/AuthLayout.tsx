import { Outlet } from "react-router-dom";
import AuthDecoration from "../AuthDecoration";

export function AuthLayout() {
  return (
    <div className="flex *:w-1/2">
      <div className="flex justify-center items-center p-4 md:p-16 max-xl:w-full max-xl:h-dvh relative">
        <Outlet />
      </div>
      <AuthDecoration />
    </div>
  );
}
