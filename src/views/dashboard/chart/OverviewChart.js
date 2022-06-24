import React from "react";
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload } from "@coreui/icons";
import { MONTHS } from "src/constants/enums";

const OverviewChart = () => {
    const data = {
        period: "Januari - Desember 2022",
        sales: {
            total: 720584,
            list: [
                650000, 590000, 840000, 810000, 510000, 550000, 420000, 1050000, 2405000, 330000,
                480000, 507000,
            ],
        },
        purchase: {
            total: 720584,
            list: [
                2500000, 3010000, 4840000, 8510000, 7250000, 6520000, 6420000, 7150000, 8448000,
                5370000, 6524000, 5427000,
            ],
        },
        expense: {
            total: 720584,
            list: [
                250000, 190000, 240550, 118000, 410000, 355000, 142000, 357000, 245000, 150000,
                304500, 205000,
            ],
        },
    };

    return (
        <>
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
        </>
    );
};

export default OverviewChart;
