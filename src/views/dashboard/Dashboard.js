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

const Dashboard = () => {
    const [state, setState] = useState({
        data: null,
        isReload: null,
    });

    const getDashboardData = async () => {
        setState((prevState) => ({
            ...prevState,
            data: {
                chart: {
                    period: "Januari - Desember 2022",
                    sales: {
                        total: 720584,
                        list: [
                            650000, 590000, 840000, 810000, 510000, 550000, 420000, 1050000,
                            2405000, 330000, 480000, 507000,
                        ],
                    },
                    purchase: {
                        total: 720584,
                        list: [
                            2500000, 3010000, 4840000, 8510000, 7250000, 6520000, 6420000, 7150000,
                            8448000, 5370000, 6524000, 5427000,
                        ],
                    },
                    expense: {
                        total: 720584,
                        list: [
                            250000, 190000, 240550, 118000, 410000, 355000, 142000, 357000, 245000,
                            150000, 304500, 205000,
                        ],
                    },
                },
                table: {
                    payable: [
                        {
                            purchaseId: "4747830e-76a2-4051-9087-55acaf2c56ea",
                            refNumber: "PU0001",
                            transDate: "2022-06-23",
                            dueDate: "2022-06-30",
                            status: 2,
                            dueNominal: 300000,
                            totalPayment: 480000,
                            tbl_supplier: {
                                supplierId: "625d277a-3f4d-4c0d-960b-d31e9d6f3bc6",
                                name: "supplier12",
                            },
                        },
                        {
                            purchaseId: "4747830e-76a2-4051-9087-55acaf2c56ea",
                            refNumber: "PU0005",
                            transDate: "2022-06-23",
                            dueDate: "2022-06-30",
                            status: 2,
                            dueNominal: 100000,
                            totalPayment: 400000,
                            tbl_supplier: {
                                supplierId: "625d277a-3f4d-4c0d-960b-d31e9d6f3bc6",
                                name: "ABC",
                            },
                        },
                    ],
                    receivable: [
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
                    ],
                    outofstock: [
                        {
                            name: "Barang 02",
                            total: 0,
                        },
                        {
                            name: "Barang 05",
                            total: 1,
                        },
                        {
                            name: "Barang 07",
                            total: 3,
                        },
                        {
                            name: "Barang 01",
                            total: 5,
                        },
                        {
                            name: "Barang 11",
                            total: 9,
                        },
                    ],
                },
                inventory: [
                    {
                        name: "Barang 01",
                        total: 10,
                    },
                    {
                        name: "Barang 02",
                        total: 5,
                    },
                    {
                        name: "Barang 03",
                        total: 15,
                    },
                    {
                        name: "Barang 04",
                        total: 20,
                    },
                ],
            },
        }));
    };

    useEffect(() => {
        getDashboardData();
    }, [state.isReload]);

    return (
        <>
            <CRow>
                <CCol sm={6} lg={4}>
                    <SalesWidget data={state?.data?.chart?.sales} />
                </CCol>
                <CCol sm={6} lg={4}>
                    <PurchaseWidget data={state?.data?.chart?.purchase} />
                </CCol>
                <CCol sm={6} lg={4}>
                    <ExpenseWidget data={state?.data?.chart?.expense} />
                </CCol>
            </CRow>

            <OverviewChart />

            <CCard className="mb-4">
                {state?.data?.table && <CCardHeader>Hutang {" & "} Piutang Usaha</CCardHeader>}
                <CCardBody>
                    <CRow>
                        <CCol sm={12} lg={7}>
                            <PayableTable data={state?.data?.table?.payable} />
                        </CCol>
                        <CCol sm={12} lg={5}>
                            <ReceivableTable data={state?.data?.table?.receivable} />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

            <CRow className="mb-4">
                <CCol sm={12} lg={6}>
                    <OutOfStockTable data={state?.data?.table?.outofstock} />
                </CCol>
                <CCol sm={12} lg={6}>
                    <InventoryChart data={state?.data?.inventory} />
                </CCol>
            </CRow>
        </>
    );
};

export default Dashboard;
