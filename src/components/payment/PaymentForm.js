/* eslint-disable react/prop-types */
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from "@coreui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useLocation, useNavigate } from "react-router-dom";
import { getToday } from "src/helper/generate_date";
import StatusAlert from "src/helper/StatusAlert";
import { post } from "src/network/api/network";

const PaymentForm = ({ type, id, total }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [state, setState] = useState({
        nominal: total,
        loading: false,
        disabled: false,
        showAlert: false,
        alertType: null,
        alertContent: "",
        isReload: null,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            methodId: "1",
            date: getToday(),
            nominal: total,
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
        let response = null;
        data.nominal = state.nominal;
        if (type === "purchase") {
            data.purchaseId = id;
            response = await post("/purchase/payment", data);
        } else if (type === "sales") {
            data.salesId = id;
            response = await post("/sales/payment", data);
        }

        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                disabled: false,
                showAlert: true,
                alertType: "success",
                alertContent: response.data,
            }));
            setTimeout(() => {
                closeAlert();
                reset();
                if (location?.pathname.includes("pembelian")) {
                    navigate("/pembelian");
                } else if (location?.pathname.includes("penjualan")) {
                    navigate("/penjualan");
                } else {
                    navigate("/dashboard");
                }
            }, 2000);
        } else {
            // show error
            setState((prevState) => ({
                ...prevState,
                loading: false,
                disabled: false,
                showAlert: true,
                alertType: "danger",
                alertContent: response.data,
            }));
            setTimeout(() => {
                closeAlert();
            }, 2000);
        }
    };

    return (
        <>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                {state.showAlert && (
                    <StatusAlert
                        showAlert={state.showAlert}
                        type={state.alertType}
                        content={state.alertContent}
                        closeAlert={closeAlert}
                    />
                )}
                <CRow>
                    <CCol md={6} className="mb-3">
                        <CFormLabel>Tanggal</CFormLabel>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <CFormInput
                                    type="date"
                                    size="sm"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    invalid={errors.hasOwnProperty("date")}
                                />
                            )}
                        />
                        <span className="invalid-feedback">{errors.date?.message}</span>
                    </CCol>
                    <CCol md={6} className="mb-3">
                        <CFormLabel>Metode Pembayaran</CFormLabel>
                        <Controller
                            name="methodId"
                            control={control}
                            rules={{
                                required: "Wajib memilih metode pembayaran",
                            }}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <CFormSelect
                                    size="sm"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    aria-label="Metode Pembayaran"
                                    invalid={errors.hasOwnProperty("methodId")}
                                    options={[
                                        "Metode",
                                        { label: "Cash", value: "1" },
                                        { label: "Kartu Debit", value: "2" },
                                        { label: "Kartu Kredit", value: "3" },
                                        { label: "QRIS/E-Money", value: "4" },
                                    ]}
                                />
                            )}
                        />
                        <span className="invalid-feedback">{errors.methodId?.message}</span>
                    </CCol>

                    <CCol md={12} className="mb-3">
                        <CFormLabel>Total Dibayar</CFormLabel>
                        <Controller
                            name="nominal"
                            control={control}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <NumberFormat
                                    customInput={CFormInput}
                                    size="sm"
                                    ref={ref}
                                    onBlur={onBlur}
                                    value={value}
                                    onChange={onChange}
                                    invalid={errors.hasOwnProperty("nominal")}
                                    allowLeadingZeros={false}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;

                                        setState((prevState) => ({
                                            ...prevState,
                                            nominal: parseInt(value),
                                        }));
                                    }}
                                    thousandSeparator={true}
                                    prefix={"Rp"}
                                />
                            )}
                        />
                        <span className="invalid-feedback">{errors.nominal?.message}</span>
                    </CCol>

                    <CCol className="text-end">
                        <CButton type="submit">Submit</CButton>
                    </CCol>
                </CRow>
            </CForm>
        </>
    );
};

export default PaymentForm;
