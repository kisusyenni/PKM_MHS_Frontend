import React from "react";
import MUIDataTable from "mui-datatables";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { useNavigate } from "react-router-dom";

const ProfitLoss = () => {
    const title = "Jurnal Umum";
    const navigate = useNavigate();
    const profitLossList = {
        startDate: "",
        endDate: "",
        cost_of_sales: 2371808.01127,
        expenses: 4648018.018010001,
        gross_profit: 23205128.925669998,
        net_profit: 18557110.907659996,
        trading_income: 25576936.93694,
        data: {
            sales: [
                {
                    account_id: 121,
                    net: 25576936.93694,
                    account: {
                        id: 121,
                        name: "Pendapatan",
                        ref_code: "4-40000",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
            ],
            other_revenue: [],
            cost_of_sales: [
                {
                    account_id: 131,
                    net: 2371808.01127,
                    account: {
                        id: 131,
                        name: "Beban Pokok Pendapatan",
                        ref_code: "5-50000",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
            ],
            expenses: [
                {
                    account_id: 1429,
                    net: 84684.68468,
                    account: {
                        id: 1429,
                        name: "Beban Manfaat Karyawan",
                        ref_code: "6-60210",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
                {
                    account_id: 144,
                    net: -131531.53153,
                    account: {
                        id: 144,
                        name: "Bensin, Tol dan Parkir - Penjualan",
                        ref_code: "6-60003",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
                {
                    account_id: 142,
                    net: 980000,
                    account: {
                        id: 142,
                        name: "Iklan & Promosi",
                        ref_code: "6-60001",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
                {
                    account_id: 143,
                    net: -360000,
                    account: {
                        id: 143,
                        name: "Komisi & Fee",
                        ref_code: "6-60002",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
                {
                    account_id: 146,
                    net: 2369459.45946,
                    account: {
                        id: 146,
                        name: "Komunikasi - Penjualan",
                        ref_code: "6-60005",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
                {
                    account_id: 1412,
                    net: 10810.81081,
                    account: {
                        id: 1412,
                        name: "Lembur",
                        ref_code: "6-60104",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
                {
                    account_id: 145,
                    net: 1694594.59459,
                    account: {
                        id: 145,
                        name: "Perjalanan Dinas - Penjualan",
                        ref_code: "6-60004",
                        currency_id: null,
                        parent_id: null,
                        is_parent: 0,
                    },
                },
            ],
            other_expenses: [],
        },
    };

    const profitLossTableCols = [
        {
            name: "transId",
            label: "transId",
            options: {
                filter: false,
                sort: false,
            },
        },
    ];

    const profitLossTableOptions = {
        selectableRows: "single",
        selectableRowsHideCheckboxes: true,
        elevation: 1,
        download: false,
        print: false,
        viewColumns: false,
        sort: true,
        customToolbar: () => (
            <>
                <CButton
                    onClick={() => {
                        navigate("/jurnal/tambah");
                    }}
                >
                    <CIcon className="me-2" icon={cilPlus} /> Input Jurnal
                </CButton>
            </>
        ),
    };
    return (
        <MUIDataTable
            title={title}
            data={profitLossList.data}
            columns={profitLossTableCols}
            options={profitLossTableOptions}
        />
    );
};

export default ProfitLoss;
