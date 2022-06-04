import { CCol, CContainer, CRow } from "@coreui/react";
import React from "react";
import SetupStoreForm from "./SetupStoreForm";

const EditStore = () => {
    return (
        <>
            <main className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={9} lg={7} xl={6}>
                            <SetupStoreForm />
                        </CCol>
                    </CRow>
                </CContainer>
            </main>
        </>
    );
};

export default EditStore;
