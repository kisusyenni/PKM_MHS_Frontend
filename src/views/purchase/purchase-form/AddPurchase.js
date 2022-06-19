import React from "react";
import { CButton, CContainer } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import PurchaseForm from "./PurchaseForm";

const AddPurchase = () => {
    const navigate = useNavigate();
    return (
        <>
            <CContainer>
                <CButton
                    className="mb-3"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Back
                </CButton>
                <PurchaseForm />
            </CContainer>
        </>
    );
};

export default AddPurchase;
