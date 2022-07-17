import { CButton } from "@coreui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import StockOpnameForm from "./StockOpnameForm";

const AddStockOpname = () => {
    const navigate = useNavigate();
    return (
        <>
            <CButton
                className="mb-3"
                onClick={() => {
                    navigate(-1);
                }}
            >
                Kembali
            </CButton>
            <StockOpnameForm />
        </>
    );
};

export default AddStockOpname;
