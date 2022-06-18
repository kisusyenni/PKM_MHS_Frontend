import { CButton, CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PurchaseContent from "./PurchaseContent";
import PurchasePayment from "./PurchasePayment";

const PurchaseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: null,
        isReload: null,
    });

    const getPurchaseDetail = () => {
        console.log("get detail data");
        setState((prevState) => ({
            ...prevState,
            data: {
                purchaseId: "1",
                supplierId: "1",
                storeId: "xxx",
                refNumber: "PU0001",
                status: 1,
                transDate: "16/6/2022",
                dueDate: "23/6/2022",
                paymentMethod: "1",
                paidNominal: 0,
                totalPayment: 200000,
                isDelete: 0,
                supplier: {
                    supplierId: "1",
                    storeId: "xxx",
                    name: "Toko ABC",
                    address: "Jalan Mangga No 24",
                    telephone: "0812345678",
                    email: "abc@gmail.com",
                },
                method: {
                    methodId: "1",
                    name: "cash",
                },
                detail: [
                    {
                        purchaseDetailId: "1",
                        purchaseId: "1",
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
                        purchaseDetailId: "2",
                        purchaseId: "1",
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
        getPurchaseDetail();
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
                    <PurchaseContent data={state.data} />
                    <PurchasePayment
                        id={id}
                        total={state.data.totalPayment - state.data.paidNominal}
                        status={state.data.status}
                    />
                </>
            )}
        </>
    );
};

export default PurchaseDetail;
