import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { self } from "../http/api";
import { useEffect } from "react";
import { useAuthStore } from "../store";

export const Root = () => {
  const { setUser } = useAuthStore();
  const getSelf = async () => {
    const { data } = await self();
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
