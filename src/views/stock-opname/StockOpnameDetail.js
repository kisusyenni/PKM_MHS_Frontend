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
import NumberFormat from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";

const StockOpnameDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: null,
        isReload: null,
    });

    const getStockOpnameDetail = () => {
        setState((prevState) => ({
            ...prevState,
            data: {
                stockOpnameId: 1,
                storeId: 1,
                userId: 1,
                date: "22/06/2022",
                description: "Audit bulan Juni 2022",
                user: {
                    firstName: "Andi",
                    lastName: "Budi",
                },
                detail: [
                    {
                        stockOpnameDetailID: 1,
                        inventoryId: 1,
                        quantityStart: 10,
                        quantityEnd: 7,
                        difference: 3,
                        description: "Expired",
                        inventory: {
                            name: "Barang 01",
                        },
                    },
                    {
                        stockOpnameDetailID: 2,
                        inventoryId: 2,
                        quantityStart: 15,
                        quantityEnd: 8,
                        difference: 7,
                        description: "Hilang",
                        inventory: {
                            name: "Barang 02",
                        },
                    },
                ],
            },
        }));
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
                Back
            </CButton>

            <CCard className="my-3">
                <CCardHeader>
                    <h2 className="h3 fw-bold my-2">Stock Opname Detail</h2>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol md={3}>
                            <h6>ID</h6>
                            <p>{state?.data?.stockOpnameId}</p>
                        </CCol>
                        <CCol md={3}>
                            <h6>Dibuat oleh</h6>
                            <p>
                                {`${state?.data?.user?.firstName} ${state?.data?.user?.lastName} `}
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
                            {state?.data?.detail.map((detail, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{detail.inventory.name}</CTableDataCell>
                                    <CTableDataCell>{detail.quantityStart}</CTableDataCell>
                                    <CTableDataCell>{detail.quantityEnd}</CTableDataCell>
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
