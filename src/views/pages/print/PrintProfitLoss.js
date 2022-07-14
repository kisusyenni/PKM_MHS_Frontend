import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

const PrintProfitLoss = () => {
    const [state, setState] = useState({
        data: null,
        isReload: null,
        filename: "Laporan Laba Rugi",
    });

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

    useEffect(() => {
        if (state.data) {
            console.log("print");
            window.print();
        }
    }, [state.data]);

    return (
        <>
            <CContainer>
                <CTable className="mt-3" bordered small id="profit-loss" style={{ fontSize: 12 }}>
                    <CTableBody>
                        <CTableRow>
                            <CTableHeaderCell colSpan={2} className="h6 text-center">
                                Laporan Laba Rugi <br />
                                <small>
                                    Periode {state.data?.startDate} - {state.data?.endDate}
                                </small>
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
                        <CTableRow color="secondary">
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
            </CContainer>
        </>
    );
};

export default PrintProfitLoss;
