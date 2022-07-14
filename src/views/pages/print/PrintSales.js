import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "src/network/api/network";
import {
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
import NumberFormat from "react-number-format";
import PaymentStatusText from "src/helper/PaymentStatusText";

const PrintSales = () => {
    const { id } = useParams();

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

    const subtotal = state.data?.tbl_sales_details.reduce((prev, curr) => {
        const currValue = (curr.pricePerUnit - curr.discount) * curr.quantityBuy;
        console.log(currValue);
        return prev + currValue;
    }, 0);

    useEffect(() => {
        if (state.data) {
            console.log("print");
            window.print();
        }
    }, [state.data]);

    return (
        <>
            <CContainer>
                <CCard className="my-3">
                    <CCardHeader>
                        <CRow className="align-items-end">
                            <CCol>
                                <h1 className="h6 fw-bold mb-0">{state.data?.tbl_store?.name}</h1>
                                <p className="mb-0">
                                    <small>{state.data?.tbl_store?.address}</small>
                                </p>
                                <p className="mb-0">
                                    <small>{state.data?.tbl_store?.telephone}</small>
                                </p>
                                <p className="mb-0">
                                    <small>{state.data?.tbl_store?.email}</small>
                                </p>
                            </CCol>
                            <CCol>
                                <h1 className="h6 fw-bold text-end mb-0">Purchase Invoice</h1>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs={8}>
                                <CTable style={{ fontSize: 14 }} borderless small>
                                    <CTableBody>
                                        <CTableRow>
                                            <CTableDataCell>Nomor Referensi</CTableDataCell>
                                            <CTableDataCell>
                                                : {state.data?.refNumber}
                                            </CTableDataCell>
                                        </CTableRow>
                                        <CTableRow>
                                            <CTableDataCell>Status</CTableDataCell>
                                            <CTableDataCell>
                                                : <PaymentStatusText status={state.data?.status} />
                                            </CTableDataCell>
                                        </CTableRow>
                                        <CTableRow>
                                            <CTableDataCell>Tanggal Transaksi</CTableDataCell>
                                            <CTableDataCell>
                                                : {state.data?.transDate}
                                            </CTableDataCell>
                                        </CTableRow>
                                        <CTableRow>
                                            <CTableDataCell>Tanggal Jatuh Tempo</CTableDataCell>
                                            <CTableDataCell>: {state.data?.dueDate}</CTableDataCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>
                            </CCol>
                        </CRow>
                        <CTable bordered small style={{ fontSize: 12 }}>
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Inventaris</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Diskon</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {state.data?.tbl_sales_details.map((detail, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>
                                            {detail.tbl_inventory?.name}
                                        </CTableDataCell>
                                        <CTableDataCell scope="row">
                                            {detail.quantityBuy}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <NumberFormat
                                                value={detail.pricePerUnit}
                                                displayType="text"
                                                allowLeadingZeros={false}
                                                thousandSeparator={true}
                                                prefix={"Rp"}
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <NumberFormat
                                                value={detail.discount}
                                                displayType="text"
                                                allowLeadingZeros={false}
                                                thousandSeparator={true}
                                                prefix={"Rp"}
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <NumberFormat
                                                value={
                                                    (detail.pricePerUnit - detail.discount) *
                                                    detail.quantityBuy
                                                }
                                                displayType="text"
                                                allowLeadingZeros={false}
                                                thousandSeparator={true}
                                                prefix={"Rp"}
                                            />
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}

                                <CTableRow>
                                    <CTableHeaderCell className="text-end" colSpan={4}>
                                        Subtotal
                                    </CTableHeaderCell>
                                    <CTableDataCell>
                                        <NumberFormat
                                            value={subtotal}
                                            displayType="text"
                                            allowLeadingZeros={false}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell className="text-end" colSpan={4}>
                                        Diskon
                                    </CTableHeaderCell>
                                    <CTableDataCell>
                                        <NumberFormat
                                            value={subtotal - state.data?.totalPayment}
                                            displayType="text"
                                            allowLeadingZeros={false}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell className="text-end" colSpan={4}>
                                        Total
                                    </CTableHeaderCell>
                                    <CTableDataCell>
                                        <NumberFormat
                                            value={state.data?.totalPayment}
                                            displayType="text"
                                            allowLeadingZeros={false}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell className="text-end" colSpan={4}>
                                        Sisa Tagihan
                                    </CTableHeaderCell>
                                    <CTableDataCell>
                                        <NumberFormat
                                            value={state.data?.dueNominal}
                                            displayType="text"
                                            allowLeadingZeros={false}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CContainer>
        </>
    );
};

export default PrintSales;
