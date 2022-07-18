/* eslint-disable react-hooks/exhaustive-deps */
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

const PurchaseDetailForm = ({ control, setValue }) => {
    const [state, setState] = useState({
        openModal: false,
        selectedInventory: null,
        total: 0,
        inventory: [],
        isReload: null,
    });

    const [selectedInventory, setInventory] = useState(["Pilih Inventaris"]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "itemDetail",
    });

    const getInventoryList = async () => {
        const response = await get("/inventory/product");
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
    let total = 0;

    const checkData = (id) => {
        const check = results.some((value, index) => {
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
        if (check) {
            return amount;
        } else {
            return 0;
        }
    };

    const output = () => {
        let totalValue = 0;

        for (let i = 0; i < results.length; i++) {
            let count = (results[i].pricePerUnit - results[i].discount) * results[i].quantity;
            totalValue += count;
        }
        total = totalValue;
        return totalValue;
    };

    useEffect(() => {
        output();
        setValue("totalPayment", total);
        setValue("dueNominal", total);
    }, [results]);

    return (
        <>
            <CRow className="mb-3">
                <CCol md={4}>
                    <small className="fw-bold">Inventaris</small>
                </CCol>
                <CCol md={1}>
                    <small className="fw-bold">Qty</small>
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
                        <CCol md={4} className="mb-3">
                            <CDropdown className="w-100">
                                <CDropdownToggle
                                    size="sm"
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
                                                    setAmount(index);
                                                }}
                                                disabled={checkData(inventory.inventoryId)}
                                            >
                                                {inventory.name}
                                            </CDropdownItem>
                                        );
                                    })}
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol md={1} className="mb-3">
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
                                        allowLeadingZeros={false}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            setValue(`itemDetail.${index}.pricePerUnit`, value);
                                        }}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
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
            <CRow className="justify-content-end fw-bold">
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
                            />
                        )}
                    />
                </CCol>
            </CRow>
        </>
    );
};

export default PurchaseDetailForm;
