/* eslint-disable react/prop-types */
import { React, createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        accessToken: localStorage.getItem("token"),
        storeId: localStorage.getItem("storeId"),
        isSetup: localStorage.getItem("isSetup"),
        userId: localStorage.getItem("userId"),
    });

    const logout = async () => {
        setAuth({
            accessToken: null,
            storeId: null,
            isSetup: null,
            userId: null,
        });
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
