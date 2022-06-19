/* eslint-disable react/prop-types */
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CFormInput, CFormSelect, CInputGroup, CRow } from "@coreui/react";
import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import CalcSalesDetail from "./CalcSalesDetail";

const SalesDetailForm = ({ control, watch, errors, setValue }) => {
    const [state, setState] = useState({
        openModal: false,
        selectedInventory: null,
        total: 0,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "item",
    });

    return (
        <>
            <CRow className="mb-3">
                <CCol md={3}>
                    <h6 className="fw-bold">Inventaris</h6>
                </CCol>
                <CCol md={2}>
                    <h6 className="fw-bold">Kuantitas</h6>
                </CCol>
                <CCol md={3}>
                    <h6 className="fw-bold">Harga Per Unit</h6>
                </CCol>
                <CCol md={3}>
                    <h6 className="fw-bold">Jumlah</h6>
                </CCol>
            </CRow>
            {fields.map((item, index) => {
                return (
                    <CRow key={item.id} className="align-items-start">
                        <CCol md={3} className="mb-3">
                            <CInputGroup>
                                <Controller
                                    name={`item.${index}.inventoryId`}
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormSelect
                                            size="sm"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            aria-label="Inventaris"
                                            options={[
                                                "Inventaris",
                                                { label: "Kalung A", value: "1" },
                                                { label: "Kalung B", value: "2" },
                                            ]}
                                        />
                                    )}
                                />
                                {/* <CButton
                                    onClick={() => {
                                        setState((prevState) => ({
                                            ...prevState,
                                            openModal: true,
                                        }));
                                    }}
                                >
                                    <CIcon icon={cilSearch} />
                                </CButton> */}
                            </CInputGroup>
                        </CCol>
                        <CCol md={2} className="mb-3">
                            <Controller
                                name={`item.${index}.quantity`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        size="sm"
                                        type="number"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                    />
                                )}
                            />
                        </CCol>

                        <CCol md={3} className="mb-3">
                            <Controller
                                name={`item.${index}.pricePerUnit`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        size="sm"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                    />
                                )}
                            />
                        </CCol>
                        <CCol md={3} className="mb-3">
                            <Controller
                                name={`item.${index}.amount`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        size="sm"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        disabled
                                    />
                                )}
                            />
                        </CCol>
                        <CCol>
                            {index > 0 && (
                                <CButton size="sm" type="button" onClick={() => remove(index)}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            )}
                        </CCol>
                    </CRow>
                );
            })}
            <CButton
                size="sm"
                type="button"
                color="secondary"
                onClick={() => {
                    append({ name: "", quantity: 0, pricePerUnit: 0, amount: 0 });
                }}
            >
                Tambah
            </CButton>
            <hr />
            <CRow className="justify-content-end mb-3">
                <CCol xs={3}>Sub Total</CCol>
                <CCol xs={4}>
                    <Controller
                        name={`subtotal`}
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <CFormInput
                                size="sm"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                disabled
                            />
                        )}
                    />

                    <CalcSalesDetail control={control} setValue={setValue} />
                </CCol>
            </CRow>
            <CRow className="justify-content-end mb-3">
                <CCol xs={3}>Diskon</CCol>
                <CCol xs={4}>
                    <Controller
                        name={`discount`}
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <CFormInput
                                size="sm"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                            />
                        )}
                    />
                </CCol>
            </CRow>
            <CRow className="justify-content-end fw-bold mb-3">
                <CCol xs={3}>Total</CCol>
                <CCol xs={4}>
                    <Controller
                        name={`total`}
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <CFormInput
                                size="sm"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                disabled
                            />
                        )}
                    />
                </CCol>
            </CRow>
        </>
    );
};

export default SalesDetailForm;
