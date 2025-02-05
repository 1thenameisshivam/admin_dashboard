import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";

export const Dashboard = () => {
  const { user } = useAuthStore();
  if (user == null) {
    return <Navigate to={"auth/login"} replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
