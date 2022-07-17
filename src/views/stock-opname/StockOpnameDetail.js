/* eslint-disable react-hooks/exhaustive-deps */
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "src/network/api/network";

const StockOpnameDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: null,
        isReload: null,
    });

    const getStockOpnameDetail = async () => {
        const response = await get(`/stock-opname/${id}`);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
    };

    useEffect(() => {
        getStockOpnameDetail();
    }, [state.isReload]);

    return (
        <>
            <CButton
                onClick={() => {
                    navigate(-1);
                }}
            >
                Kembali
            </CButton>

            <CCard className="my-3">
                <CCardHeader>
                    <h2 className="h3 fw-bold my-2">Stock Opname Detail</h2>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol md={3}>
                            <h6>ID</h6>
                            {/* <p>{state?.data?.stockOpnameId}</p> */}
                            <p>SOP/1657204586000</p>
                        </CCol>
                        <CCol md={3}>
                            <h6>Dibuat oleh</h6>
                            <p>
                                {`${state?.data?.user?.firstName} ${state?.data?.user?.lastName}`}
                            </p>
                        </CCol>
                        <CCol md={3}>
                            <h6>Tanggal</h6>
                            <p>{state?.data?.date}</p>
                        </CCol>
                        <CCol>
                            <h6>Keterangan</h6>
                            <p>{state?.data?.description}</p>
                        </CCol>
                    </CRow>
                    <CTable bordered>
                        <CTableHead color="dark">
                            <CTableRow>
                                <CTableHeaderCell scope="col">Inventaris</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Persediaan Awal</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Persediaan Akhir</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Selisih</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {state?.data?.itemDetail.map((detail, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{detail.inventory?.name}</CTableDataCell>
                                    <CTableDataCell>{detail.qtyStart}</CTableDataCell>
                                    <CTableDataCell>{detail.qtyEnd}</CTableDataCell>
                                    <CTableDataCell>{detail.difference}</CTableDataCell>
                                    <CTableDataCell>{detail.description}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </>
    );
};

export default StockOpnameDetail;
