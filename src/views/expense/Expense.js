import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { CButton, CCol, CContainer, CImage, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus, cilTrash } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { deleteData, get } from "src/network/api/network";
import StatusAlert from "src/helper/StatusAlert";
import ConfirmationModal from "src/helper/ConfirmationModal";
import emptyGraphic from "./../../assets/images/empty.svg";

const Expense = () => {
    const navigate = useNavigate();

    const tableCols = [
        {
            name: "expenseId",
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
            name: "refNumber",
            label: "Nomor",
            options: {
                sort: true,
                filter: false,
                filterList: [],
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
            name: "name",
            label: "Nama",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },

        {
            name: "total",
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
        // {
        //     name: "action",
        //     label: "Aksi",
        //     options: {
        //         sort: false,
        //         filter: false,
        //         filterList: [],
        //         customBodyRender: (value, tablemeta) => {
        //             return (
        //                 <>
        //                     <CButton
        //                         color="primary"
        //                         variant="outline"
        //                         className="me-2"
        //                         onClick={() => {
        //                             navigate(`/pengeluaran/ubah/${tablemeta.rowData[0]}`);
        //                         }}
        //                     >
        //                         <CIcon icon={cilPen}></CIcon>
        //                     </CButton>
        //                     <CButton
        //                         color="primary"
        //                         variant="outline"
        //                         onClick={() => {
        //                             handleShowConfirmation(tablemeta.rowData);
        //                         }}
        //                     >
        //                         <CIcon icon={cilTrash}></CIcon>
        //                     </CButton>
        //                 </>
        //             );
        //         },
        //     },
        // },
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
                        navigate("/pengeluaran/tambah");
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
        selectedExpense: null,
        openModal: false,
        showAlert: false,
    });

    useEffect(() => {
        getExpenseList();
    }, [state.isReload]);

    const getExpenseList = async () => {
        const response = await get("/expense");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
    };

    // Delete

    const deleteExpense = async (id) => {
        const response = await deleteData("/expense", id);
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

    // Handle confirmation

    const handleShowConfirmation = (expense) => {
        setState((prevState) => ({
            ...prevState,
            openModal: true,
            selectedExpense: expense,
        }));
    };

    const handleCloseConfirmation = () => {
        setState((prevState) => ({
            ...prevState,
            openModal: false,
            action: null,
            selectedExpense: null,
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
                    title={"Daftar Pengeluaran"}
                    data={state.data}
                    columns={tableCols}
                    options={tableOptions}
                />
            ) : (
                <CContainer>
                    <CRow className="align-items-center justify-content-center">
                        <CCol md={7} className="text-center">
                            <h1 className="h3">Belum ada data pengeluaran</h1>
                            <div>
                                <CButton
                                    className="mb-5 mt-3"
                                    onClick={() => {
                                        navigate("/pengeluaran/tambah");
                                    }}
                                >
                                    <CIcon className="me-2" icon={cilPlus} /> Tambah Pengeluaran
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
                    title={"Hapus Pengeluaran"}
                    content={`Apakah Anda yakin ingin menghapus ${state.selectedExpense[2]} ?`}
                    type={"delete"}
                    buttonLeft={"Batal"}
                    buttonRight={"Hapus"}
                    proceed={() => {
                        deleteExpense(state.selectedExpense[0]);
                    }}
                    handleClose={handleCloseConfirmation}
                />
            )}
        </>
    );
};

export default Expense;
