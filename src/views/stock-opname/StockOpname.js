import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { CButton, CCol, CContainer, CImage, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus, cilTrash } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import { deleteData, get } from "src/network/api/network";
import StatusAlert from "src/helper/StatusAlert";
import ConfirmationModal from "src/helper/ConfirmationModal";
import emptyGraphic from "./../../assets/images/empty.svg";

const StockOpname = () => {
    const navigate = useNavigate();

    const tableCols = [
        {
            name: "stockOpnameId",
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
            name: "userId",
            options: {
                display: false,
                sort: false,
                filter: false,
            },
        },
        {
            name: "date",
            label: "Tanggal",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "user",
            label: "Dibuat oleh",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return `${value.firstName} ${value.lastName}`;
                },
            },
        },
        {
            name: "description",
            label: "Keterangan",
            options: {
                sort: true,
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
                                    navigate(`/stock-opname/${tablemeta.rowData[0]}`);
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
                        navigate("/stock-opname/tambah");
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
        selectedStockOpname: null,
        openModal: false,
        showAlert: false,
    });

    useEffect(() => {
        getStockOpnameList();
    }, [state.isReload]);

    const getStockOpnameList = async () => {
        const response = await get("/stock-opname");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
    };

    // Delete

    const deleteStockOpname = async (id) => {
        const response = await deleteData("/stock-opname", id);
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
            selectedStockOpname: null,
            isReload: Math.random(),
        }));

        setTimeout(() => handleCloseAlert(), 3000);
    };

    const handleCloseAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
            alertContent: null,
            selectedStockOpname: null,
        }));
    };

    // Handle confirmation

    const handleShowConfirmation = (opname) => {
        setState((prevState) => ({
            ...prevState,
            openModal: true,
            selectedStockOpname: opname,
        }));
    };

    const handleCloseConfirmation = () => {
        setState((prevState) => ({
            ...prevState,
            openModal: false,
            action: null,
            selectedStockOpname: null,
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
                    title={"Daftar Stock Opname"}
                    data={state.data}
                    columns={tableCols}
                    options={tableOptions}
                />
            ) : (
                <CContainer>
                    <CRow className="align-items-center justify-content-center">
                        <CCol md={7} className="text-center">
                            <h1 className="h3">Belum ada data stock opname</h1>
                            <div>
                                <CButton
                                    className="mb-5 mt-3"
                                    onClick={() => {
                                        navigate("/stock-opname/tambah");
                                    }}
                                >
                                    <CIcon className="me-2" icon={cilPlus} /> Tambah Stock Opname
                                </CButton>
                            </div>

                            <CImage src={emptyGraphic} height={200} />
                        </CCol>
                    </CRow>
                </CContainer>
            )}

            {state.openModal && (
                <ConfirmationModal
                    openModal={state.openModal}
                    title={"Hapus Produk"}
                    content={`Apakah Anda yakin ingin menghapus data stock opname "${state.selectedStockOpname[5]}" ?`}
                    type={"delete"}
                    buttonLeft={"Batal"}
                    buttonRight={"Hapus"}
                    proceed={() => {
                        deleteStockOpname(state.selectedStockOpname[0]);
                    }}
                    handleClose={handleCloseConfirmation}
                />
            )}
        </>
    );
};

export default StockOpname;
