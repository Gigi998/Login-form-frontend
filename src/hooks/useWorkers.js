import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useWorkers = () => {
  const axiosPrivate = useAxiosPrivate();
  const [employees, setEmployees] = useState();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setErrMsg("");
  }, [firstname, lastname]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchwWorkers = async () => {
      try {
        const response = await axiosPrivate.get("/employees", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setEmployees(response.data);
      } catch (error) {
        if ((error.name = "CanceledError")) {
          return;
        } else {
          console.error(error);
          navigate("/auth", { state: { from: location }, replace: true });
        }
      }
    };
    fetchwWorkers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const removeWorkers = async (id) => {
    try {
      const response = await axiosPrivate.delete("/employees", {
        data: { id: id },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addWorkers = async (firstname, lastname) => {
    try {
      const response = await axiosPrivate.post("/employees", {
        firstname: firstname,
        lastname: lastname,
      });
      setFirstName("");
      setLastName("");
      setSuccessMsg(`New user ${firstname} created!`);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error?.response?.status === 400) {
        setErrMsg("Firstname and lastname are required");
      } else {
        setErrMsg("Failure");
      }
    }
  };

  return {
    employees,
    removeWorkers,
    addWorkers,
    setFirstName,
    setLastName,
    firstname,
    lastname,
    errMsg,
    successMsg,
  };
};

export default useWorkers;
