/* eslint-disable react/prop-types */
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { CBadge, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import { cilPen, cilPlus } from "@coreui/icons";

const PurchaseTable = ({ data }) => {
    const navigate = useNavigate();

    const tableCols = [
        {
            name: "id",
            label: "id",
            options: {
                display: false,
                filter: false,
                sort: false,
            },
        },
        {
            name: "ref_number",
            label: "Nomor",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "supplier_id",
            label: "Supplier",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return tablemeta.rowData[11]?.name;
                },
            },
        },
        {
            name: "trans_date",
            label: "Tanggal",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "due_date",
            label: "Jatuh Tempo",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "status_id",
            label: "Status",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    switch (tablemeta.rowData[5]) {
                        case 1:
                            return <CBadge color="danger">Belum Dibayar</CBadge>;
                        case 2:
                            return <CBadge color="warning">Dibayar Sebagian</CBadge>;
                        case 3:
                            return <CBadge color="success">Lunas</CBadge>;
                        default:
                            return "";
                    }
                },
            },
        },
        {
            name: "due",
            label: "Sisa Tagihan",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return (
                        <NumberFormat
                            value={value}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp"}
                        />
                    );
                },
            },
        },
        {
            name: "amount_after_tax",
            label: "Total",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return (
                        <NumberFormat
                            value={value}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp"}
                        />
                    );
                },
            },
        },
        {
            name: "memo",
            label: "",
            options: {
                display: false,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "currency_rate",
            label: "",
            options: {
                display: false,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "currency_id",
            label: "",
            options: {
                display: false,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "supplier",
            label: "",
            options: {
                display: false,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "action",
            label: "Aksi",
            options: {
                sort: false,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return (
                        <>
                            <CButton
                                color="primary"
                                variant="outline"
                                className="me-2"
                                onClick={() => {
                                    navigate(`/pembelian/${tablemeta.rowData[0]}`);
                                }}
                            >
                                <CIcon icon={cilPen}></CIcon>
                            </CButton>
                        </>
                    );
                },
            },
        },
    ];

    const tableOptions = {
        selectableRows: "single",
        selectableRowsHideCheckboxes: true,
        elevation: 1,
        download: false,
        print: false,
        viewColumns: false,
        sort: true,
        filter: false,
        customToolbar: () => (
            <>
                <CButton
                    onClick={() => {
                        navigate("/pembelian/tambah");
                    }}
                >
                    <CIcon className="me-2" icon={cilPlus} /> Tambah Pembelian
                </CButton>
            </>
        ),
    };

    return (
        <>
            <MUIDataTable
                title={"Daftar Pembelian"}
                data={data}
                columns={tableCols}
                options={tableOptions}
            />
        </>
    );
};

export default PurchaseTable;
