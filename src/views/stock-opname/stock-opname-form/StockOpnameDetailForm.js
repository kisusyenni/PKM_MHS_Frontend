/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { get } from "src/network/api/network";

const StockOpnameDetailForm = ({ control, setValue }) => {
    const [state, setState] = useState({
        inventory: [],
        isReload: null,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "itemDetail",
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

    const watchItems = useWatch({ control, name: "itemDetail" });

    const checkData = (id) => {
        const check = watchItems.some((value) => {
            return value.inventoryId === id;
        });
        return check;
    };

    const setDifference = (idx) => {
        let difference = 0;
        const check = watchItems.some((value, index) => {
            difference = value.qtyStart - value.qtyEnd;
            return index === idx;
        });
        if (check) {
            return difference;
        } else {
            return 0;
        }
    };

    return (
        <>
            <CRow className="mb-3 align-items-center">
                <CCol md={3}>
                    <small className="fw-bold">Inventaris</small>
                </CCol>
                <CCol>
                    <small className="fw-bold">Qty Awal</small>
                </CCol>
                <CCol>
                    <small className="fw-bold">Qty Akhir</small>
                </CCol>
                <CCol>
                    <small className="fw-bold">Selisih</small>
                </CCol>
                <CCol md={4}>
                    <small className="fw-bold">Keterangan</small>
                </CCol>
                <CCol md={1}></CCol>
            </CRow>
            {fields.map((item, index) => {
                return (
                    <CRow key={item.id} className="align-items-start">
                        <CCol md={3} className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.inventoryId`}
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
                        </CCol>
                        <CCol className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.qtyStart`}
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
                        <CCol className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.qtyEnd`}
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
                        <CCol className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.difference`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        size="sm"
                                        type="number"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={setDifference(index)}
                                        ref={ref}
                                        disabled
                                    />
                                )}
                            />
                        </CCol>
                        <CCol md={4} className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.description`}
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
                        <CCol md={1}>
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
                    append({
                        inventoryId: "",
                        qtyStart: 1,
                        qtyEnd: 0,
                        difference: 0,
                        description: "",
                    });
                }}
            >
                Tambah
            </CButton>
        </>
    );
};

export default StockOpnameDetailForm;
