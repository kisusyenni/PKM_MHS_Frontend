import { CButton, CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetupStoreForm from "./SetupStoreForm";

const EditStore = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("Edit Toko - MHS SOFT");

    useEffect(() => {
        document.title = title || "";
    }, [title]);

    return (
        <>
            <CRow className="justify-content-center">
                <CCol md={12}>
                    <CButton
                        className="mb-3"
                        onClick={() => {
                            navigate("/dashboard");
                        }}
                    >
                        Kembali
                    </CButton>
                    <SetupStoreForm />
                </CCol>
            </CRow>
        </>
    );
};

export default EditStore;
