/* eslint-disable react/prop-types */
import { CCardBody, CCardHeader, CImage } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import React from "react";
import emptyGraphic from "src/assets/images/empty.svg";

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

    return (
        <>
            <CCardHeader>Inventaris Terjual Terbanyak</CCardHeader>
            {data?.length > 0 ? (
                <>
                    <CCardBody>
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
                </>
            ) : (
                <>
                    <CCardBody className="text-center">
                        <div className="mb-3">
                            <CImage src={emptyGraphic} height={100} />
                        </div>
                        <p>Inventaris belum terjual</p>
                    </CCardBody>
                </>
            )}
        </>
    );
};

export default InventoryChart;
