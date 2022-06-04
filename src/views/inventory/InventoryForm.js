/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CFormLabel,
} from "@coreui/react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

const InventoryForm = ({ title, isEdit }) => {
    const [state, setState] = useState({
        sellingPrice: 0,
    });

    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            quantity: 0,
            sellingPrice: 0,
        },
        mode: "all",
    });

    const onSubmit = (data) => {
        data.sellingPrice = state.sellingPrice;
        console.log(data);
    };

    return (
        <>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CCard>
                    <CCardHeader>{title}</CCardHeader>
                    <CCardBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="name">Nama</CFormLabel>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Nama tidak boleh kosong",
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
                        <div className="mb-3">
                            <CFormLabel htmlFor="quantity">Jumlah</CFormLabel>
                            <Controller
                                name="quantity"
                                control={control}
                                rules={{
                                    required: "Jumlah tidak boleh kosong",
                                }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CFormInput
                                        type="number"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        invalid={errors.hasOwnProperty("quantity")}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors.quantity?.message}</span>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="sellingPrice">Harga Jual</CFormLabel>
                            <Controller
                                name="sellingPrice"
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <NumberFormat
                                        customInput={CFormInput}
                                        defaultValue={0}
                                        ref={ref}
                                        onBlur={onBlur}
                                        value={value}
                                        onChange={onChange}
                                        allowLeadingZeros={false}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;

                                            setState((prevState) => ({
                                                ...prevState,
                                                sellingPrice: parseInt(value),
                                            }));
                                        }}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors.sellingPrice?.message}</span>
                        </div>
                        <CButton type="submit" color="primary">
                            Save changes
                        </CButton>
                    </CCardBody>
                </CCard>
            </CForm>
        </>
    );
};

export default InventoryForm;
