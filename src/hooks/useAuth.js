import { useContext } from "react";
import AuthContext from "src/network/context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;
