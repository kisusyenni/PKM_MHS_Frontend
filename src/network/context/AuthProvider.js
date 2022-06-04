/* eslint-disable react/prop-types */
import { React, createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        accessToken: localStorage.getItem("token"),
        storeId: localStorage.getItem("storeId"),
        isSetup: localStorage.getItem("isSetup"),
    });

    const logout = async () => {
        setAuth({
            accessToken: null,
            storeId: null,
            isSetup: null,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("storeId");
        localStorage.removeItem("isSetup");
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
