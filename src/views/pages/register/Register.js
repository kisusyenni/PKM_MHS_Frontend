import React, { useRef, useState } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CSpinner,
} from "@coreui/react";
import { post } from "src/network/api/network";
import StatusAlert from "src/helper/StatusAlert";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        loading: false,
        showAlert: false,
        alertType: null,
        alertContent: "",
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordRepeat: "",
        },
        mode: "all",
    });

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {
        setState((prevState) => ({
            ...prevState,
            loading: true,
        }));
        const response = await post("/auth/signup", data);
        if (response.status === 200) {
            // refresh input form
            setState((prevState) => ({
                ...prevState,
                loading: false,
                showAlert: true,
                alertType: "success",
                alertContent: response.data,
            }));
            reset(
                {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    passwordRepeat: "",
                },
                {
                    keepErrors: false,
                    keepDirty: true,
                    keepIsSubmitted: false,
                    keepTouched: false,
                    keepIsValid: false,
                    keepSubmitCount: false,
                },
            );
            setTimeout(() => {
                closeAlert();
                navigate("/login", { replace: true });
            }, 2500);
        } else {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                showAlert: true,
                alertType: "danger",
                alertContent: response.data,
            }));
            setTimeout(() => closeAlert(), 2500);
        }
    };

    const closeAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
        }));
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center bg-custom">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleSubmit(onSubmit)}>
                                    <h1 className="text-center h3 fw-bold">Sistem Keuangan</h1>
                                    <p className="text-medium-emphasis text-center mb-5">
                                        Buat akun Anda
                                    </p>
                                    <StatusAlert
                                        showAlert={state.showAlert}
                                        type={state.alertType}
                                        content={state.alertContent}
                                        closeAlert={closeAlert}
                                    />
                                    <div className="mb-3 row">
                                        <CCol md={6}>
                                            <CFormLabel>Nama Depan</CFormLabel>
                                            <Controller
                                                name="firstName"
                                                control={control}
                                                rules={{
                                                    required: "Nama depan tidak boleh kosong",
                                                }}
                                                render={({
                                                    field: { onChange, onBlur, value, ref },
                                                }) => (
                                                    <CFormInput
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        autoComplete="firstName"
                                                        ref={ref}
                                                        invalid={errors.hasOwnProperty("firstName")}
                                                    />
                                                )}
                                            />
                                            <span className="invalid-feedback">
                                                {errors.firstName?.message}
                                            </span>
                                        </CCol>

                                        <CCol md={6}>
                                            <CFormLabel>Nama Belakang</CFormLabel>
                                            <Controller
                                                name="lastName"
                                                control={control}
                                                rules={{
                                                    required: "Nama belakang tidak boleh kosong",
                                                }}
                                                render={({
                                                    field: { onChange, onBlur, value, ref },
                                                }) => (
                                                    <CFormInput
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        autoComplete="lastName"
                                                        ref={ref}
                                                        invalid={errors.hasOwnProperty("lastName")}
                                                    />
                                                )}
                                            />
                                            <span className="invalid-feedback">
                                                {errors.lastName?.message}
                                            </span>
                                        </CCol>
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Email</CFormLabel>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: "Email tidak boleh kosong",
                                                pattern: {
                                                    value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
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
                                                    autoComplete="newEmail"
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
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Kata sandi harus memiliki minimal 8 karakter",
                                                },
                                            }}
                                            render={({
                                                field: { onChange, onBlur, value, ref },
                                            }) => (
                                                <CFormInput
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    autoComplete="newPassword"
                                                    type="password"
                                                    ref={ref}
                                                    invalid={errors.hasOwnProperty("password")}
                                                />
                                            )}
                                        />
                                        <span className="invalid-feedback">
                                            {errors.password?.message}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <CFormLabel>Konfirmasi Kata Sandi</CFormLabel>
                                        <Controller
                                            name="passwordRepeat"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Konfirmasi kata sandi tidak boleh kosong",
                                                validate: (value) =>
                                                    value === password.current ||
                                                    "Kata sandi tidak sama persis",
                                            }}
                                            render={({
                                                field: { onChange, onBlur, value, ref },
                                            }) => (
                                                <CFormInput
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    type="password"
                                                    ref={ref}
                                                    invalid={errors.hasOwnProperty(
                                                        "passwordRepeat",
                                                    )}
                                                />
                                            )}
                                        />
                                        <span className="invalid-feedback">
                                            {errors.passwordRepeat?.message}
                                        </span>
                                    </div>
                                    <CRow>
                                        <CCol xs={12} className="text-center py-3">
                                            <CButton type="submit" color="primary" className="px-5">
                                                Daftar
                                                <CSpinner
                                                    hidden={!state.loading}
                                                    component="span"
                                                    size="sm"
                                                    aria-hidden="true"
                                                />
                                            </CButton>
                                        </CCol>
                                        <CCol xs={12} className="text-center">
                                            <span>Sudah memiliki akun? </span>
                                            <a href="/login">Masuk Sekarang</a>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Register;
