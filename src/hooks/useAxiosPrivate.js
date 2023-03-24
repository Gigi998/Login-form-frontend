import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuthContext } from "../context/AuthContext";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuthContext();

  useEffect(() => {
    // Request
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        // e.g. first request
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    // Response
    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      // removing interceptor
      axiosPrivate.interceptors.request.eject(requestInterceptors);
      axiosPrivate.interceptors.response.eject(responseInterceptors);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
