import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Layout = () => {
  const { auth } = useAuthContext();
  return (
    <main className="h-screen w-screen">
      <nav className="h-10 bg-blue-500 flex items-center">
        {auth.user && <h1 className="ml-5 text-2xl">Welcome {auth.user}!</h1>}
      </nav>
      <Outlet />
    </main>
  );
};

export default Layout;
