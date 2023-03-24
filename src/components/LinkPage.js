import React from "react";
import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <main className="main-container">
      <h1 className="text-3xl">Links</h1>
      <br />
      <h2 className="text-3xl">Public</h2>
      <Link to="/auth" className="underline">
        Login
      </Link>
      <Link to="/register" className="underline">
        Register
      </Link>
      <h2 className="text-3xl">Private</h2>
      <Link to="/" className="underline">
        Home
      </Link>
      <Link to="/editor" className="underline">
        Editors page
      </Link>
      <Link to="/admin" className="underline">
        Admin page
      </Link>
    </main>
  );
};

export default LinkPage;
