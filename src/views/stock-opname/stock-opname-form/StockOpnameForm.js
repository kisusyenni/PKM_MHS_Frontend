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
    CFormTextarea,
    CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StatusAlert from "src/helper/StatusAlert";
import { post } from "src/network/api/network";
import StockOpnameDetailForm from "./StockOpnameDetailForm";

const StockOpnameForm = () => {
    const date = new Date();

    const [state, setState] = useState({
        loading: false,
        disabled: true,
        showAlert: false,
        alertType: null,
        alertContent: "",
        supplier: [],
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            storeId: localStorage.getItem("storeId"),
            userId: localStorage.getItem("userId"),
            date: date.toJSON().slice(0, 10),
            description: "",
            itemDetail: [
                {
                    inventoryId: "",
                    qtyStart: 1,
                    qtyEnd: 1,
                    difference: 0,
                    description: "",
                },
            ],
        },
        mode: "all",
    });

    const onSubmit = async (data) => {
        const response = await post("/stock-opname", data);
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
            <>
                <StatusAlert
                    showAlert={state.showAlert}
                    type={state.alertType}
                    content={state.alertContent}
                    closeAlert={closeAlert}
                />
                <CCard>
                    <CCardHeader>
                        <h1 className="h4 m-3">Tambah Stock Opname</h1>
                    </CCardHeader>
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <CCardBody>
                            <CRow>
                                <CCol md={4} className="mb-3">
                                    <CFormLabel className="fw-bold text-grey">
                                        <small>Tanggal</small>
                                    </CFormLabel>
                                    <Controller
                                        name="date"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormInput
                                                type="date"
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
                                <CCol md={12} className="mb-3">
                                    <CFormLabel className="fw-bold text-grey">
                                        <small>Keterangan</small>
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
                            <StockOpnameDetailForm control={control} setValue={setValue} />
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit">Submit</CButton>
                        </CCardFooter>
                    </CForm>
                </CCard>
            </>
        </>
    );
};

export default StockOpnameForm;
