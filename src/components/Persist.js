import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Persist = () => {
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  const { auth, persist } = useAuthContext();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    // verifyRefreshToken();
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <h1>loading</h1> : <Outlet />} </>
  );
};

export default Persist;
