import React from "react";
import { Link } from "react-router-dom";

const Lounge = () => {
  return (
    <main className="main-container">
      <h2 className="text-2xl">Lounge </h2>
      <p>Admins and editors can hang out there</p>
      <Link to="/" className="underline">
        Home
      </Link>
    </main>
  );
};

export default Lounge;
