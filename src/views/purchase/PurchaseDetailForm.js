/* eslint-disable react/prop-types */
import { cilSearch, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CRow,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

const PurchaseDetailForm = ({ control, watch, errors }) => {
    const [state, setState] = useState({
        openModal: false,
        selectedAccount: null,
        total: 0,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "item",
    });

    const itemFields = watch("item");

    const nominals = fields.map((field, index) => {
        return itemFields[index].pricePerUnit;
    });

    return (
        <>
            <CRow className="mb-3">
                <CCol md={4}>
                    <h6 className="fw-bold">Inventaris</h6>
                </CCol>
                <CCol md={3}>
                    <h6 className="fw-bold">Jumlah</h6>
                </CCol>
                <CCol md={4}>
                    <h6 className="fw-bold">Harga Per Unit</h6>
                </CCol>
            </CRow>
            {fields.map((item, index) => {
                return (
                    <CRow key={item.id} className="align-items-start">
                        <CCol md={4} className="mb-3">
                            <CInputGroup>
                                <Controller
                                    name={`item.${index}.inventoryId`}
                                    control={control}
                                    rules={{
                                        required: "Wajib memilih inventaris",
                                    }}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormSelect
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            aria-label="Inventaris"
                                            invalid={errors.hasOwnProperty(
                                                `item.${index}.inventoryId`,
                                            )}
                                            options={[
                                                "Inventaris",
                                                { label: "Kalung A", value: "1" },
                                                { label: "Kalung B", value: "1" },
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
                        <CCol md={3} className="mb-3">
                            <Controller
                                name={`item.${index}.quantity`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        type="number"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                    />
                                )}
                            />
                        </CCol>

                        <CCol md={4} className="mb-3">
                            <Controller
                                name={`item.${index}.pricePerUnit`}
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
                        </CCol>
                        <CCol>
                            {index > 0 && (
                                <CButton type="button" onClick={() => remove(index)}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            )}
                        </CCol>
                    </CRow>
                );
            })}
            <CButton
                type="button"
                onClick={() => {
                    append({ name: "", quantity: 0, pricePerUnit: 0 });
                }}
            >
                Tambah
            </CButton>
            <hr />
            <CRow className="justify-content-end fw-bold">
                <CCol xs={3}>Total</CCol>
                <CCol xs={4}>
                    {nominals.reduce((result, item) => parseInt(result) + parseInt(item))}
                </CCol>
            </CRow>
        </>
    );
};

export default PurchaseDetailForm;
