import { CCol, CContainer, CRow } from "@coreui/react";
import React from "react";
import SetupStoreForm from "./SetupStoreForm";

const SetupStore = () => {
    return (
        <>
            <main className="bg-light min-vh-100 d-flex flex-row align-items-center bg-custom">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={9}>
                            <div className="text-center text-white">
                                <h1>Pengaturan UMKM</h1>
                                <p>Silahkan isi identitas UMKM Anda terlebih dahulu</p>
                            </div>
                            <SetupStoreForm setup={true} />
                        </CCol>
                    </CRow>
                </CContainer>
            </main>
        </>
    );
};

export default SetupStore;
