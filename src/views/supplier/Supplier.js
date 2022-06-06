import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus, cilTrash } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import SupplierForm from "./SupplierForm";

const Supplier = () => {
    const [state, setState] = useState({
        openForm: false,
        action: null,
        suppliers: [
            {
                supplierId: 1,
                name: "Toko ABC",
                address: "Batam",
                telephone: "+62 812 3456 78",
                email: "abc@email.com",
            },
            {
                supplierId: 2,
                name: "Toko CCC",
                address: "Tanjung Pinang",
                telephone: "+62 811 2233 4455",
                email: "ccc@email.com",
            },
        ],
    });
    const navigate = useNavigate();

    const handleAdd = () => {
        setState((prevState) => ({
            ...prevState,
            openForm: true,
            action: "add",
        }));
    };

    const handleEdit = (supplier) => {
        setState((prevState) => ({
            ...prevState,
            openForm: true,
            action: "edit",
            selectedSupplier: supplier,
        }));
    };

    const handleDelete = (id) => {};

    const handleClose = () => {
        setState((prevState) => ({
            ...prevState,
            openForm: false,
        }));
    };

    const supplierTableCols = [
        {
            name: "supplierId",
            label: "",
            options: {
                display: false,
                filter: false,
                sort: false,
            },
        },
        {
            name: "name",
            label: "Nama",
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: "address",
            label: "Alamat",
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: "telephone",
            label: "Telepon",
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: false,
                sort: false,
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
                                    handleEdit(tablemeta.rowData);
                                }}
                            >
                                <CIcon icon={cilPen}></CIcon>
                            </CButton>
                            <CButton
                                color="primary"
                                variant="outline"
                                onClick={() => {
                                    handleDelete(tablemeta.rowData[0]);
                                }}
                            >
                                <CIcon icon={cilTrash}></CIcon>
                            </CButton>
                        </>
                    );
                },
            },
        },
    ];

    const supplierTableOptions = {
        selectableRows: "single",
        selectableRowsHideCheckboxes: true,
        elevation: 1,
        download: false,
        print: false,
        viewColumns: false,
        sort: true,
        customToolbar: () => (
            <>
                <CButton onClick={handleAdd}>
                    <CIcon className="me-2" icon={cilPlus} /> Tambah Supplier
                </CButton>
            </>
        ),
    };

    return (
        <>
            <MUIDataTable
                title={"Daftar Supplier"}
                data={state.suppliers}
                columns={supplierTableCols}
                options={supplierTableOptions}
            />

            {state.openForm && (
                <SupplierForm
                    openForm={state.openForm}
                    action={state.action}
                    handleClose={handleClose}
                    data={state.selectedSupplier}
                />
            )}
        </>
    );
};

export default Supplier;
