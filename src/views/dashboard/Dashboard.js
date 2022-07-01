import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import SalesWidget from "./widget/SalesWidget";
import PurchaseWidget from "./widget/PurchaseWidget";
import ExpenseWidget from "./widget/ExpenseWidget";
import OverviewChart from "./chart/OverviewChart";
import PayableTable from "./table/PayableTable";
import ReceivableTable from "./table/ReceivableTable";
import InventoryChart from "./chart/InventoryChart";
import OutOfStockTable from "./table/OutOfStockTable";
import { get } from "src/network/api/network";

const Dashboard = () => {
    const [state, setState] = useState({
        data: null,
        table: null,
        inventory: null,
        isReload: null,
    });

    const getDashboard = async () => {
        const response = await get("/dashboard");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
    };

    const getDashboardTable = async () => {
        const response = await get("/dashboard/table");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                table: response.data,
            }));
        }
    };

    const getDashboardInventory = async () => {
        const response = await get("/dashboard/inventory");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                inventory: response.data,
            }));
        }
    };

    useEffect(() => {
        getDashboard();
        getDashboardTable();
        getDashboardInventory();
    }, [state.isReload]);

    return (
        <>
            <CRow>
                <CCol sm={6} lg={4}>
                    <SalesWidget data={state?.data?.sales} />
                </CCol>
                <CCol sm={6} lg={4}>
                    <PurchaseWidget data={state?.data?.purchase} />
                </CCol>
                <CCol sm={6} lg={4}>
                    <ExpenseWidget data={state?.data?.expense} />
                </CCol>
            </CRow>

            <OverviewChart />

            <CCard className="mb-4">
                {state?.table && <CCardHeader>Hutang {" & "} Piutang Usaha</CCardHeader>}
                <CCardBody>
                    <CRow>
                        <CCol sm={12} lg={7}>
                            <PayableTable data={state?.table?.payable} />
                        </CCol>
                        <CCol sm={12} lg={5}>
                            <ReceivableTable data={state?.table?.receivable} />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

            <CRow className="mb-4">
                <CCol sm={12} lg={6}>
                    <OutOfStockTable data={state?.inventory?.outOfStock} />
                </CCol>
                <CCol sm={12} lg={6}>
                    <InventoryChart data={state?.inventory?.mostSoldStock} />
                </CCol>
            </CRow>
        </>
    );
};

export default Dashboard;
