/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { CButton, CWidgetStatsA } from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartLine } from "@coreui/react-chartjs";
import { MONTHS } from "src/constants/enums";
import NumberFormat from "react-number-format";

const ExpenseWidget = ({ data }) => {
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
        const widgetData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        data?.list.forEach((item) => {
            widgetData[item.transMonth] = parseInt(item.totalPayment);
        });
        setDataset(widgetData);
    }, [data]);

    return (
        <>
            {data?.total > 0 ? (
                <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value={
                        <>
                            <NumberFormat
                                value={data.total}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp"}
                            />
                        </>
                    }
                    title="Pengeluaran"
                    chart={
                        <CChartLine
                            className="m-3"
                            style={{ height: "70px" }}
                            data={{
                                labels: MONTHS,
                                datasets: [
                                    {
                                        label: "Sales Chart",
                                        backgroundColor: "transparent",
                                        borderColor: "rgba(255,255,255,0.55)",
                                        pointBackgroundColor: getStyle("--cui-primary"),
                                        data: dataset,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            ) : (
                <>
                    <CButton href="pengeluaran/tambah">Tambah Pengeluaran</CButton>
                </>
            )}
        </>
    );
};

export default ExpenseWidget;
