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
    CFormSelect,
    CFormTextarea,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { purchaseRefNumber } from "src/helper/RefNumber";
import StatusAlert from "src/helper/StatusAlert";
import { get, post } from "src/network/api/network";
import PurchaseDetailForm from "./PurchaseDetailForm";

const PurchaseForm = () => {
    const date = new Date();

    const [state, setState] = useState({
        loading: false,
        disabled: true,
        showAlert: false,
        alertType: null,
        alertContent: "",
        supplier: [],
    });

    useEffect(() => {
        getSupplierList();
    }, [state.isReload]);

    const getSupplierList = async () => {
        const response = await get("/supplier");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                supplier: response.data,
            }));
        }
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            storeId: localStorage.getItem("storeId"),
            refNumber: purchaseRefNumber,
            supplierId: "",
            transDate: date.toJSON().slice(0, 10),
            dueDate: date.toJSON().slice(0, 10),
            description: "",
            itemDetail: [{ inventoryId: "", quantity: 1, pricePerUnit: 0, discount: 0, amount: 0 }],
            totalPayment: 0,
            dueNominal: 0,
            status: 1,
        },
        mode: "all",
    });

    const onSubmit = async (data) => {
        const response = await post("/purchase", data);
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
                    <h1 className="h4 m-3">Tambah Transaksi Pembelian</h1>
                </CCardHeader>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CCardBody>
                        <CRow>
                            <CCol md={4} className="mb-3">
                                <CFormLabel className="fw-bold text-grey">
                                    <small>Nomor Pembelian</small>
                                </CFormLabel>
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
                                            disabled
                                        />
                                    )}
                                />
                                <span className="invalid-feedback">
                                    {errors.refNumber?.message}
                                </span>
                            </CCol>

                            <CCol md={4} className="mb-3">
                                <CFormLabel className="fw-bold text-grey">
                                    <small>Supplier</small>
                                </CFormLabel>
                                <Controller
                                    name="supplierId"
                                    control={control}
                                    rules={{
                                        required: "Wajib memilih supplier",
                                    }}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormSelect
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            aria-label="Supplier"
                                            invalid={errors.hasOwnProperty("supplierId")}
                                        >
                                            <option>Pilih Supplier</option>
                                            {state?.supplier.map((supplier, index) => {
                                                return (
                                                    <option key={index} value={supplier.supplierId}>
                                                        {supplier.name}
                                                    </option>
                                                );
                                            })}
                                        </CFormSelect>
                                    )}
                                />
                                <span className="invalid-feedback">
                                    {errors.supplierId?.message}
                                </span>
                            </CCol>

                            <CCol md={4}></CCol>
                            <CCol md={4} className="mb-3">
                                <CFormLabel className="fw-bold text-grey">
                                    <small>Tanggal</small>
                                </CFormLabel>
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
                                <CFormLabel className="fw-bold text-grey">
                                    <small>Jatuh Tempo</small>
                                </CFormLabel>
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
                            <CCol md={12} className="mb-3">
                                <CFormLabel className="fw-bold text-grey">
                                    <small>Deskripsi</small>
                                </CFormLabel>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormTextarea
                                            rows="3"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                        />
                                    )}
                                />
                            </CCol>
                        </CRow>
                        <hr />
                        <PurchaseDetailForm control={control} setValue={setValue} />
                    </CCardBody>
                    <CCardFooter>
                        <CButton type="submit">Submit</CButton>
                    </CCardFooter>
                </CForm>
            </CCard>
        </>
    );
};

export default PurchaseForm;
