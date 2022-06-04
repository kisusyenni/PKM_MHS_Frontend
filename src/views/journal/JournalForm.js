import { cilSearch, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CInputGroup,
    CRow,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AccountModal from "./AccountModal";

const JournalForm = () => {
    const selectAccount = (data) => {
        setState((prevState) => ({
            ...prevState,
            selectedAccount: data,
        }));
    };

    const handleClose = () => {
        setState((prevState) => ({
            ...prevState,
            openModal: false,
        }));
    };

    const searchAccount = () => {
        setState((prevState) => ({
            ...prevState,
            openModal: true,
        }));
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            transNo: "GS0001",
            date: new Date().toJSON().slice(0, 10),
            description: "",
            account: [{ accountCode: "", accountName: "", nominal: 0 }],
        },
        mode: "all",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "account",
    });

    const [state, setState] = useState({
        openModal: false,
        selectedAccount: null,
        total: 0,
    });

    const accountFields = watch("account");

    // const totalNominal = fields.reduce((field, index) => {
    //     let total = 0;
    //     console.log(total + accountFields[index].nominal);
    //     return total + accountFields[index].nominal;
    // });
    const nominals = fields.map((field, index) => {
        return accountFields[index].nominal;
    });

    const total = 0;

    useEffect(() => {
        console.log(state.selectedAccount);
    }, [state.selectedAccount]);

    useEffect(() => {
        console.log(nominals);
    }, [nominals]);

    return (
        <>
            <CCard>
                <CCardBody>
                    <h1 className="h4">Input Jurnal</h1>
                    <CForm>
                        <CRow>
                            <CCol md={4} className="mb-3">
                                <CFormLabel>No Jurnal</CFormLabel>
                                <Controller
                                    name="transNo"
                                    control={control}
                                    rules={{
                                        required: "Nomor transaksi tidak boleh kosong",
                                    }}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormInput
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            invalid={errors.hasOwnProperty("transNo")}
                                        />
                                    )}
                                />
                                <span className="invalid-feedback">{errors.transNo?.message}</span>
                            </CCol>
                            <CCol md={4} className="mb-3">
                                <CFormLabel>Tanggal</CFormLabel>
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CFormInput
                                            type="date"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                            invalid={errors.hasOwnProperty("date")}
                                        />
                                    )}
                                />
                            </CCol>
                            <CCol md={12} className="mb-3">
                                <CFormLabel>Deskripsi</CFormLabel>
                                <Controller
                                    name="description"
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
                        </CRow>
                        <hr />
                        <CTable borderless>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Kode Akun</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nama Akun</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Posisi</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                        </CTable>
                        {fields.map((item, index) => {
                            return (
                                <CRow key={item.id} className="align-items-start">
                                    <CCol md={3} className="mb-3">
                                        <CInputGroup>
                                            <Controller
                                                name={`account.${index}.accountCode`}
                                                control={control}
                                                render={({
                                                    field: { onChange, onBlur, value, ref },
                                                }) => (
                                                    <CFormInput
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        ref={ref}
                                                    />
                                                )}
                                            />
                                            <CButton onClick={searchAccount}>
                                                <CIcon icon={cilSearch} />
                                            </CButton>
                                        </CInputGroup>
                                    </CCol>
                                    <CCol md={3} className="mb-3">
                                        <Controller
                                            name={`account.${index}.accountName`}
                                            control={control}
                                            render={({
                                                field: { onChange, onBlur, value, ref },
                                            }) => (
                                                <CFormInput
                                                    disabled
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        />
                                    </CCol>
                                    <CCol md={2} className="mb-3">
                                        <CFormSelect
                                            disabled
                                            aria-label="Posisi"
                                            options={[
                                                { label: "Debit", value: "0" },
                                                { label: "Kredit", value: "1" },
                                            ]}
                                        />
                                    </CCol>
                                    <CCol md={3} className="mb-3">
                                        <Controller
                                            name={`account.${index}.nominal`}
                                            control={control}
                                            render={({
                                                field: { onChange, onBlur, value, ref },
                                            }) => (
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
                                append({ accountCode: "", accountName: "", nominal: 0 });
                            }}
                        >
                            Tambah
                        </CButton>
                        <hr />
                        <CRow className="justify-content-end fw-bold">
                            <CCol xs={3}>Total</CCol>
                            <CCol xs={4}>
                                {nominals.reduce(
                                    (result, item) => parseInt(result) + parseInt(item),
                                )}
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
                <CCardFooter></CCardFooter>
            </CCard>

            {state.openModal ? (
                <AccountModal
                    openModal={state.openModal}
                    handleClose={handleClose}
                    selectAccount={selectAccount}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default JournalForm;
