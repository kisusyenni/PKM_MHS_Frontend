import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import DefaultLayout from "src/layout/DefaultLayout";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    if (auth?.accessToken && auth?.isSetup == 1) {
        return <DefaultLayout />;
    } else if (auth?.accessToken && auth?.isSetup == 0) {
        return <Navigate to="/atur-toko" state={{ from: location }} replace={true} />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }
};

export default RequireAuth;
