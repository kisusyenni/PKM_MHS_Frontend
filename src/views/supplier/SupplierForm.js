/* eslint-disable react/prop-types */
import {
    CButton,
    CFormInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from "@coreui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const SupplierForm = ({ action, openForm, handleClose, data, handleAlert }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            
        },
        mode: "all",
    });

    return (
        <>
            <CModal className="show" keyboard={false} portal={false} visible={openForm}>
                <CModalHeader>
                    <CModalTitle>{action === "add" ? "Tambah" : "Ubah"} Supplier</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Controller
                        name="type"
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
                    /></CModalBody>
                <CModalFooter>
                    <CButton color="secondary">Close</CButton>
                    <CButton color="primary">Save changes</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default SupplierForm;
