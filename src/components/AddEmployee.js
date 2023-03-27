import React from "react";
import useWorkers from "../hooks/useWorkers";
import { useRef } from "react";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const errRef = useRef();
  const succRef = useRef();
  const {
    setFirstName,
    setLastName,
    firstname,
    lastname,
    addWorkers,
    errMsg,
    successMsg,
  } = useWorkers();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className="main-container">
      <p
        className={
          errMsg
            ? "relative rounded w-ful bg-rose-600 p-4 mb-2"
            : "absolute left-full"
        }
        aria-live="assertive"
        ref={errRef}
      >
        {errMsg}
      </p>
      <p
        className={
          successMsg
            ? "relative rounded w-full bg-green-600 p-4 mb-2"
            : "absolute left-full"
        }
        aria-live="assertive"
        ref={succRef}
      >
        {successMsg}
      </p>
      <h2 className="text-2xl">Workers page</h2>
      <br />
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Firstname</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstname}
          />
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            onChange={(e) => setLastName(e.target.value)}
            value={lastname}
          ></input>
          <button
            className="bg-slate-200 mt-2 rounded-md w-10"
            onClick={() => addWorkers(firstname, lastname)}
          >
            Add
          </button>
        </form>
        <div className="mt-4">
          <Link to="/" className="underline">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AddEmployee;
