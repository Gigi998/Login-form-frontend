import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <main className="main-container">
      <h2 className="text-3xl mb-5">Unauthorized</h2>
      <p>You do not have access to requested page</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-white text-blue-500 p-3 rounded-md mt-2"
      >
        Go back
      </button>
    </main>
  );
};

export default Unauthorized;
