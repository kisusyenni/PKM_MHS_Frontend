/* eslint-disable react/prop-types */
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCol,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFormInput,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import NumberFormat from "react-number-format";
import { get } from "src/network/api/network";
import CalcSalesDetail from "./CalcSalesDetail";

const SalesDetailForm = ({ control, watch, errors, setValue }) => {
    const [state, setState] = useState({
        openModal: false,
        total: 0,
        inventory: [],
    });

    const [selectedInventory, setInventory] = useState(["Pilih Inventaris"]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "itemDetail",
    });

    const getInventoryList = async () => {
        const response = await get("/inventory");
        if (response.status === 200) {
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
        const check = results.some((value) => {
            return value.inventoryId === id;
        });
        return check;
    };

    const setAmount = (idx) => {
        let amount = 0;
        const check = results.some((value, index) => {
            amount = (value.pricePerUnit - value.discount) * value.quantity;
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
                <CCol md={2}>
                    <h6 className="fw-bold">Harga Per Unit</h6>
                </CCol>
                <CCol md={2}>
                    <h6 className="fw-bold">Diskon</h6>
                </CCol>
                <CCol md={2}>
                    <h6 className="fw-bold">Jumlah</h6>
                </CCol>
            </CRow>
            {fields.map((item, index) => {
                return (
                    <CRow key={item.id} className="align-items-start">
                        <CCol md={3} className="mb-3">
                            <CDropdown className="w-100">
                                <CDropdownToggle
                                    color="white"
                                    className="text-start border border-secondary"
                                >
                                    {selectedInventory[index + 1]
                                        ? selectedInventory[index + 1]
                                        : selectedInventory[0]}
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    {state.inventory.map((inventory, idx) => {
                                        return (
                                            <CDropdownItem
                                                key={idx}
                                                type="button"
                                                onClick={() => {
                                                    const inventoryData = [...selectedInventory];
                                                    inventoryData[index + 1] = inventory.name;
                                                    setInventory(inventoryData);
                                                    setValue(
                                                        `itemDetail.${index}.inventoryId`,
                                                        inventory.inventoryId,
                                                    );
                                                    setValue(
                                                        `itemDetail.${index}.pricePerUnit`,
                                                        setPrice(inventory.inventoryId),
                                                    );
                                                }}
                                                disabled={
                                                    inventory.quantity <= 0 ||
                                                    checkData(inventory.inventoryId)
                                                }
                                            >
                                                {inventory.name}{" "}
                                                {inventory.quantity <= 0 && (
                                                    <i
                                                        className="text-danger"
                                                        style={{ fontSize: 14 }}
                                                    >
                                                        Stok Habis
                                                    </i>
                                                )}
                                            </CDropdownItem>
                                        );
                                    })}
                                </CDropdownMenu>
                            </CDropdown>
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

                        <CCol md={2} className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.pricePerUnit`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <NumberFormat
                                        customInput={CFormInput}
                                        size="sm"
                                        ref={ref}
                                        onBlur={onBlur}
                                        value={value}
                                        onChange={onChange}
                                        allowLeadingZeros={false}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                        disabled
                                    />
                                )}
                            />
                        </CCol>
                        <CCol md={2} className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.discount`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <NumberFormat
                                        customInput={CFormInput}
                                        size="sm"
                                        ref={ref}
                                        onBlur={onBlur}
                                        value={value}
                                        allowLeadingZeros={false}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            setValue(`itemDetail.${index}.discount`, value);
                                        }}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                    />
                                )}
                            />
                        </CCol>
                        <CCol md={2} className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.amount`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <NumberFormat
                                        customInput={CFormInput}
                                        size="sm"
                                        ref={ref}
                                        onBlur={onBlur}
                                        value={setAmount(index)}
                                        onChange={onChange}
                                        allowLeadingZeros={false}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
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
                    append({
                        inventoryId: "",
                        quantity: 1,
                        pricePerUnit: 0,
                        discount: 0,
                        amount: 0,
                    });
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
                            <NumberFormat
                                customInput={CFormInput}
                                size="sm"
                                ref={ref}
                                onBlur={onBlur}
                                value={value}
                                onChange={onChange}
                                allowLeadingZeros={false}
                                thousandSeparator={true}
                                prefix={"Rp"}
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
                            <NumberFormat
                                customInput={CFormInput}
                                size="sm"
                                ref={ref}
                                onBlur={onBlur}
                                value={value}
                                allowLeadingZeros={false}
                                onValueChange={(values) => {
                                    const { formattedValue, value } = values;
                                    setValue("discount", value);
                                }}
                                thousandSeparator={true}
                                prefix={"Rp"}
                            />
                        )}
                    />
                </CCol>
            </CRow>
            <CRow className="justify-content-end fw-bold mb-3">
                <CCol xs={3}>Total</CCol>
                <CCol xs={4}>
                    <Controller
                        name={`totalPayment`}
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <NumberFormat
                                customInput={CFormInput}
                                size="sm"
                                ref={ref}
                                onBlur={onBlur}
                                value={value}
                                onChange={onChange}
                                allowLeadingZeros={false}
                                thousandSeparator={true}
                                prefix={"Rp"}
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
