/* eslint-disable react/prop-types */
import React from "react";
import MUIDataTable from "mui-datatables";
import { CBadge, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import { cilPen, cilPlus } from "@coreui/icons";

const SalesTable = ({ data }) => {
    const navigate = useNavigate();

    const tableCols = [
        {
            name: "purchaseId",
            options: {
                display: false,
                filter: false,
                sort: false,
            },
        },
        {
            name: "refNumber",
            label: "Nomor",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "transDate",
            label: "Tanggal",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "dueDate",
            label: "Jatuh Tempo",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "status",
            label: "Status",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    switch (tablemeta.rowData[4]) {
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
            name: "dueNominal",
            label: "Sisa Tagihan",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value) => {
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
            name: "totalPayment",
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
            name: "discount",
            options: {
                display: false,
                sort: false,
                filter: false,
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
                                    navigate(`/penjualan/${tablemeta.rowData[0]}`);
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
                        navigate("/penjualan/tambah");
                    }}
                >
                    <CIcon className="me-2" icon={cilPlus} /> Tambah
                </CButton>
            </>
        ),
    };

    return (
        <>
            <MUIDataTable
                title={"Daftar Penjualan"}
                data={data}
                columns={tableCols}
                options={tableOptions}
            />
        </>
    );
};

export default SalesTable;
