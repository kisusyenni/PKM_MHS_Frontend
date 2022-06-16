/* eslint-disable react/prop-types */
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from "@coreui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import StatusAlert from "src/helper/StatusAlert";

const PaymentForm = ({ type, purchaseId, total }) => {
    const date = new Date();

    const [state, setState] = useState({
        nominal: 0,
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
    } = useForm({
        defaultValues: {
            purchaseId: purchaseId,
            methodId: "1",
            date: date.toJSON().slice(0, 10),
            nominal: total,
            code: "PY001",
        },
        mode: "all",
    });

    const closeAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
        }));
    };

    const onSubmit = (data) => {
        console.log(data);
        if (type === "purchase") {
            console.log("purchase payment");
        } else if (type === "sales") {
            console.log("sales payment");
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
                        <CFormLabel htmlFor="name">Nomor Pembayaran</CFormLabel>
                        <Controller
                            name="code"
                            control={control}
                            rules={{
                                required: "Kode tidak boleh kosong",
                            }}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <CFormInput
                                    size="sm"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    invalid={errors.hasOwnProperty("code")}
                                />
                            )}
                        />
                        <span className="invalid-feedback">{errors.code?.message}</span>
                    </CCol>

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
                    <CCol>
                        <CButton type="submit">Submit</CButton>
                    </CCol>
                </CRow>
            </CForm>
        </>
    );
};

export default PaymentForm;
