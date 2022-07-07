/* eslint-disable react/prop-types */
import React from "react";
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
import PaymentStatus from "src/helper/PaymentStatus";
const SalesContent = ({ data }) => {
    return (
        <>
            {data && (
                <CCard className="my-3">
                    <CCardHeader>
                        <h2 className="h3 fw-bold my-2">Transaksi Penjualan {data?.refNumber}</h2>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol md={4}>
                                <h6>Nomor Transaksi</h6>
                                <p>{data?.refNumber}</p>
                            </CCol>
                            <CCol md={4}>
                                <h6>Total</h6>
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
                        </CRow>
                        <CTable bordered>
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
                                {data?.tbl_sales_details.map((detail, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{detail.tbl_inventory.name}</CTableDataCell>
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
                                            value={data?.subtotal}
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
                                            value={data?.discount}
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
                                            value={data?.totalPayment}
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
                                            value={data?.dueNominal}
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
            )}
        </>
    );
};

export default SalesContent;
