/* eslint-disable react/prop-types */
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CFormInput, CFormSelect, CInputGroup, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { get } from "src/network/api/network";
import CalcSalesDetail from "./CalcSalesDetail";

const SalesDetailForm = ({ control, watch, errors, setValue }) => {
    const [state, setState] = useState({
        openModal: false,
        selectedInventory: null,
        total: 0,
        inventory: [],
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "itemDetail",
    });

    const getInventoryList = async () => {
        const response = await get("/inventory");
        if (response.status === 200) {
            console.log(response.data);
            setState((prevState) => ({
                ...prevState,
                inventory: response.data,
            }));
        }
    };

    useEffect(() => {
        getInventoryList();
    }, [state.isReload]);

    const results = useWatch({ control, name: "itemDetail" });

    const checkData = (id) => {
        const check = results.some((value, index) => {
            return value.inventoryId === id;
        });
        return check;
    };

    const setAmount = (idx) => {
        let amount = 0;
        const check = results.some((value, index) => {
            amount = value.pricePerUnit * value.quantity;
            return index === idx;
        });
        return check ? amount : 0;
    };

    const setPrice = (id) => {
        let price = 0;
        const check = state.inventory.some((value) => {
            price = value.sellingPrice;
            return value.inventoryId === id;
        });
        return check ? price : 0;
    };

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
                                    name={`itemDetail.${index}.inventoryId`}
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormSelect
                                            size="sm"
                                            onChange={(e) => {
                                                onChange(e);
                                                setValue(
                                                    `itemDetail.${index}.pricePerUnit`,
                                                    setPrice(value),
                                                );
                                            }}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            aria-label="Inventaris"
                                        >
                                            <option>Pilih Inventory</option>
                                            {state.inventory.map((inventory, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={inventory.inventoryId}
                                                        disabled={checkData(inventory.inventoryId)}
                                                    >
                                                        {inventory.name}
                                                    </option>
                                                );
                                            })}
                                        </CFormSelect>
                                    )}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol md={2} className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.quantity`}
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
                                name={`itemDetail.${index}.pricePerUnit`}
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
                        <CCol md={3} className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.amount`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        size="sm"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={setAmount(index)}
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
                    append({ name: "", quantity: 1, pricePerUnit: 0, amount: 0 });
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
