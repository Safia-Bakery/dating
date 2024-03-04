import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserRoutes;
