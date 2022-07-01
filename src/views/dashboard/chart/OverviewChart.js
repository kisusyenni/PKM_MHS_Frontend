/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import { MONTHS } from "src/constants/enums";

const OverviewChart = ({ data }) => {
    const [state, setState] = useState({
        sales: [],
        purchase: [],
        expense: [],
    });

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            sales: modifyChartData(data?.sales?.list),
            purchase: modifyChartData(data?.purchase?.list),
            expense: modifyChartData(data?.expense?.list),
        }));
    }, [data]);

    const modifyChartData = (data) => {
        const chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (data) {
            data.forEach((item) => {
                chartData[item.transMonth] = parseInt(item.totalPayment);
            });
        }

        return chartData;
    };
    return (
        <>
            {data && (
                <CCard className="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm={12}>
                                <h5 id="traffic" className="card-title mb-0">
                                    Penjualan, Pembelian, Pengeluaran {data?.yearPeriod}
                                </h5>
                                <div className="small text-medium-emphasis">{data.period}</div>
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
                                        data: state.sales,
                                        fill: true,
                                    },
                                    {
                                        label: "Purchase",
                                        backgroundColor: "transparent",
                                        borderColor: getStyle("--cui-success"),
                                        pointHoverBackgroundColor: getStyle("--cui-success"),
                                        borderWidth: 2,
                                        data: state.purchase,
                                    },
                                    {
                                        label: "Expense",
                                        backgroundColor: "transparent",
                                        borderColor: getStyle("--cui-danger"),
                                        pointHoverBackgroundColor: getStyle("--cui-danger"),
                                        borderWidth: 1,
                                        borderDash: [8, 5],
                                        data: state.expense,
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
