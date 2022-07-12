/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
    CButton,
    CImage,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CProgress,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser, cilCalendar, cilCash } from "@coreui/icons";
import NumberFormat from "react-number-format";
import PaymentForm from "src/components/payment/PaymentForm";
import completeGraphic from "src/assets/images/complete.svg";

const PayableTable = ({ data }) => {
    // Handle payment form modal
    const [state, setState] = useState({
        open: false,
        selectedData: null,
    });

    const openPaymentForm = (data) => {
        setState((prevState) => ({
            ...prevState,
            open: true,
            selectedData: data,
        }));
    };

    const closePaymentForm = () => {
        setState((prevState) => ({
            ...prevState,
            open: false,
            selectedData: null,
        }));
    };
    return (
        <>
            {data && data.length > 0 ? (
                <>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead color="light">
                            <CTableRow className="text-center">
                                <CTableHeaderCell colSpan={4}>Hutang</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center">
                                    <CIcon icon={cilUser} />
                                    <small>Supplier</small>
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                    <CIcon icon={cilCalendar} /> <small>Jatuh Tempo</small>
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                    <small>Terbayar</small>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {data.map((item, index) => (
                                <CTableRow v-for="item in tableItems" key={index}>
                                    <CTableDataCell className="text-center">
                                        {item.supplierData?.name || "-"}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        {item.dueDate}
                                        <div className="small text-medium-emphasis">
                                            Transaksi No: {item.refNumber}
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div className="clearfix">
                                            <div className="float-start">
                                                <strong>
                                                    {Math.round(
                                                        ((item.totalPayment - item.dueNominal) /
                                                            item.totalPayment) *
                                                            100,
                                                    )}
                                                    %
                                                </strong>
                                            </div>
                                        </div>
                                        <CProgress
                                            thin
                                            color="primary"
                                            value={
                                                ((item.totalPayment - item.dueNominal) /
                                                    item.totalPayment) *
                                                100
                                            }
                                        />
                                        <div className="small text-medium-emphasis">
                                            Sisa:{" "}
                                            <NumberFormat
                                                value={item.dueNominal}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"Rp"}
                                            />
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CTooltip content="bayar tagihan">
                                            <CButton
                                                color="info"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    openPaymentForm(item);
                                                }}
                                            >
                                                <CIcon icon={cilCash} />
                                            </CButton>
                                        </CTooltip>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>

                    {state.open && (
                        <CModal
                            className="show"
                            keyboard={false}
                            portal={false}
                            visible={state.open}
                            size="lg"
                        >
                            <CModalHeader closeButton={false}>
                                <CModalTitle>
                                    Pembayaran Pembelian {state.selectedData.refNumber}
                                </CModalTitle>
                                <CButton
                                    className="btn btn-close"
                                    color="light"
                                    onClick={closePaymentForm}
                                    aria-label="close"
                                ></CButton>
                            </CModalHeader>
                            <CModalBody>
                                <PaymentForm
                                    type={"purchase"}
                                    id={state.selectedData.purchaseId}
                                    total={state.selectedData.dueNominal}
                                />
                            </CModalBody>
                        </CModal>
                    )}
                </>
            ) : (
                <>
                    <div className="text-center">
                        <div className="mb-3">
                            <CImage src={completeGraphic} height={100} />
                        </div>
                        <p>Toko Anda tidak memiliki piutang</p>
                    </div>
                </>
            )}
        </>
    );
};

export default PayableTable;
