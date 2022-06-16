import { cilArrowCircleLeft } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import InventoryForm from "./InventoryForm";

const EditInventory = () => {
    const navigate = useNavigate();
    return (
        <>
            <CContainer>
                <CRow>
                    <CCol md={9} lg={7} xl={6}>
                        <CButton color="link" className="mb-2" onClick={() => navigate(-1)}>
                            <CIcon className="me-2" icon={cilArrowCircleLeft} />
                            Kembali
                        </CButton>
                        <InventoryForm title={"Ubah Inventaris"} editMode={true} />
                    </CCol>
                </CRow>
            </CContainer>
        </>
    );
};

export default EditInventory;
