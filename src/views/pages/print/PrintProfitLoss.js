import {
    CContainer,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useSearchParams } from "react-router-dom";
import { localeDate } from "src/helper/generate_date";
import { post } from "src/network/api/network";

const PrintProfitLoss = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const [state, setState] = useState({
        data: null,
        isReload: null,
        filename: "Laporan Laba Rugi",
        title: "Print Laba Rugi - MHS SOFT",
    });

    useEffect(() => {
        document.title = state.title || "";
    }, [state.title]);

    const getProfitLoss = async (data) => {
        const response = await post("/report/profit-loss", data);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
                filename: `Laporan Laba Rugi ${localeDate(response.data?.startDate)} - ${localeDate(
                    response.data?.endDate,
                )}`,
            }));
        } else {
            // show error
            setState((prevState) => ({
                ...prevState,
                errMsg: response.data,
            }));
        }
    };

    useEffect(() => {
        getProfitLoss({
            startDate: startDate,
            endDate: endDate,
        });
    }, [endDate, startDate, state.isReload]);

    useEffect(() => {
        if (state.data) {
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
                                            value={value.total}
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
                            <CTableHeaderCell
                                className={
                                    state.data?.profitLoss > 0 ? "text-success" : "text-danger"
                                }
                            >
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
