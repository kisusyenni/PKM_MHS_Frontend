/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import PaymentForm from "src/components/payment/PaymentForm";
import PaymentList from "src/components/payment/PaymentList";

const PurchasePayment = ({ id, total, status }) => {
    return (
        <>
            <CCard className="my-3">
                <CCardHeader>
                    <h2 className="h6 fw-bold my-2">Terima Pembayaran</h2>
                </CCardHeader>
                <CCardBody>
                    {status !== 3 && (
                        <PaymentForm type={"purchase"} purchaseId={id} total={total} />
                    )}
                </CCardBody>
            </CCard>
            <div className="my-3">
                {status !== 1 && (
                    <PaymentList type={"purchase"} purchaseId={id} total={total} status={status} />
                )}
            </div>
        </>
    );
};

export default PurchasePayment;
