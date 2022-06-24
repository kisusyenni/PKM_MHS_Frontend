/* eslint-disable react/prop-types */
import React from "react";
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload } from "@coreui/icons";
import { MONTHS } from "src/constants/enums";

const OverviewChart = ({ data }) => {
    return (
        <>
            {data && (
                <CCard className="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm={5}>
                                <h5 id="traffic" className="card-title mb-0">
                                    Penjualan, Pembelian, Pengeluaran
                                </h5>
                                <div className="small text-medium-emphasis">{data.period}</div>
                            </CCol>
                            <CCol sm={7} className="d-none d-md-block">
                                <CButton color="primary" className="float-end">
                                    <CIcon icon={cilCloudDownload} />
                                </CButton>
                                <CButtonGroup className="float-end me-3">
                                    {["Day", "Month", "Year"].map((value) => (
                                        <CButton
                                            color="outline-secondary"
                                            key={value}
                                            className="mx-0"
                                            active={value === "Month"}
                                        >
                                            {value}
                                        </CButton>
                                    ))}
                                </CButtonGroup>
                            </CCol>
                        </CRow>
                        <CChartLine
                            style={{ height: "300px", marginTop: "40px" }}
                            data={{
                                labels: MONTHS,
                                datasets: [
                                    {
                                        label: "Sales",
                                        backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                                        borderColor: getStyle("--cui-info"),
                                        pointHoverBackgroundColor: getStyle("--cui-info"),
                                        borderWidth: 2,
                                        data: data.sales.list,
                                        fill: true,
                                    },
                                    {
                                        label: "Purchase",
                                        backgroundColor: "transparent",
                                        borderColor: getStyle("--cui-success"),
                                        pointHoverBackgroundColor: getStyle("--cui-success"),
                                        borderWidth: 2,
                                        data: data.purchase.list,
                                    },
                                    {
                                        label: "Expense",
                                        backgroundColor: "transparent",
                                        borderColor: getStyle("--cui-danger"),
                                        pointHoverBackgroundColor: getStyle("--cui-danger"),
                                        borderWidth: 1,
                                        borderDash: [8, 5],
                                        data: data.expense.list,
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            drawOnChartArea: false,
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            beginAtZero: true,
                                            maxTicksLimit: 5,
                                            stepSize: Math.ceil(250 / 5),
                                            max: 250,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 0,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                        hoverBorderWidth: 3,
                                    },
                                },
                            }}
                        />
                    </CCardBody>
                </CCard>
            )}
        </>
    );
};

export default OverviewChart;
