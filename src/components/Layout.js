import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="h-screen w-screen">
      <nav className="h-10 bg-blue-500 flex items-center">
        <h1 className="ml-5 text-2xl">Welcome!</h1>
      </nav>
      <Outlet />
    </main>
  );
};

export default Layout;
