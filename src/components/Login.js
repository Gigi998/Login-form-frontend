import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, togglePersist } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();
  // Where user came from
  const from = location?.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useLocalStorage("user");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const json = JSON.stringify({ user, pwd });
      const response = await axios.post(LOGIN_URL, json);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      // Navigate user to location where he wanted to go
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error?.response?.status === 400) {
        setErrMsg("Username or password missing");
      } else if (error?.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="main-container">
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
      <h2 className="text-2xl">Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Username:</label>
        <input
          type="text"
          id="username"
          className="outline-none w-full"
          autoComplete="off"
          ref={userRef}
          required
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="outline-none w-full"
          required
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />
        <button className="bg-white mt-2 rounded-md p-2 w-2/5">Sign in</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust this device</label>
        </div>
      </form>
      <p>
        Need an Accaount?
        <br />
        <span>
          <Link to="/register">Sign up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
