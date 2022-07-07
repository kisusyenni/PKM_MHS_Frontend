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
    CFormSelect,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { get } from "src/network/api/network";

const StockOpnameDetailForm = ({ control, setValue }) => {
    const [state, setState] = useState({
        inventory: [],
        isReload: null,
        currentIdx: 0,
    });

    const [selectedInventory, setInventory] = useState(["Pilih Inventaris"]);

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
        console.log(idx);
        let difference = 0;
        const check = watchItems.some((value, index) => {
            difference = value.qtyStart - value.qtyEnd;
            console.log(value.qtyStart);
            return index === idx;
        });

        console.log(check);

        if (check) setValue(`itemDetail.${idx}.difference`, difference);

        console.log(difference);
    };

    const getDifference = (idx) => {
        let difference = 0;
        const check = watchItems.some((value, index) => {
            difference = value.qtyStart - value.qtyEnd;
            console.log(value.qtyStart);
            return index === idx;
        });

        console.log(check);

        return check ? difference : 0;
    };

    // const setQtyStart = (id) => {
    //     let qty = 0;
    //     const check = state.inventory.some((value) => {
    //         qty = value.quantity;
    //         return value.inventoryId === id;
    //     });
    //     return check ? qty : 0;
    // };

    useEffect(() => {
        console.log(watchItems);
    }, [watchItems]);

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
                                                    setValue(
                                                        `itemDetail.${index}.qtyStart`,
                                                        inventory.quantity,
                                                    );

                                                    setValue(
                                                        `itemDetail.${index}.difference`,
                                                        getDifference(index),
                                                    );
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
                        <CCol className="mb-3">
                            <Controller
                                name={`itemDetail.${index}.qtyStart`}
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        size="sm"
                                        type="number"
                                        onChange={(e) => {
                                            onChange(e);
                                            setDifference(index);
                                        }}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        disabled
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
                                        onChange={(e) => {
                                            onChange(e);
                                            setDifference(index);
                                        }}
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
                                        value={getDifference(index)}
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
