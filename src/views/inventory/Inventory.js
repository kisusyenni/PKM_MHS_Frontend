/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { CButton, CCol, CImage, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus, cilTrash } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { get, put } from "src/network/api/network";
import StatusAlert from "src/helper/StatusAlert";
import ConfirmationModal from "src/helper/ConfirmationModal";
import emptyGraphic from "./../../assets/images/empty.svg";

const Inventory = () => {
    const navigate = useNavigate();

    const tableCols = [
        {
            name: "inventoryId",
            options: {
                display: false,
                filter: false,
                sort: false,
            },
        },
        {
            name: "storeId",
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
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "quantity",
            label: "Jumlah",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return tablemeta.rowData[5] === 1 ? "-" : value;
                },
            },
        },

        {
            name: "sellingPrice",
            label: "Harga Jual",
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
            name: "isService",
            options: {
                display: false,
                sort: false,
                filter: false,
            },
        },
        {
            name: "isDeleted",
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
                                    navigate(`/inventaris/ubah/${tablemeta.rowData[0]}`);
                                }}
                            >
                                <CIcon icon={cilPen}></CIcon>
                            </CButton>
                            <CButton
                                color="primary"
                                variant="outline"
                                onClick={() => {
                                    handleShowConfirmation(tablemeta.rowData);
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
                        navigate("/inventaris/tambah");
                    }}
                >
                    <CIcon className="me-2" icon={cilPlus} /> Tambah
                </CButton>
            </>
        ),
    };

    const [state, setState] = useState({
        data: [],
        isReload: null,
        columns: tableCols,
        options: tableOptions,
        selectedInventory: null,
        openModal: false,
        showAlert: false,
    });

    useEffect(() => {
        getInventoryList();
    }, [state.isReload]);

    const getInventoryList = async () => {
        const response = await get("/inventory");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
    };

    // Delete

    const deleteInventory = async (inventory) => {
        const data = {
            storeId: localStorage.getItem("storeId"),
            name: inventory[2],
            quantity: inventory[3],
            sellingPrice: inventory[4],
            isService: inventory[5],
            is_deleted: 1,
        };
        const response = await put("/inventory", inventory[0], data);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                isReload: Math.random(),
            }));
            handleShowAlert("success", response.data);
        } else {
            handleShowAlert("danger", response.data);
        }
    };

    // Handle alert

    const handleShowAlert = (type, content) => {
        setState((prevState) => ({
            ...prevState,
            openModal: false,
            showAlert: true,
            alertContent: content,
            alertType: type,
            selectedInventory: null,
            isReload: Math.random(),
        }));

        setTimeout(() => handleCloseAlert(), 3000);
    };

    const handleCloseAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
            alertContent: null,
            selectedInventory: null,
        }));
    };

    // Handle confirmation

    const handleShowConfirmation = (product) => {
        setState((prevState) => ({
            ...prevState,
            openModal: true,
            selectedInventory: product,
        }));
    };

    const handleCloseConfirmation = () => {
        setState((prevState) => ({
            ...prevState,
            openModal: false,
            action: null,
            selectedInventory: null,
        }));
    };

    return (
        <>
            {state.showAlert && (
                <StatusAlert
                    showAlert={state.showAlert}
                    type={state.alertType}
                    content={state.alertContent}
                    closeAlert={handleCloseAlert}
                />
            )}
            {state.data?.length > 0 ? (
                <MUIDataTable
                    title={"Daftar Inventaris"}
                    data={state.data}
                    columns={tableCols}
                    options={tableOptions}
                />
            ) : (
                <CRow className="align-items-center justify-content-center">
                    <CCol md={7} className="text-center">
                        <h1 className="h3">Belum ada data inventaris</h1>
                        <div>
                            <CButton
                                className="mb-5 mt-3"
                                onClick={() => {
                                    navigate("/inventaris/tambah");
                                }}
                            >
                                <CIcon className="me-2" icon={cilPlus} /> Tambah Inventaris
                            </CButton>
                        </div>

                        <CImage className="w-100" src={emptyGraphic} height={200} />
                    </CCol>
                </CRow>
            )}

            {state.openModal && (
                <ConfirmationModal
                    openModal={state.openModal}
                    title={"Hapus Inventaris"}
                    content={`Apakah Anda yakin ingin menghapus ${state.selectedInventory[2]} ?`}
                    type={"delete"}
                    buttonLeft={"Batal"}
                    buttonRight={"Hapus"}
                    proceed={() => {
                        deleteInventory(state.selectedInventory);
                    }}
                    handleClose={handleCloseConfirmation}
                />
            )}
        </>
    );
};

export default Inventory;
