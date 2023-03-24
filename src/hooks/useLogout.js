import axios from "../api/axios";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const { setAuth } = useAuthContext();

  const logout = async () => {
    setAuth({});
    try {
      await axios.get("/logout");
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
