/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CButton, CCol, CRow } from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import PurchaseContent from "./PurchaseContent";
import PurchasePayment from "./PurchasePayment";
import { get } from "src/network/api/network";
import CIcon from "@coreui/icons-react";
import { cilPrint } from "@coreui/icons";

const PurchaseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: null,
        isReload: null,
        title: "Detail Pembelian - MHS SOFT",
    });

    useEffect(() => {
        document.title = state.title || "";
    }, [state.title]);

    const getPurchaseDetail = async () => {
        const response = await get(`/purchase/${id}`);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
    };

    useEffect(() => {
        getPurchaseDetail();
    }, [state.isReload]);

    return (
        <>
            <CRow className="justify-content-between">
                <CCol>
                    <CButton
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Kembali
                    </CButton>
                </CCol>

                <CCol className="text-end">
                    <CButton
                        className="me-2"
                        onClick={() => {
                            window.open(
                                `/print/pembelian/${state.data?.purchaseId}`,
                                "_blank",
                                "noopener,noreferrer",
                            );
                        }}
                    >
                        <CIcon className="me-2" icon={cilPrint} />
                        Print
                    </CButton>
                </CCol>
            </CRow>

            {state.data && (
                <>
                    <PurchaseContent data={state.data} />
                    <PurchasePayment
                        id={id}
                        total={state.data.dueNominal}
                        status={state.data.status}
                    />
                </>
            )}
        </>
    );
};

export default PurchaseDetail;
