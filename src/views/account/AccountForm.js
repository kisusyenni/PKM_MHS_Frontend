/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { get, post, put } from "src/network/api/network";

const AccountForm = ({ action, openForm, handleClose, data, handleAlert }) => {
    const [state, setState] = useState({
        accountHeaderData: [],
        accountId: null,
        loading: false,
    });

    const getAccountHeaderData = async () => {
        const result = await get("/account-header");
        if (result.status === 200) {
            setState((prevState) => ({
                ...prevState,
                accountHeaderData: result.data,
            }));
            console.log(state.accountHeaderData);
        }
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            accountHeaderId: data ? data[1] : "",
            name: data ? data[2] : "",
            accountCode: data ? data[3] : "",
            position: data ? data[4] : "",
            is_header: 0,
            is_editable: 1,
            storeId: localStorage.getItem("storeId"),
        },
        mode: "all",
    });

    const accountHeaderOptions = [
        {
            label: "Pilih jenis akun",
            value: "",
        },
    ].concat(
        state.accountHeaderData.map((type) => ({
            label: type.name,
            value: type.accountHeaderId,
        })),
    );

    const positionOptions = [
        {
            label: "Pilih posisi saldo",
            value: "",
        },
        {
            label: "Debit",
            value: "0",
        },
        {
            label: "Kredit",
            value: "1",
        },
    ];

    useEffect(() => {
        getAccountHeaderData();
        setState((prevState) => ({
            ...prevState,
            accountId: data ? data[0] : null,
        }));
    }, [openForm]);

    const onSubmit = async (submitData) => {
        console.log(submitData);
        let response = null;
        switch (action) {
            case "add":
                response = await post("/account", submitData);
                break;

            case "edit":
                response = await put("/account", state.accountId, submitData);
                break;

            default:
                break;
        }

        if (response.status === 200) {
            handleAlert("success", response.data);
        } else {
            handleAlert("danger", response.data);
        }

        handleClose();
    };

    return (
        <>
            <CModal className="show" keyboard={false} portal={false} visible={openForm}>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CModalHeader closeButton={false}>
                        <CModalTitle>{action === "add" ? "Tambah" : "Ubah"} Akun</CModalTitle>
                        <CButton
                            className="btn btn-close"
                            onClick={handleClose}
                            aria-label="close"
                        ></CButton>
                    </CModalHeader>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="accountCode">Nomor Akun</CFormLabel>
                            <Controller
                                name="accountCode"
                                control={control}
                                rules={{
                                    required: "Nomor akun tidak boleh kosong",
                                }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        invalid={errors.hasOwnProperty("accountCode")}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors.accountCode?.message}</span>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="accountName">Nama Akun</CFormLabel>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Nama akun tidak boleh kosong",
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
                        <div className="mb-2">
                            <CFormLabel htmlFor="accountType">Jenis Akun</CFormLabel>
                            <Controller
                                name="accountHeaderId"
                                control={control}
                                rules={{
                                    required: "Jenis wajib dipilih",
                                }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormSelect
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        invalid={errors.hasOwnProperty("accountHeaderId")}
                                        options={accountHeaderOptions}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">
                                {errors.accountHeaderId?.message}
                            </span>
                        </div>
                        <div className="mb-2">
                            <CFormLabel htmlFor="accountType">Posisi Saldo</CFormLabel>
                            <Controller
                                name="position"
                                control={control}
                                rules={{
                                    required: "Posisi wajib dipilih",
                                }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormSelect
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        invalid={errors.hasOwnProperty("position")}
                                        options={positionOptions}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors.position?.message}</span>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton onClick={handleClose} color="secondary">
                            Close
                        </CButton>
                        <CButton type="submit" color="primary">
                            Save changes
                        </CButton>
                        {/* <CButton onClick={onSubmit} color="primary">
                        test
                    </CButton> */}
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    );
};

export default AccountForm;
