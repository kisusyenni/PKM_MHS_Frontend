import React from "react";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import PurchaseForm from "./PurchaseForm";

const AddPurchase = () => {
    const navigate = useNavigate();
    return (
        <>
            <CButton
                className="mb-3"
                onClick={() => {
                    navigate(-1);
                }}
            >
                Back
            </CButton>
            <PurchaseForm />
        </>
    );
};

export default AddPurchase;
