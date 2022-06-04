import React from "react";
import MUIDataTable from "mui-datatables";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { useNavigate } from "react-router-dom";

const BalanceSheet = () => {
    const title = "Jurnal Umum";
    const navigate = useNavigate();
    const balanceSheetList = {
        startDate: "",
        endDate: "",
        assets: {
            name: "Assets",
            total: 75853045.14192998,
            data: {
                bank: {
                    name: "Kas & Bank",
                    total: 2347307.837839998,
                    data: [
                        {
                            account_id: 1,
                            net: -19838854.14414,
                            account: {
                                id: 1,
                                name: "Kas",
                                ref_code: "1-10001",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 2,
                            net: 20268628.91892,
                            account: {
                                id: 2,
                                name: "Rekening Bank",
                                ref_code: "1-10002",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 3,
                            net: 1917533.06306,
                            account: {
                                id: 3,
                                name: "Giro",
                                ref_code: "1-10003",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                    ],
                },
                current_assets: {
                    name: "Aset Lancar",
                    total: 73387719.28605999,
                    data: [
                        {
                            account_id: 21,
                            net: 37367228.55857,
                            account: {
                                id: 21,
                                name: "Piutang Usaha",
                                ref_code: "1-10100",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 23,
                            net: 15303201.53154,
                            account: {
                                id: 23,
                                name: "Cadangan Kerugian Piutang",
                                ref_code: "1-10102",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 31,
                            net: 18253913.61035,
                            account: {
                                id: 31,
                                name: "Persediaan Barang",
                                ref_code: "1-10200",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 43,
                            net: 20720.72072,
                            account: {
                                id: 43,
                                name: "Dana Belum Disetor",
                                ref_code: "1-10400",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 47,
                            net: 2442654.86488,
                            account: {
                                id: 47,
                                name: "PPN Masukan",
                                ref_code: "1-10500",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                    ],
                },
                fixed_assets: {
                    name: "Aset Tetap",
                    total: 0,
                    data: [],
                },
                depreciation: {
                    name: "Depresiasi & Amortisasi",
                    total: 118018.01803,
                    data: [
                        {
                            account_id: 61,
                            net: 55855.85586,
                            account: {
                                id: 61,
                                name: "Akumulasi Penyusutan - Bangunan",
                                ref_code: "1-10751",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 66,
                            net: 12612.61262,
                            account: {
                                id: 66,
                                name: "Akumulasi Penyusutan - Aset Sewa Guna Usaha",
                                ref_code: "1-10756",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 67,
                            net: 49549.54955,
                            account: {
                                id: 67,
                                name: "Akumulasi Amortisasi",
                                ref_code: "1-10757",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                    ],
                },
                other_assets: {
                    name: "Lainnya",
                    total: 0,
                    data: [],
                },
            },
        },
        liabilities_equity: {
            name: "Liabilitas and Modal",
            total: 75853045.14192,
            data: {
                current_liabilities: {
                    name: "Liabilitas Jangka Pendek",
                    total: 36169113.51349,
                    data: [
                        {
                            account_id: 81,
                            net: 24163745.85584,
                            account: {
                                id: 81,
                                name: "Hutang Usaha",
                                ref_code: "2-20100",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 82,
                            net: 6268913.06307,
                            account: {
                                id: 82,
                                name: "Hutang Belum Ditagih",
                                ref_code: "2-20101",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 94,
                            net: -28828.82883,
                            account: {
                                id: 94,
                                name: "Pendapatan Diterima Di Muka",
                                ref_code: "2-20203",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 910,
                            net: 5713031.17116,
                            account: {
                                id: 910,
                                name: "PPN Keluaran",
                                ref_code: "2-20500",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 916,
                            net: 52252.25225,
                            account: {
                                id: 916,
                                name: "Hutang dari Pemegang Saham",
                                ref_code: "2-20600",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                    ],
                },
                equity: {
                    name: "Perubahan Modal",
                    total: 39683931.62843001,
                    data: [
                        {
                            account_id: 111,
                            net: 50450.45045,
                            account: {
                                id: 111,
                                name: "Modal Saham",
                                ref_code: "3-30000",
                                currency_id: null,
                                parent_id: null,
                                is_parent: 0,
                            },
                        },
                        {
                            account_id: 0,
                            name: "earnings_up_to_last_period",
                            net: 0,
                            account: {
                                id: 0,
                                name: "Pendapatan sampai periode terakhir",
                                ref_code: "",
                            },
                        },
                        {
                            account_id: 0,
                            name: "current_period_earnings",
                            net: 39633481.177980006,
                            account: {
                                id: 0,
                                name: "Pendapatan periode ini",
                                ref_code: "",
                            },
                        },
                    ],
                },
            },
        },
    };

    const balanceSheetTableCols = [
        {
            name: "transId",
            label: "transId",
            options: {
                filter: false,
                sort: false,
            },
        },
    ];

    const balanceSheetTableOptions = {
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
            data={balanceSheetList.data}
            columns={balanceSheetTableCols}
            options={balanceSheetTableOptions}
        />
    );
};

export default BalanceSheet;
