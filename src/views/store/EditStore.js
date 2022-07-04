import { CButton, CCol, CRow } from "@coreui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import SetupStoreForm from "./SetupStoreForm";

const EditStore = () => {
    const navigate = useNavigate();
    return (
        <>
            <CRow className="justify-content-center">
                <CCol md={12}>
                    <CButton
                        className="mb-3"
                        onClick={() => {
                            navigate(-1);
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
