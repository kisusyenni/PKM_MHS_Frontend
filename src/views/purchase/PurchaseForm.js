import { cilSearch, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
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
    CInputGroup,
    CRow,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import PurchaseDetailForm from "./PurchaseDetailForm";

const PurchaseForm = () => {
    const date = new Date();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            transNo: "PU0001",
            supplierId: "",
            methodId: "",
            transDate: date.toJSON().slice(0, 10),
            dueDate: date.toJSON().slice(0, 10),
            description: "",
            item: [{ name: "", quantity: 0, pricePerUnit: 0 }],
        },
        mode: "all",
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <>
                <CCard>
                    <CCardHeader>
                        <h1 className="h4 m-3">Tambah Transaksi Pembelian</h1>
                    </CCardHeader>
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <CCardBody>
                            <CRow>
                                <CCol md={4} className="mb-3">
                                    <CFormLabel>Supplier</CFormLabel>
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
                                                options={[
                                                    "Supplier",
                                                    { label: "Toko ABC", value: "1" },
                                                    { label: "Toko BCD", value: "2" },
                                                ]}
                                            />
                                        )}
                                    />
                                    <span className="invalid-feedback">
                                        {errors.supplierId?.message}
                                    </span>
                                </CCol>

                                <CCol md={4} className="mb-3">
                                    <CFormLabel>Nomor Pembelian</CFormLabel>
                                    <Controller
                                        name="transNo"
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
                                                invalid={errors.hasOwnProperty("transNo")}
                                            />
                                        )}
                                    />
                                    <span className="invalid-feedback">
                                        {errors.transNo?.message}
                                    </span>
                                </CCol>
                                <CCol md={4} className="mb-3">
                                    <CFormLabel>Metode Pembayaran</CFormLabel>
                                    <Controller
                                        name="methodId"
                                        control={control}
                                        rules={{
                                            required: "Wajib memilih metode pembayaran",
                                        }}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormSelect
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
                                    <span className="invalid-feedback">
                                        {errors.methodId?.message}
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
                                    <span className="invalid-feedback">
                                        {errors.dueDate?.message}
                                    </span>
                                </CCol>
                                <CCol md={12} className="mb-3">
                                    <CFormLabel>Deskripsi</CFormLabel>
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
                            <PurchaseDetailForm control={control} watch={watch} errors={errors} />
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit">Submit</CButton>
                        </CCardFooter>
                    </CForm>
                </CCard>

                {/* {state.openModal ? (
                <AccountModal
                    openModal={state.openModal}
                    handleClose={handleClose}
                    selectAccount={selectAccount}
                />
            ) : (
                <></>
            )} */}
            </>
        </>
    );
};

export default PurchaseForm;
