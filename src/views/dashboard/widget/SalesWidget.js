/* eslint-disable react/prop-types */
import React from "react";
import { CWidgetStatsA } from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartLine } from "@coreui/react-chartjs";
import { cilArrowBottom } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { MONTHS } from "src/constants/enums";
import NumberFormat from "react-number-format";

const SalesWidget = ({ data }) => {
    return (
        <>
            {data && (
                <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value={
                        <>
                            <NumberFormat
                                value={data.total}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp"}
                            />{" "}
                            <span className="fs-6 fw-normal">
                                (-12.4% <CIcon icon={cilArrowBottom} />)
                            </span>
                        </>
                    }
                    title="Penjualan"
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
                                        pointBackgroundColor: getStyle("--cui-success"),
                                        data: data.list,
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
                                        display: true,
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
            )}
        </>
    );
};

export default SalesWidget;
