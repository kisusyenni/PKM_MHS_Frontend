/* eslint-disable react/prop-types */
import {
    CBadge,
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
import React from "react";
import NumberFormat from "react-number-format";

const PurchaseContent = ({ data }) => {
    const PaymentStatus = (value) => {
        switch (value.status) {
            case 1:
                return <CBadge color="danger">Belum Dibayar</CBadge>;
            case 2:
                return <CBadge color="warning">Dibayar Sebagian</CBadge>;
            case 3:
                return <CBadge color="success">Lunas</CBadge>;
            default:
                return "-";
        }
    };

    return (
        <>
            {data && (
                <CCard className="my-3">
                    <CCardHeader>
                        <h2 className="h3 fw-bold my-2">Transaksi Pembelian {data?.refNumber}</h2>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol md={4}>
                                <h6>Nomor Transaksi</h6>
                                <p>{data?.refNumber}</p>
                            </CCol>
                            <CCol md={4}>
                                <h6>Total Payment</h6>
                                <p>
                                    <NumberFormat
                                        value={data?.totalPayment}
                                        displayType="text"
                                        allowLeadingZeros={false}
                                        thousandSeparator={true}
                                        prefix={"Rp"}
                                    />
                                </p>
                            </CCol>
                            <CCol md={4}>
                                <h6>Status</h6>
                                <p>
                                    <PaymentStatus status={data.status} />
                                </p>
                            </CCol>
                            <CCol md={4}>
                                <h6>Tanggal Transaksi</h6>
                                <p>{data?.transDate}</p>
                            </CCol>
                            <CCol md={4}>
                                <h6>Tanggal Jatuh Tempo</h6>
                                <p>{data?.dueDate}</p>
                            </CCol>
                            <CCol md={4}>
                                <h6>Supplier</h6>
                                <p>{data?.supplier?.name}</p>
                            </CCol>
                        </CRow>
                        <CTable bordered>
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Inventaris</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Diskon</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {data.detail.map((detail, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{detail.inventory.name}</CTableDataCell>
                                        <CTableDataCell scope="row">
                                            {detail.quantityBuy}
                                        </CTableDataCell>
                                        <CTableDataCell>{detail.discount}</CTableDataCell>
                                        <CTableDataCell>{detail.pricePerUnit}</CTableDataCell>
                                        <CTableDataCell>
                                            {(detail.pricePerUnit - detail.discount) *
                                                detail.quantityBuy}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            )}
        </>
    );
};

export default PurchaseContent;
