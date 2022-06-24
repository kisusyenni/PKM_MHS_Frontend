import React, { useState } from "react";
import {
    CButton,
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

const ReceivableTable = () => {
    const data = [
        {
            salesId: "4747830e-76a2-4051-9087-55acaf2c56ea",
            refNumber: "SA0001",
            transDate: "2022-06-23",
            dueDate: "2022-06-30",
            status: 2,
            dueNominal: 150000,
            totalPayment: 480000,
        },
        {
            salesId: "4747830e-76a2-4051-9087-55acaf2c56ea",
            refNumber: "SA0005",
            transDate: "2022-06-23",
            dueDate: "2022-06-30",
            status: 2,
            dueNominal: 100000,
            totalPayment: 500000,
        },
    ];

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
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow className="text-center">
                        <CTableHeaderCell colSpan={4}>Piutang</CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell className="text-center">
                            <CIcon icon={cilCalendar} /> <small>Jatuh Tempo</small>
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center">
                            <small>Terbayar</small>
                        </CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {data.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
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
                                            {((item.totalPayment - item.dueNominal) /
                                                item.totalPayment) *
                                                100}
                                            %
                                        </strong>
                                    </div>
                                </div>
                                <CProgress
                                    thin
                                    color="success"
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
                <CModal className="show" keyboard={false} portal={false} visible={state.open}>
                    <CModalHeader closeButton={false}>
                        <CModalTitle>
                            Pembayaran Penjualan {state.selectedData.refNumber}
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
                            type={"sales"}
                            id={state.selectedData.salesId}
                            total={state.selectedData.dueNominal}
                        />
                    </CModalBody>
                </CModal>
            )}
        </>
    );
};

export default ReceivableTable;
