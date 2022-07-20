import React, { useEffect, useState } from "react";
import { CButton, CContainer } from "@coreui/react";
import SalesForm from "./SalesForm";
import { useNavigate } from "react-router-dom";

const AddSales = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("Tambah Penjualan - MHS SOFT");

    useEffect(() => {
        document.title = title || "";
    }, [title]);
    return (
        <>
            <CContainer>
                <CButton
                    className="mb-3"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Kembali
                </CButton>
                <SalesForm />
            </CContainer>
        </>
    );
};

export default AddSales;
