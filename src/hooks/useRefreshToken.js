import axios from "../api/axios";
import { useAuthContext } from "../context/AuthContext";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
        // Important !!!!
        roles: response.data.roles,
        user: response.data.user,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
