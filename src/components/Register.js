import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const REGISTER_URL = "/register";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [userValidate, setUserValidate] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdValidate, setPwdValidate] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setUserValidate(USER_REGEX.test(user));
    setPwdValidate(PWD_REGEX.test(pwd));
  }, [user, pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleClick = async () => {
    try {
      const json = JSON.stringify({ user: user, pwd: pwd });
      const response = await axios.post(REGISTER_URL, json);
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("NO server response");
      } else if (error?.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <section className="main-container">
          <h1 className="text-2xl">Success</h1>
          <Link to="/auth">Sign in</Link>
        </section>
      ) : (
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
          <h2 className="text-2xl ml-0">Register</h2>
          <form
            className="flex flex-col items-center justify-between"
            onClick={handleSubmit}
          >
            <div className="mt-5 flex w-full items-center justify-start">
              <label htmlFor="username" className="flex items-center">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={userValidate ? "block" : "hidden"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={!userValidate && user ? "block" : "hidden"}
                />
              </label>
            </div>
            <input
              type="text"
              id="username"
              className="outline-none w-full"
              autoComplete="off"
              ref={userRef}
              required
              onChange={(e) => setUser(e.target.value)}
              value={user}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userValidate || !user || !userFocus
                  ? "absolute left-full"
                  : "relative mt-2 w-full rounded-lg bg-black p-1 text-white"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              4 to 24 characters.
              <br />
              Must begin with letter.
              <br />
              Letters, numbers allowed.
            </p>
            <div className="mt-5 flex w-full items-center justify-start">
              <label htmlFor="password" className="mr-2">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    pwdFocus && pwdValidate ? "inline-block" : "hidden"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={!pwdValidate && pwd ? "inline-block" : "hidden"}
                />
              </label>
            </div>
            <input
              type="password"
              id="password"
              className="outline-none w-full"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              aria-describedby="pwdNote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdNote"
              className={
                pwdValidate || !pwd || !pwdFocus
                  ? "absolute left-full"
                  : "relative mt-2 w-full rounded-lg bg-black p-1 text-white"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              8 to 24 characters.
              <br />
              Must include letter and number.
            </p>

            <button
              className="mt-5 w-2/4 rounded-md bg-white"
              onClick={handleClick}
              disabled={!userValidate || !pwdValidate ? true : false}
            >
              Sign up
            </button>
            <p>Already have account?</p>
            <button>
              <Link to="/auth">Sign in</Link>
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
