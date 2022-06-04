import React, { useEffect, useState } from "react";
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBook, cilPen, cilPlus, cilSettings, cilTrash } from "@coreui/icons";
import MUIDataTable from "mui-datatables";
import { deleteData, get } from "src/network/api/network";
import ConfirmationModal from "src/helper/ConfirmationModal";
import StatusAlert from "src/helper/StatusAlert";
import AccountForm from "./AccountForm";
import { accTblCols, accTblOpts } from "src/helper/AccountTable";

const Account = () => {
    const title = "Daftar Perkiraan";

    let initCols = accTblCols.concat([
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
                                hidden={!tablemeta.rowData[6]}
                                onClick={() => {
                                    handleEdit(tablemeta.rowData);
                                }}
                            >
                                <CIcon icon={cilPen}></CIcon>
                            </CButton>
                            <CButton
                                color="primary"
                                variant="outline"
                                hidden={!tablemeta.rowData[6]}
                                onClick={() => {
                                    handleDelete(tablemeta.rowData);
                                }}
                            >
                                <CIcon icon={cilTrash}></CIcon>
                            </CButton>
                        </>
                    );
                },
            },
        },
    ]);

    let initOptions = accTblOpts;

    initOptions.customToolbar = () => (
        <>
            <CDropdown>
                <CDropdownToggle color="secondary">
                    <CIcon className="me-2" icon={cilSettings} />
                    Pengaturan
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem onClick={handleAdd}>
                        <CIcon className="me-2" icon={cilPlus} /> Tambah Akun
                    </CDropdownItem>
                    <CDropdownItem href="/akun/saldo-awal">
                        <CIcon className="me-2" icon={cilBook} /> Atur Saldo Awal
                    </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        </>
    );

    const [state, setState] = useState({
        openForm: false,
        openModal: false,
        showAlert: false,
        alertContent: null,
        alertType: null,
        action: null,
        isReload: null,
        accountData: [],
        initCols: initCols,
        initOptions: initOptions,
        selectedAccount: null,
    });

    useEffect(() => {
        getAccountData();
    }, [state.isReload]);

    // Get account
    const getAccountData = async () => {
        const result = await get("/account");
        if (result.status === 200) {
            setState((prevState) => ({
                ...prevState,
                accountData: result.data,
            }));
        }
    };

    // Handle Form Function

    const handleEdit = (account) => {
        console.log(account);
        setState((prevState) => ({
            ...prevState,
            openForm: true,
            action: "edit",
            selectedAccount: account,
        }));
    };

    const handleAdd = () => {
        setState((prevState) => ({
            ...prevState,
            openForm: true,
            action: "add",
        }));
    };

    const handleCloseForm = () => {
        setState((prevState) => ({
            ...prevState,
            openForm: false,
            openModal: false,
            action: null,
            selectedAccount: null,
        }));
    };

    // Handle delete account

    const handleDelete = (account) => {
        if (account[5]) {
            setState((prevState) => ({
                ...prevState,
                openModal: true,
                selectedAccount: account,
            }));
        } else {
            handleShowAlert("danger", "Data akun tidak bisa dihapus");
        }
    };

    const deleteAccount = async (id) => {
        const response = await deleteData("/account", id);
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
                data={state.accountData}
                columns={state.initCols}
                options={state.initOptions}
            />

            {/* Add and Edit Account Modal Form */}

            {state.openForm ? (
                <AccountForm
                    action={state.action}
                    openForm={state.openForm}
                    handleClose={handleCloseForm}
                    data={state.selectedAccount}
                    handleAlert={handleShowAlert}
                />
            ) : (
                <></>
            )}

            {/* Delete confirmation modal */}

            {state.openModal ? (
                <ConfirmationModal
                    openModal={state.openModal}
                    title={"Hapus Akun"}
                    content={`Apakah Anda yakin ingin menghapus ${state.selectedAccount[2]}?`}
                    type={"delete"}
                    buttonLeft={"Cancel"}
                    buttonRight={"Hapus Akun"}
                    proceed={() => {
                        deleteAccount(state.selectedAccount[0]);
                    }}
                    handleClose={handleCloseForm}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default Account;
