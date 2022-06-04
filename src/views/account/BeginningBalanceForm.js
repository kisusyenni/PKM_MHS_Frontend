/* eslint-disable react/prop-types */
import { cilCheck, cilPen, cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText, CSpinner } from "@coreui/react";
import currency from "currency.js";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";

const BeginningBalanceForm = ({ data }) => {
    const [state, setState] = useState({
        isDisabled: true,
        isSubmit: false,
        loading: false,
        nominal: 0,
    });
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            nominal: 0,
            accountId: data[0],
            type: data[4],
        },
        mode: "all",
    });

    const onSubmit = (data) => {
        if (isDirty && state.isSubmit) {
            setState((prevState) => ({
                ...prevState,
                loading: true,
            }));
            setTimeout(() => {
                if (data.type === 1) {
                    console.log(data, "kredit submitted to database");
                } else if (data.type === 0) {
                    console.log(data, "debit submitted to database");
                }

                reset(data);

                setState((prevState) => ({
                    ...prevState,
                    isDisabled: true,
                    isSubmit: false,
                    loading: false,
                }));
            }, 3000);
        }
    };

    // const handleBlur = (e) => {
    //     e.target.value = currency(e.target.value).format();
    // };

    // const handleFocus = (e) => {
    //     e.target.value = currency(e.target.value).format();
    // };
    return (
        <>
            <div className="d-flex">
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CInputGroup className="mb-3">
                        {/* <Controller
                            name="nominal"
                            control={control}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <CFormInput
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    disabled={state.isDisabled}
                                />
                            )}
                        /> */}

                        <Controller
                            name="nominal"
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
                                            nominal: value,
                                        }));
                                    }}
                                    thousandSeparator={true}
                                    prefix={"Rp "}
                                    disabled={state.isDisabled}
                                />
                            )}
                        />

                        {state.isDisabled ? (
                            <></>
                        ) : (
                            <CButton
                                type="submit"
                                color="success"
                                onClick={() => {
                                    setState((prevState) => ({
                                        ...prevState,
                                        isSubmit: !state.isSubmit,
                                    }));
                                }}
                                disabled={state.isSubmit && state.loading}
                            >
                                <CIcon hidden={state.loading} icon={cilCheck} />
                                <CSpinner
                                    hidden={!state.loading}
                                    component="span"
                                    size="sm"
                                    aria-hidden="true"
                                />
                            </CButton>
                        )}
                        {state.isDisabled ? (
                            <CButton
                                type="button"
                                color="secondary"
                                onClick={() => {
                                    if (state.nominal === 0) {
                                        reset({ nominal: "", accountId: data[0], type: data[4] });
                                    }
                                    setState((prevState) => ({
                                        ...prevState,
                                        isDisabled: !state.isDisabled,
                                    }));
                                }}
                            >
                                <CIcon icon={cilPen} />
                            </CButton>
                        ) : (
                            <></>
                        )}
                    </CInputGroup>
                    <Controller
                        name="accountId"
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <CFormInput
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                disabled
                                hidden
                            />
                        )}
                    />
                    <Controller
                        name="type"
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <CFormInput
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                disabled
                                hidden
                            />
                        )}
                    />
                </CForm>
            </div>
        </>
    );
};

export default BeginningBalanceForm;
