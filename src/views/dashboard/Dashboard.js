import React, { useEffect, useState } from "react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CImage, CRow } from "@coreui/react";
import SalesWidget from "./widget/SalesWidget";
import PurchaseWidget from "./widget/PurchaseWidget";
import ExpenseWidget from "./widget/ExpenseWidget";
import OverviewChart from "./chart/OverviewChart";
import PayableTable from "./table/PayableTable";
import ReceivableTable from "./table/ReceivableTable";
import InventoryChart from "./chart/InventoryChart";
import OutOfStockTable from "./table/OutOfStockTable";
import { get } from "src/network/api/network";
import emptyGraphic from "src/assets/images/empty.svg";
import emptySupplier from "src/assets/images/emptySupplier.svg";

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
            <CRow className="mb-4">
                {state.inventory?.totalInventory <= 0 && (
                    <>
                        <CCol md={6} className="mb-2">
                            <CCard>
                                <CCardBody className="text-center">
                                    <h1 className="h6">Belum ada inventaris</h1>
                                    <div className="mb-3">
                                        <CImage src={emptyGraphic} height={100} />
                                    </div>
                                    <CButton size="sm" href="inventaris/tambah">
                                        Tambah
                                    </CButton>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </>
                )}
                {state.inventory?.totalSupplier <= 0 && (
                    <>
                        <CCol md={6} className="mb-2">
                            <CCard>
                                <CCardBody className="text-center">
                                    <h1 className="h6">Belum ada supplier</h1>
                                    <div className="mb-3">
                                        <CImage src={emptySupplier} height={100} />
                                    </div>
                                    <CButton size="sm" href="supplier">
                                        Tambah
                                    </CButton>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </>
                )}
                {state.data?.sales?.total > 0 &&
                    state.data?.purchase?.total > 0 &&
                    state.data?.expense?.total > 0 && (
                        <CCol xs={12}>
                            <h1 className="h4 mb-3">Periode {state?.data?.yearPeriod}</h1>
                        </CCol>
                    )}

                {state.inventory?.totalInventory > 0 && state.inventory?.totalSupplier > 0 && (
                    <>
                        <CCol sm={6} lg={4} className="mb-2">
                            <SalesWidget data={state?.data?.sales} />
                        </CCol>
                        <CCol sm={6} lg={4} className="mb-2">
                            <PurchaseWidget data={state?.data?.purchase} />
                        </CCol>
                        <CCol sm={6} lg={4} className="mb-2">
                            <ExpenseWidget data={state?.data?.expense} />
                        </CCol>
                    </>
                )}
            </CRow>

            <OverviewChart data={state?.data} />

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

            <CRow className="mb-4 row-cols-md-2">
                <CCol>
                    <CCard className="h-100">
                        <OutOfStockTable data={state?.inventory?.outOfStock} />
                    </CCard>
                </CCol>
                <CCol>
                    <CCard className="h-100">
                        <InventoryChart data={state?.inventory?.mostSoldStock} />
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default Dashboard;
