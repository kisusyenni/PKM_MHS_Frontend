import React from "react";

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
} from "@coreui/icons";
import SalesWidget from "./widget/SalesWidget";
import PurchaseWidget from "./widget/PurchaseWidget";
import ExpenseWidget from "./widget/ExpenseWidget";
import OverviewChart from "./chart/OverviewChart";
import PayableTable from "./table/PayableTable";
import ReceivableTable from "./table/ReceivableTable";
import InventoryChart from "./chart/InventoryChart";
import OutOfStockTable from "./table/OutOfStockTable";

const Dashboard = () => {
    return (
        <>
            <CRow>
                <CCol sm={6} lg={4}>
                    <SalesWidget />
                </CCol>
                <CCol sm={6} lg={4}>
                    <PurchaseWidget />
                </CCol>
                <CCol sm={6} lg={4}>
                    <ExpenseWidget />
                </CCol>
            </CRow>

            <OverviewChart />

            <CCard className="mb-4">
                <CCardHeader>Hutang {" & "} Piutang Usaha</CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol sm={12} lg={7}>
                            <PayableTable />
                        </CCol>
                        <CCol sm={12} lg={5}>
                            <ReceivableTable />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

            <CRow className="mb-4">
                <CCol sm={12} lg={6}>
                    <OutOfStockTable />
                </CCol>
                <CCol sm={12} lg={6}>
                    <InventoryChart />
                </CCol>
            </CRow>
        </>
    );
};

export default Dashboard;
