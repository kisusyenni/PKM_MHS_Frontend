import { cilBuilding, cilDollar, cilGlobeAlt, cilList, cilMap, cilPhone } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import countriesData from "../../assets/json/countries.json";
import { put } from "src/network/api/network";
import { useLocation, useNavigate } from "react-router-dom";
import StatusAlert from "src/helper/StatusAlert";
import useAuth from "src/hooks/useAuth";

const SetupStoreForm = () => {
    const [state, setState] = useState({
        loading: false,
        showAlert: false,
        alertType: null,
        alertContent: "",
    });
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const countries = countriesData.map((country) => {
        return country.name;
    });

    const currency = countriesData.map((country) => {
        return {
            label: `${country.currency.code} - ${country.name} ${country.currency.name}`,
            value: country.currency.symbol,
        };
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            address: "",
            telephone: "",
            email: "",
            region: "Indonesia",
            currency: "Rp",
            type: "",
            is_setup: 1,
        },
        mode: "all",
    });

    const closeAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
        }));
    };

    const onSubmit = async (data) => {
        setState((prevState) => ({
            ...prevState,
            loading: true,
        }));
        const storeId = localStorage.getItem("storeId");
        const response = await put("/store/", storeId, data);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                showAlert: true,
                alertType: "success",
                alertContent: response.data,
            }));
            reset(
                {
                    name: "",
                    address: "",
                    telephone: "",
                    email: "",
                    region: "Indonesia",
                    currency: "Rp",
                    type: "",
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
            setAuth({ isSetup: 1 });
            localStorage.setItem("isSetup", 1);
            setTimeout(() => {
                navigate(from, { replace: true });
                closeAlert();
            }, 3000);
        } else {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                showAlert: true,
                alertType: "danger",
                alertContent: response.data,
            }));

            setTimeout(() => closeAlert(), 3000);
        }
    };
    return (
        <>
            <CCard className="mx-4">
                <CCardBody className="p-4">
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <h3>Atur UMKM Anda</h3>
                        <p className="text-medium-emphasis">Silahkan masukkan data UMKM Anda.</p>

                        <StatusAlert
                            showAlert={state.showAlert}
                            type={state.alertType}
                            content={state.alertContent}
                            closeAlert={closeAlert}
                        />

                        <CRow>
                            <CCol xl={12} md={6}>
                                <CFormLabel>Nama UMKM</CFormLabel>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilBuilding} />
                                    </CInputGroupText>
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{
                                            required: "Nama UMKM tidak boleh kosong",
                                        }}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormInput
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                autoComplete="storeName"
                                                ref={ref}
                                                invalid={errors.hasOwnProperty("name")}
                                            />
                                        )}
                                    />
                                    <span className="invalid-feedback">{errors.name?.message}</span>
                                </CInputGroup>
                            </CCol>

                            <CCol xl={4} md={6}>
                                <CFormLabel>Jenis UMKM</CFormLabel>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilList} />
                                    </CInputGroupText>
                                    <Controller
                                        name="type"
                                        control={control}
                                        rules={{
                                            required: "Jenis UMKM wajib dipilih",
                                        }}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormSelect
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                invalid={errors.hasOwnProperty("type")}
                                                options={[
                                                    "Jenis UMKM",
                                                    { label: "Dagang", value: "0" },
                                                    { label: "Jasa", value: "1" },
                                                ]}
                                            />
                                        )}
                                    />
                                    <span className="invalid-feedback">{errors.type?.message}</span>
                                </CInputGroup>
                            </CCol>

                            <CCol xl={4} md={6}>
                                <CFormLabel>Negara</CFormLabel>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilGlobeAlt} />
                                    </CInputGroupText>
                                    <Controller
                                        name="region"
                                        control={control}
                                        rules={{
                                            required: "Negara wajib dipilih",
                                        }}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormSelect
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                invalid={errors.hasOwnProperty("region")}
                                                options={countries}
                                            />
                                        )}
                                    />
                                    <span className="invalid-feedback">
                                        {errors.region?.message}
                                    </span>
                                </CInputGroup>
                            </CCol>

                            <CCol xl={4} md={6}>
                                <CFormLabel>Mata Uang</CFormLabel>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilDollar} />
                                    </CInputGroupText>
                                    <Controller
                                        name="currency"
                                        control={control}
                                        rules={{
                                            required: "Mata uang wajib dipilih",
                                        }}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormSelect
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                invalid={errors.hasOwnProperty("currency")}
                                                options={currency}
                                            />
                                        )}
                                    />
                                    <span className="invalid-feedback">
                                        {errors.currency?.message}
                                    </span>
                                </CInputGroup>
                            </CCol>

                            <CCol sm={12}>
                                <CFormLabel>Alamat UMKM</CFormLabel>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilMap} />
                                    </CInputGroupText>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormInput
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                autoComplete="address"
                                                ref={ref}
                                                invalid={errors.hasOwnProperty("address")}
                                            />
                                        )}
                                    />
                                    <span className="invalid-feedback">
                                        {errors.address?.message}
                                    </span>
                                </CInputGroup>
                            </CCol>

                            <CCol lg={6}>
                                <CFormLabel>Nomor Telepon UMKM</CFormLabel>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilPhone} />
                                    </CInputGroupText>
                                    <Controller
                                        name="telephone"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormInput
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                autoComplete="telephone"
                                                ref={ref}
                                                invalid={errors.hasOwnProperty("telephone")}
                                            />
                                        )}
                                    />
                                    <span className="invalid-feedback">
                                        {errors.telephone?.message}
                                    </span>
                                </CInputGroup>
                            </CCol>

                            <CCol lg={6}>
                                <CFormLabel>Email</CFormLabel>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>@</CInputGroupText>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                message: "Format email salah",
                                            },
                                        }}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
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
                                </CInputGroup>
                            </CCol>
                        </CRow>

                        <div className="text-end">
                            <CButton color="success" type="submit">
                                Simpan
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    );
};

export default SetupStoreForm;
