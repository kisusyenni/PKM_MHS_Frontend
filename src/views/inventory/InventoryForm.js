/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CFormLabel,
    CSpinner,
} from "@coreui/react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import { get, post, put } from "src/network/api/network";
import StatusAlert from "src/helper/StatusAlert";

const InventoryForm = ({ title, editMode }) => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        sellingPrice: 0,
        loading: false,
        disabled: true,
        showAlert: false,
        alertType: null,
        alertContent: "",
        isReload: null,
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            storeId: localStorage.getItem("storeId"),
            name: "",
            quantity: 0,
            sellingPrice: 0,
        },
        mode: "all",
    });

    const getInventoryDetail = async () => {
        const result = await get(`/inventory/${id}`);
        if (result.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: result.data,
            }));

            const inputs = ["name", "quantity", "sellingPrice"];

            inputs.forEach((value) => {
                setValue(value, result.data[value]);
            });
        }
    };

    useEffect(() => {
        if (editMode) {
            getInventoryDetail();
        }
    }, [state.isReload]);

    useEffect(() => {
        if (isDirty) {
            setState((prevState) => ({
                ...prevState,
                disabled: false,
            }));
        }
    }, [isDirty]);

    const closeAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
        }));
    };

    // After submit button is clicked
    const onSubmit = async (data) => {
        // show loading on button
        setState((prevState) => ({
            ...prevState,
            loading: true,
            disabled: true,
        }));

        data.sellingPrice = state.sellingPrice;

        // edit or add form
        // edit form
        if (editMode) {
            const response = await put("/inventory", id, data);
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
        } else {
            // add form
            const response = await post("/inventory", data);
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
        }
    };

    return (
        <>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <StatusAlert
                    showAlert={state.showAlert}
                    type={state.alertType}
                    content={state.alertContent}
                    closeAlert={closeAlert}
                />
                <CCard>
                    <CCardHeader>{title}</CCardHeader>
                    <CCardBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="name">Nama</CFormLabel>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Nama tidak boleh kosong",
                                }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        invalid={errors.hasOwnProperty("name")}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors.name?.message}</span>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="quantity">Jumlah</CFormLabel>
                            <Controller
                                name="quantity"
                                control={control}
                                rules={{
                                    required: "Jumlah tidak boleh kosong",
                                }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        type="number"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        invalid={errors.hasOwnProperty("quantity")}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors.quantity?.message}</span>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="sellingPrice">Harga Jual</CFormLabel>
                            <Controller
                                name="sellingPrice"
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <NumberFormat
                                        customInput={CFormInput}
                                        defaultValue={0}
                                        ref={ref}
                                        onBlur={onBlur}
                                        value={value}
                                        onChange={onChange}
                                        allowLeadingZeros={false}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;

                                            setState((prevState) => ({
                                                ...prevState,
                                                sellingPrice: parseInt(value),
                                            }));
                                        }}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors.sellingPrice?.message}</span>
                        </div>
                        <CButton type="submit" color="primary" disabled={state.disabled}>
                            <CSpinner className="me-2" size="sm" hidden={!state.loading}></CSpinner>
                            {editMode ? "Simpan Perubahan" : "Tambah Inventaris"}
                        </CButton>
                    </CCardBody>
                </CCard>
            </CForm>
        </>
    );
};

export default InventoryForm;
