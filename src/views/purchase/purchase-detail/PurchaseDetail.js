/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import PurchaseContent from "./PurchaseContent";
import PurchasePayment from "./PurchasePayment";
import { get } from "src/network/api/network";

const PurchaseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: null,
        isReload: null,
    });

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
            <CButton
                onClick={() => {
                    navigate(-1);
                }}
            >
                Back
            </CButton>

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
