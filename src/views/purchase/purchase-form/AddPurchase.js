import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import PurchaseForm from "./PurchaseForm";

const AddPurchase = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("Tambah Pembelian - MHS SOFT");

    useEffect(() => {
        document.title = title || "";
    }, [title]);
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
            <PurchaseForm />
        </>
    );
};

export default AddPurchase;
