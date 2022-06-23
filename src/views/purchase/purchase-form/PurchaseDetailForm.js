/* eslint-disable react/prop-types */
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CFormInput, CFormSelect, CInputGroup, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import CalcPurchaseDetail from "./CalcPurchaseDetail";
import { get } from "src/network/api/network";

const PurchaseDetailForm = ({ control, watch, setValue }) => {
    const [state, setState] = useState({
        openModal: false,
        selectedInventory: null,
        total: 0,
        inventory: [],
        isReload: null,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "item",
    });

    useEffect(() => {
        getInventoryList();
    }, [state.isReload]);

    const getInventoryList = async () => {
        const response = await get("/inventory");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                inventory: response.data,
            }));
        }
    };

    const watchItem = watch("item");

    const checkData = (id) => {
        const check = watchItem.some((value, index) => {
            return value.inventoryId === id;
        });
        return check;
    };

    const setPricePerUnit = (idx) => {
        let price = 1000;
        const check = watchItem.some((value, index) => {
            price = state?.inventory[index]?.sellingPrice || 0;
            return index === idx;
        });
        return check ? price : 0;
    };

    const setAmount = (idx) => {
        let amount = 0;
        const check = watchItem.some((value, index) => {
            amount = (value.pricePerUnit - value.discount) * value.quantity;
            return index === idx;
        });
        if (check) {
            return amount;
        } else {
            return 0;
        }
    };

    return (
        <>
            <CRow className="mb-3">
                <CCol md={3}>
                    <small className="fw-bold">Inventaris</small>
                </CCol>
                <CCol md={2}>
                    <small className="fw-bold">Kuantitas</small>
                </CCol>
                <CCol md={2}>
                    <small className="fw-bold">Harga Per Unit</small>
                </CCol>
                <CCol md={2}>
                    <small className="fw-bold">Diskon</small>
                </CCol>
                <CCol md={2}>
                    <small className="fw-bold">Jumlah</small>
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

                        <CCol md={2} className="mb-3">
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
                        <CCol md={2} className="mb-3">
                            <Controller
                                name={`item.${index}.discount`}
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
                        <CCol md={2} className="mb-3">
                            <Controller
                                name={`item.${index}.amount`}
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
                    append({ name: "", quantity: 1, pricePerUnit: 0, discount: 0, amount: 0 });
                }}
            >
                Tambah
            </CButton>
            <hr />
            <CRow className="justify-content-end fw-bold">
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

                    <CalcPurchaseDetail control={control} setValue={setValue} />
                </CCol>
            </CRow>
        </>
    );
};

export default PurchaseDetailForm;
