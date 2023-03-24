import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="main-container">
      Page not found
      <button className="underline">
        <Link to="/linkpage">Go to links page</Link>
      </button>
    </main>
  );
};

export default Missing;
