import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus } from "@coreui/icons";
import SupplierForm from "./SupplierForm";
import { get } from "src/network/api/network";

const Supplier = () => {
    const tableCols = [
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
                            {/* <CButton
                                color="primary"
                                variant="outline"
                                onClick={() => {
                                    handleDelete(tablemeta.rowData[0]);
                                }}
                            >
                                <CIcon icon={cilTrash}></CIcon>
                            </CButton> */}
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
        customToolbar: () => (
            <>
                <CButton onClick={handleAdd}>
                    <CIcon className="me-2" icon={cilPlus} /> Tambah Supplier
                </CButton>
            </>
        ),
    };

    const [state, setState] = useState({
        openForm: false,
        action: null,
        data: [],
        tableCols: tableCols,
        tableOptions: tableOptions,
        isReload: false,
    });

    useEffect(() => {
        getSupplierList();
    }, [state.isReload]);

    const getSupplierList = async () => {
        const result = await get("/supplier");
        if (result.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: result.data,
            }));
        }
    };

    // handle add supplier
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

    return (
        <>
            <MUIDataTable
                title={"Daftar Supplier"}
                data={state.data}
                columns={state.tableCols}
                options={state.tableOptions}
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
