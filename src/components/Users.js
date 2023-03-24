import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          return;
        } else {
          console.error(error);
          navigate("/auth", { state: { from: location }, replace: true });
        }
      }
    };
    fetchUsers();

    // If component unmounts we want to cancel all possible request that are happening, clean up function
    return () => {
      // When we set to false we will not be able to set the state to resp.data
      isMounted = false;
      // With abort controller we are canceling request
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2 className="text-2xl">Users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user?.username}</li>;
          })}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
