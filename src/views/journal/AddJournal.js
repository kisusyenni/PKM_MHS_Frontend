import { CCol, CContainer, CRow } from "@coreui/react";
import React from "react";
import JournalForm from "./JournalForm";

const AddJournal = () => {
    return (
        <>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol>
                        <JournalForm />
                    </CCol>
                </CRow>
            </CContainer>
        </>
    );
};

export default AddJournal;
