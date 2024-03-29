/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CImage,
    CLink,
    CRow,
    CSpinner,
} from "@coreui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "src/network/api/network";
import useAuth from "src/hooks/useAuth";
import StatusAlert from "src/helper/StatusAlert";
import { Controller, useForm } from "react-hook-form";
import logo from "src/assets/brand/logo.png";
import showPassword from "src/assets/images/show.png";
import hidePassword from "src/assets/images/hide.png";

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [state, setState] = useState({
        loading: false,
        validated: false,
        showAlert: false,
        alertType: null,
        alertContent: "",
        showPassword: false,
        title: "Login - MHS SOFT",
    });

    useEffect(() => {
        document.title = state.title || "";
    }, [state.title]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
    });

    const onSubmit = async (data) => {
        // show loading on button
        setState((prevState) => ({
            ...prevState,
            loading: true,
        }));
        // send login data to api
        const response = await post("/auth/login", data);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                showAlert: true,
                alertType: "success",
                alertContent: response.data.msg,
            }));
            // add access token, store id, is setuo to local storage and set auth
            const accessToken = response?.data?.authToken;
            const storeId = response?.data?.user.storeId;
            const isSetup = response?.data?.user.is_setup;
            const userId = response?.data?.user.userId;
            const userName = response?.data?.user.name;
            localStorage.setItem("token", accessToken);
            localStorage.setItem("storeId", storeId);
            localStorage.setItem("isSetup", isSetup);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            setAuth({ accessToken: accessToken, storeId: storeId, isSetup: isSetup });

            // hide loading on button
            setState((prevState) => ({
                ...prevState,
                loading: false,
            }));
        } else {
            // show error
            setState((prevState) => ({
                ...prevState,
                loading: false,
                showAlert: true,
                alertType: "danger",
                alertContent: response.data,
            }));
        }
        setTimeout(() => {
            closeAlert();
            navigate(from, { replace: true });
        }, 3000);
    };

    const closeAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
        }));
    };

    return (
        <main className="bg-light min-vh-100 d-flex flex-row align-items-center bg-custom">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleSubmit(onSubmit)}>
                                    <div className="text-center mb-3">
                                        <CImage src={logo} height={80} />
                                    </div>
                                    <hr />
                                    <h1 className="text-center h3 fw-bold">Login</h1>
                                    <p className="text-medium-emphasis text-center">
                                        Masuk ke Akun Anda
                                    </p>

                                    <StatusAlert
                                        showAlert={state.showAlert}
                                        type={state.alertType}
                                        content={state.alertContent}
                                        closeAlert={closeAlert}
                                    />
                                    <div className="mb-3">
                                        <CFormLabel>Email</CFormLabel>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: "Email tidak boleh kosong",
                                                pattern: {
                                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                    message: "Format email salah",
                                                },
                                            }}
                                            render={({
                                                field: { onChange, onBlur, value, ref },
                                            }) => (
                                                <CFormInput
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    autoComplete="email"
                                                    ref={ref}
                                                    invalid={errors.hasOwnProperty("email")}
                                                />
                                            )}
                                        />

                                        <span className="invalid-feedback">
                                            {errors.email?.message}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <CFormLabel>Kata Sandi</CFormLabel>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required: "Kata sandi tidak boleh kosong",
                                            }}
                                            render={({
                                                field: { onChange, onBlur, value, ref },
                                            }) => (
                                                <CFormInput
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    autoComplete="password"
                                                    type={state.showPassword ? "text" : "password"}
                                                    ref={ref}
                                                    invalid={errors.hasOwnProperty("password")}
                                                />
                                            )}
                                        />
                                        <span className="invalid-feedback">
                                            <CRow>
                                                <CCol>{errors.password?.message}</CCol>
                                                <CCol className="text-end">
                                                    <CLink
                                                        style={{ cursor: "pointer" }}
                                                        className="link-dark"
                                                        onClick={() => {
                                                            const status = state.showPassword;
                                                            setState((prevState) => ({
                                                                ...prevState,
                                                                showPassword: !status,
                                                            }));
                                                        }}
                                                    >
                                                        <CImage
                                                            className="me-1"
                                                            src={
                                                                state.showPassword
                                                                    ? hidePassword
                                                                    : showPassword
                                                            }
                                                            width={20}
                                                        />
                                                        Tunjukkan kata sandi
                                                    </CLink>
                                                </CCol>
                                            </CRow>
                                        </span>

                                        {!errors.hasOwnProperty("password") && (
                                            <CRow>
                                                <CCol>{errors.password?.message}</CCol>
                                                <CCol className="text-end">
                                                    <CLink
                                                        style={{ cursor: "pointer" }}
                                                        className="link-dark"
                                                        onClick={() => {
                                                            const status = state.showPassword;
                                                            setState((prevState) => ({
                                                                ...prevState,
                                                                showPassword: !status,
                                                            }));
                                                        }}
                                                    >
                                                        <CImage
                                                            className="me-1"
                                                            src={
                                                                state.showPassword
                                                                    ? hidePassword
                                                                    : showPassword
                                                            }
                                                            width={20}
                                                        />
                                                        <small>Tunjukkan kata sandi</small>
                                                    </CLink>
                                                </CCol>
                                            </CRow>
                                        )}
                                    </div>
                                    <CRow>
                                        <CCol xs={12} className="text-center py-3">
                                            <CButton type="submit" color="primary" className="px-5">
                                                <span className="me-2">Masuk</span>
                                                <CSpinner
                                                    hidden={!state.loading}
                                                    component="span"
                                                    size="sm"
                                                    aria-hidden="true"
                                                />
                                            </CButton>
                                        </CCol>
                                        <CCol xs={12} className="text-center">
                                            <span>Belum memiliki akun? </span>
                                            <a href="/register">Registrasi Sekarang</a>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </main>
    );
};

export default Login;
