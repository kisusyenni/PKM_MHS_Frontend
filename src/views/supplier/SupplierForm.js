/* eslint-disable react/prop-types */
import {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from "@coreui/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";

const SupplierForm = ({ action, openForm, handleClose, data, handleAlert }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            storeId: localStorage.getItem("storeId"),
            // storeId: 1,
            name: "",
            address: "",
            telephone: "",
            email: "",
        },
        mode: "all",
    });

    useEffect(() => {
        if (action === "edit" && data) {
            const inputs = ["name", "address", "telephone", "email"];

            inputs.forEach((value, index) => {
                setValue(value, data[index + 1]);
            });
        }
    }, [action, data, setValue]);

    const onSubmit = (data) => {
        console.log(data);
    };

    const closeForm = () => {
        reset();
        handleClose();
    };

    return (
        <>
            <CModal className="show" keyboard={false} portal={false} visible={openForm}>
                <CModalHeader closeButton={false}>
                    <CModalTitle>{action === "add" ? "Tambah" : "Ubah"} Supplier</CModalTitle>
                    <CButton
                        className="btn btn-close"
                        onClick={closeForm}
                        aria-label="close"
                    ></CButton>
                </CModalHeader>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CModalBody>
                        <Controller
                            name="storeId"
                            control={control}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <CFormInput
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    disabled
                                    hidden
                                />
                            )}
                        />
                        <span className="invalid-feedback">{errors.storeId?.message}</span>

                        <div className="mb-3">
                            <CFormLabel>Nama</CFormLabel>
                            <Controller
                                name="name"
                                rules={{
                                    required: "Nama tidak boleh kosong",
                                }}
                                control={control}
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
                            <CFormLabel>Alamat</CFormLabel>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel>Nomor Telepon</CFormLabel>
                            <Controller
                                name="telephone"
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <NumberFormat
                                        customInput={CFormInput}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        format="+62 ### #### ####"
                                        allowEmptyFormatting
                                        mask=""
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel>Email</CFormLabel>
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
                                        placeholder="supplier@email.com"
                                        ref={ref}
                                        invalid={errors.hasOwnProperty("email")}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors.email?.message}</span>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton onClick={closeForm} color="secondary">
                            Close
                        </CButton>
                        <CButton type="submit" color="primary">
                            Save changes
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    );
};

export default SupplierForm;
