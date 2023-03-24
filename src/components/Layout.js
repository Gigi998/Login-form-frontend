import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Layout = () => {
  const { auth } = useAuthContext();
  return (
    <main className="h-screen w-screen">
      {/* <h1>{auth.user}</h1> */}
      <Outlet />
    </main>
  );
};

export default Layout;
