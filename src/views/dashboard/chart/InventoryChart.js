/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import React from "react";

const InventoryChart = ({ data }) => {
    return (
        <>
            {data && (
                <CCard className="mb-4">
                    <CCardHeader>Inventaris Terjual Terbanyak</CCardHeader>
                    <CCardBody>
                        <CChart
                            type="doughnut"
                            style={{ height: "325px" }}
                            data={{
                                labels: data.map((item, index) => item.name),
                                datasets: [
                                    {
                                        backgroundColor: [
                                            "#41B883",
                                            "#E46651",
                                            "#00D8FF",
                                            "#DD1B16",
                                        ],
                                        data: data.map((item, index) => item.total),
                                    },
                                ],
                            }}
                            options={{ maintainAspectRatio: false }}
                        />
                    </CCardBody>
                </CCard>
            )}
        </>
    );
};

export default InventoryChart;
