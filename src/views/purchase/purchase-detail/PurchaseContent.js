/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";

const PurchaseContent = ({ data }) => {
    return (
        <>
            {data && (
                <CCard className="my-5">
                    <CCardHeader>
                        <h2 className="fw-bold my-2">Transaksi Pembelian {data?.refNumber}</h2>
                    </CCardHeader>
                    <CCardBody></CCardBody>
                </CCard>
            )}
        </>
    );
};

export default PurchaseContent;
