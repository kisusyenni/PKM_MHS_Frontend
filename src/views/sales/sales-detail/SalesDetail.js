/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import SalesContent from "./SalesContent";
import SalesPayment from "./SalesPayment";
import { get } from "src/network/api/network";

const SalesDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: null,
        isReload: null,
    });

    const getSalesDetail = async () => {
        const response = await get(`/sales/${id}`);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
    };

    useEffect(() => {
        getSalesDetail();
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
                    <SalesContent data={state.data} />
                    <SalesPayment
                        id={id}
                        total={state.data.dueNominal}
                        status={state.data.status}
                    />
                </>
            )}
        </>
    );
};

export default SalesDetail;
