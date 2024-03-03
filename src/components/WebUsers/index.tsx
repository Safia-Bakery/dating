import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const WebUsers = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default WebUsers;
