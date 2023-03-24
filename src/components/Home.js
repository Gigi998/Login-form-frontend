import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const logout = useLogout();
  return (
    <main className="main-container">
      <h2>Home page</h2>
      <div className="underline flex flex-col gap-3">
        <Link to="editor">Go to editor page</Link>
        <Link to="admin">Go to Admin page</Link>
        <Link to="lounge">Go to lounge page</Link>
        <Link to="linkpage">Go to link page</Link>
      </div>
      <button onClick={logout} className="bg-white rounded-md w-2/5">
        Sign out
      </button>
    </main>
  );
};

export default Home;
