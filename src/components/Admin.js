import React from "react";
import { Link } from "react-router-dom";
import Users from "./Users";

const Admin = () => {
  return (
    <main className="main-container">
      <h2 className="text-2xl">Admins page</h2>
      <br />
      <Users />
      <br />
      <Link to="/" className="underline">
        Home
      </Link>
    </main>
  );
};

export default Admin;
