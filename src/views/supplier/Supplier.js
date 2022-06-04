import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import SupplierForm from "./SupplierForm";

const Supplier = () => {
    const [state, setState] = useState({
        openForm: false,
        action: null,
        suppliers: [],
    });
    const navigate = useNavigate();

    const handleEdit = (supplier) => {
        console.log(supplier);
        setState((prevState) => ({
            ...prevState,
            openForm: true,
            action: "edit",
            selectedSupplier: supplier,
        }));
    };

    const handleAdd = () => {
        setState((prevState) => ({
            ...prevState,
            openForm: true,
            action: "add",
        }));
    };

    const handleClose = () => {};

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

            <SupplierForm openForm={state.openForm} action={state.action} />
        </>
    );
};

export default Supplier;
