import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import SalesContent from "./SalesContent";
import SalesPayment from "./SalesPayment";

const SalesDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: null,
        isReload: null,
    });

    const getSalesDetail = () => {
        setState((prevState) => ({
            ...prevState,
            data: {
                salesId: "1",
                storeId: "xxx",
                refNumber: "PU0001",
                status: 2,
                transDate: "16/6/2022",
                dueDate: "23/6/2022",
                dueNominal: 100000,
                totalPayment: 255000,
                isDelete: 0,
                detail: [
                    {
                        salesDetailId: "1",
                        salesId: "1",
                        inventoryId: "1",
                        quantityBuy: 5,
                        pricePerUnit: 50000,
                        discount: 5000,
                        inventory: {
                            inventoryId: "1",
                            storeId: "1",
                            name: "Barang 01",
                            quantity: 300,
                            sellingPrice: 45000,
                            isActive: 1,
                        },
                    },
                    {
                        salesDetailId: "2",
                        salesId: "1",
                        inventoryId: "2",
                        quantityBuy: 3,
                        pricePerUnit: 10000,
                        discount: 0,
                        inventory: {
                            inventoryId: "2",
                            storeId: "1",
                            name: "Barang 02",
                            quantity: 100,
                            sellingPrice: 10000,
                            isActive: 1,
                        },
                    },
                ],
            },
        }));
    };

    useEffect(() => {
        getSalesDetail();
    }, [state.isReload]);

    return (
        <>
            <CButton
                onClick={() => {
                    navigate(-1);
                }}
            >
                Back
            </CButton>

            {state.data && (
                <>
                    <SalesContent data={state.data} />
                    <SalesPayment
                        id={id}
                        total={state.data.dueNominal}
                        status={state.data.status}
                    />
                </>
            )}
        </>
    );
};

export default SalesDetail;
