import React from "react";
import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import InventoryForm from "./InventoryForm";
import CIcon from "@coreui/icons-react";
import { cilArrowCircleLeft } from "@coreui/icons";
import { useNavigate } from "react-router-dom";

const AddInventory = () => {
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
                        <InventoryForm title="Tambah Inventaris" editMode={false} />
                    </CCol>
                </CRow>
            </CContainer>
        </>
    );
};

export default AddInventory;
