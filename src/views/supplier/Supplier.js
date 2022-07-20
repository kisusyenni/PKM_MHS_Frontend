import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { CButton, CCol, CImage, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus } from "@coreui/icons";
import SupplierForm from "./SupplierForm";
import { get } from "src/network/api/network";
import StatusAlert from "src/helper/StatusAlert";
import emptyGraphic from "src/assets/images/empty.svg";

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
        filter: false,
        customToolbar: () => (
            <>
                <CButton onClick={handleAdd}>
                    <CIcon className="me-2" icon={cilPlus} /> Tambah
                </CButton>
            </>
        ),
    };

    const [state, setState] = useState({
        openForm: false,
        showAlert: false,
        alertContent: null,
        alertType: null,
        action: null,
        data: [],
        tableCols: tableCols,
        tableOptions: tableOptions,
        isReload: false,
        title: "Supplier - MHS SOFT",
    });

    useEffect(() => {
        document.title = state.title || "";
    }, [state.title]);

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

    const handleClose = () => {
        setState((prevState) => ({
            ...prevState,
            openForm: false,
        }));
    };

    // Handle alert

    const handleShowAlert = (type, content) => {
        setState((prevState) => ({
            ...prevState,
            openModal: false,
            showAlert: true,
            alertContent: content,
            alertType: type,
            selectedAccount: null,
            isReload: Math.random(),
        }));

        setTimeout(() => handleCloseAlert(), 3000);
    };

    const handleCloseAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
            alertContent: null,
            selectedAccount: null,
        }));
    };

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

            {state.data.length > 0 ? (
                <MUIDataTable
                    title={"Daftar Supplier"}
                    data={state.data}
                    columns={state.tableCols}
                    options={state.tableOptions}
                />
            ) : (
                <CRow className="align-items-center justify-content-center">
                    <CCol md={7} className="text-center">
                        <h1 className="h3">Belum ada data supplier</h1>
                        <div>
                            <CButton className="mb-5 mt-3" onClick={handleAdd}>
                                <CIcon className="me-2" icon={cilPlus} /> Tambah Supplier
                            </CButton>
                        </div>

                        <CImage className="w-100" src={emptyGraphic} height={200} />
                    </CCol>
                </CRow>
            )}

            {state.openForm && (
                <SupplierForm
                    openForm={state.openForm}
                    action={state.action}
                    handleClose={handleClose}
                    supplier={state.selectedSupplier}
                    handleAlert={handleShowAlert}
                />
            )}
        </>
    );
};

export default Supplier;
