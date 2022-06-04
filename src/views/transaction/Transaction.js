import React, { useState } from "react";
import StatusAlert from "src/helper/StatusAlert";
import MUIDataTable from "mui-datatables";
import { CButton, CBadge } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus, cilTrash } from "@coreui/icons";

const Transaction = () => {
    let initCols = [
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

    let initOptions = {
        selectableRows: "single",
        selectableRowsHideCheckboxes: true,
        elevation: 1,
        download: false,
        print: false,
        viewColumns: false,
        sort: true,
        customToolbar: () => (
            <>
                <CButton variant="outline" onClick={handleAdd}>
                    <CIcon icon={cilPlus} />
                </CButton>
            </>
        ),
    };
    const [state, setState] = useState({
        initCols: initCols,
        initOptions: initOptions,
        data: [],
        showAlert: false,
        type: null,
        content: "",
    });
    const title = "Transaksi";

    const handleAdd = () => {};
    const handleEdit = () => {};
    const handleDelete = () => {};
    const handleCloseAlert = () => {};

    return (
        <>
            {state.showAlert ? (
                <StatusAlert
                    showAlert={state.showAlert}
                    type={state.alertType}
                    content={state.alertContent}
                    closeAlert={handleCloseAlert}
                />
            ) : (
                <></>
            )}

            <MUIDataTable
                title={title}
                data={state.data}
                columns={state.initCols}
                options={state.initOptions}
            />
        </>
    );
};

export default Transaction;
