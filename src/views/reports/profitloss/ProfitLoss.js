/* eslint-disable react-hooks/exhaustive-deps */
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import { cilSearch } from "@coreui/icons";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import DownloadExcel from "./DownloadExcel";
import DownloadPdf from "./DownloadPdf";

const ProfitLoss = () => {
    const date = new Date();

    const [state, setState] = useState({
        data: null,
        isReload: null,
        filename: "Laporan Laba Rugi",
    });

    const { control, handleSubmit } = useForm({
        defaultValues: {
            startDate: date.toJSON().slice(0, 10),
            endDate: date.toJSON().slice(0, 10),
        },
        mode: "all",
    });

    const onSubmit = () => {};

    const getBalanceSheet = () => {
        setState((prevState) => ({
            ...prevState,
            data: {
                startDate: "20/05/2022",
                endDate: "20/06/2022",
                previousBalance: 1000000,
                profitLoss: 500000,
                income: {
                    total: 500000,
                    list: [
                        {
                            name: "Penjualan Inventori",
                            nominal: 500000,
                        },
                    ],
                },
                expense: {
                    total: -1000000,
                    list: [
                        {
                            name: "Pembelian Inventori",
                            nominal: -500000,
                        },
                        {
                            name: "Pengeluaran lainnya",
                            nominal: -500000,
                        },
                    ],
                },
            },
            filename: "Laporan Laba Rugi Periode 20/05/2022 - 20/06/2022",
        }));
    };

    useEffect(() => {
        getBalanceSheet();
    }, [state.isReload]);

    return (
        <>
            <CCard className="my-3">
                <CCardHeader>
                    <CRow className="align-items-center justify-content-around">
                        <CCol>
                            <h1>Laporan Laba Rugi</h1>
                        </CCol>
                        <CCol className="text-end">
                            <DownloadExcel data={state.data} filename={state.filename} />
                            <DownloadPdf data={state.data} filename={state.filename} />
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow className="mb-3">
                        <CCol md={6}>
                            <CForm onSubmit={handleSubmit(onSubmit)}>
                                <CInputGroup>
                                    <CInputGroupText>Periode</CInputGroupText>
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormInput
                                                type="date"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="endDate"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormInput
                                                type="date"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                            />
                                        )}
                                    />
                                    <CButton type="submit">
                                        <CIcon icon={cilSearch} />
                                    </CButton>
                                </CInputGroup>
                            </CForm>
                        </CCol>
                    </CRow>
                    <CTable bordered id="balance-sheet">
                        <CTableBody>
                            <CTableRow>
                                <CTableHeaderCell colSpan={2} className="h3 text-center">
                                    {state.filename}
                                </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                                <CTableHeaderCell>Saldo Periode Sebelum</CTableHeaderCell>
                                <CTableDataCell>
                                    <NumberFormat
                                        value={state?.data?.previousBalance}
                                        displayType="text"
                                        allowLeadingZeros={false}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                    />
                                </CTableDataCell>
                            </CTableRow>

                            <CTableRow color="secondary">
                                <CTableHeaderCell colSpan={2}>Pendapatan</CTableHeaderCell>
                            </CTableRow>
                            {state.data?.income?.list.map((value, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{value.name}</CTableDataCell>
                                        <CTableDataCell>
                                            <NumberFormat
                                                value={value.nominal}
                                                displayType="text"
                                                allowLeadingZeros={false}
                                                thousandSeparator={true}
                                                prefix={"Rp"}
                                            />
                                        </CTableDataCell>
                                    </CTableRow>
                                );
                            })}
                            <CTableRow>
                                <CTableHeaderCell>Total</CTableHeaderCell>
                                <CTableDataCell className="text-success">
                                    <NumberFormat
                                        value={state.data?.income?.total}
                                        displayType="text"
                                        allowLeadingZeros={false}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                    />
                                </CTableDataCell>
                            </CTableRow>

                            <CTableRow color="secondary">
                                <CTableHeaderCell colSpan={2}>Pengeluaran</CTableHeaderCell>
                            </CTableRow>

                            {state.data?.expense?.list.map((value, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{value.name}</CTableDataCell>
                                        <CTableDataCell>
                                            <NumberFormat
                                                value={value.nominal}
                                                displayType="text"
                                                allowLeadingZeros={false}
                                                thousandSeparator={true}
                                                prefix={"Rp"}
                                            />
                                        </CTableDataCell>
                                    </CTableRow>
                                );
                            })}

                            <CTableRow>
                                <CTableHeaderCell>Total</CTableHeaderCell>
                                <CTableDataCell className="text-danger">
                                    <NumberFormat
                                        value={state.data?.expense?.total}
                                        displayType="text"
                                        allowLeadingZeros={false}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                    />
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow color="dark">
                                <CTableHeaderCell>Total Laba Rugi</CTableHeaderCell>
                                <CTableHeaderCell className="text-success">
                                    <NumberFormat
                                        value={state.data?.profitLoss}
                                        displayType="text"
                                        allowLeadingZeros={false}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                    />
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </>
    );
};

export default ProfitLoss;