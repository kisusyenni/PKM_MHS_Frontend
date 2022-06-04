import { CBadge } from "@coreui/react";
import React from "react";

const accountTableCols = [
    {
        name: "accountId",
        label: "",
        options: {
            display: false,
            filter: false,
            sort: false,
        },
    },
    {
        name: "accountHeaderId",
        label: "",
        options: {
            display: false,
            filter: false,
            sort: false,
        },
    },
    {
        name: "name",
        label: "Nama Perkiraan",
        options: {
            sort: true,
            filter: false,
            filterList: [],
            customBodyRender: (value, tablemeta) => {
                return tablemeta.rowData[5] ? <b>{value}</b> : value;
            },
        },
    },
    {
        name: "accountCode",
        label: "Nomor Perkiraan",
        options: {
            sort: true,
            filter: false,
            filterList: [],
            customBodyRender: (value, tablemeta) => {
                return tablemeta.rowData[5] ? <b>{value}</b> : value;
            },
        },
    },
    {
        name: "position",
        label: "Jenis",
        options: {
            sort: true,
            filter: true,
            filterList: [],
            filterOptions: {
                renderValue: (val) => {
                    return val ? "Kredit" : "Debit";
                },
            },
            customBodyRender: (value) => {
                const position = value ? "Kredit" : "Debit";
                const color = value ? "info" : "success";
                return (
                    <CBadge color={color} shape="rounded-pill">
                        {position}
                    </CBadge>
                );
            },
        },
    },
    {
        name: "is_header",
        label: "",
        options: {
            display: false,
            sort: false,
            filter: false,
        },
    },
    {
        name: "is_editable",
        label: "",
        options: {
            display: false,
            sort: false,
            filter: false,
        },
    },
];

const accountTableOptions = {
    selectableRows: "single",
    selectableRowsHideCheckboxes: true,
    elevation: 1,
    download: false,
    print: false,
    viewColumns: false,
    sort: true,
};

export { accountTableCols as accTblCols, accountTableOptions as accTblOpts };
