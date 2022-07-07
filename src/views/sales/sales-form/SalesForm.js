import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StatusAlert from "src/helper/StatusAlert";
import { post } from "src/network/api/network";
import SalesDetailForm from "./SalesDetailForm";

const SalesForm = () => {
    const date = new Date();

    const [state, setState] = useState({
        loading: false,
        disabled: true,
        showAlert: false,
        alertType: null,
        alertContent: "",
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            storeId: localStorage.getItem("storeId"),
            refNumber: "PU0001",
            transDate: date.toJSON().slice(0, 10),
            dueDate: date.toJSON().slice(0, 10),
            dueNominal: 0,
            totalPayment: 0,
            discount: 0,
            subtotal: 0,
            itemDetail: [{ inventoryId: "", quantity: 1, pricePerUnit: 0, discount: 0, amount: 0 }],
            status: 1,
        },
        mode: "all",
    });

    const onSubmit = async (data) => {
        const response = await post("/sales", data);
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

    const closeAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
        }));
    };

    return (
        <>
            <StatusAlert
                showAlert={state.showAlert}
                type={state.alertType}
                content={state.alertContent}
                closeAlert={closeAlert}
            />
            <CCard>
                <CCardHeader>
                    <h1 className="h4 m-3">Tambah Transaksi Penjualan</h1>
                </CCardHeader>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CCardBody>
                        <CRow>
                            <CCol md={4} className="mb-3">
                                <CFormLabel>Nomor Pembelian</CFormLabel>
                                <Controller
                                    name="refNumber"
                                    control={control}
                                    rules={{
                                        required: "Nomor transaksi tidak boleh kosong",
                                    }}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormInput
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            invalid={errors.hasOwnProperty("refNumber")}
                                        />
                                    )}
                                />
                                <span className="invalid-feedback">
                                    {errors.refNumber?.message}
                                </span>
                            </CCol>
                            <CCol md={4} className="mb-3">
                                <CFormLabel>Tanggal</CFormLabel>
                                <Controller
                                    name="transDate"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormInput
                                            type="date"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            invalid={errors.hasOwnProperty("transDate")}
                                        />
                                    )}
                                />
                                <span className="invalid-feedback">
                                    {errors.transDate?.message}
                                </span>
                            </CCol>
                            <CCol md={4} className="mb-3">
                                <CFormLabel>Tanggal Jatuh Tempo</CFormLabel>
                                <Controller
                                    name="dueDate"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormInput
                                            type="date"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            invalid={errors.hasOwnProperty("dueDate")}
                                        />
                                    )}
                                />
                                <span className="invalid-feedback">{errors.dueDate?.message}</span>
                            </CCol>
                        </CRow>
                        <hr />
                        <SalesDetailForm
                            control={control}
                            watch={watch}
                            errors={errors}
                            setValue={setValue}
                        />
                    </CCardBody>
                    <CCardFooter>
                        <CButton type="submit">Submit</CButton>
                    </CCardFooter>
                </CForm>
            </CCard>
        </>
    );
};

export default SalesForm;
