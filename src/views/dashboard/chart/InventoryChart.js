/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import React from "react";

const InventoryChart = ({ data }) => {
    const bgColors = [
        "#905a51",
        "#b95c4d",
        "#e76941",
        "#f9752a",
        "#fd8f14",
        "#ffb315",
        "#fdc61f",
        "#fcdc35",
        "#e1e068",
        "#c6c382",
    ];

    // const datasets = data.map((item, index) => {
    //     return {
    //         label: item.inventoryData?.name,
    //         backgroundColor: colors[index],
    //         data: [item.quantityBuy],
    //     };
    // });
    return (
        <>
            {data && (
                <CCard className="mb-4">
                    <CCardHeader>Inventaris Terjual Terbanyak</CCardHeader>
                    <CCardBody>
                        {/* <CChart
                            type="bar"
                            style={{ height: "325px" }}
                            data={{
                                labels: [""],
                                datasets: datasets,
                            }}
                            options={{ maintainAspectRatio: false }}
                        /> */}
                        <CChart
                            type="doughnut"
                            style={{ height: "325px" }}
                            data={{
                                labels: data.map((item) => item.inventoryData?.name),
                                datasets: [
                                    {
                                        backgroundColor: bgColors,
                                        data: data.map((item) => item.quantityBuy),
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
