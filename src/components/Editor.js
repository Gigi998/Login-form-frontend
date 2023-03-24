import React from "react";
import { Link } from "react-router-dom";

const Editor = () => {
  return (
    <main className="main-container">
      <h2 className="text-2xl">Editor page</h2>
      <p>You must have been assigned an Editor role</p>
      <Link to="/" className="underline">
        Home
      </Link>
    </main>
  );
};

export default Editor;
