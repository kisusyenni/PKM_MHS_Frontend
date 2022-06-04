/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { accTblCols, accTblOpts } from "src/helper/AccountTable";
import MUIDataTable from "mui-datatables";
import { CButton, CModal, CModalBody, CModalHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCheck } from "@coreui/icons";
import { get } from "src/network/api/network";

const AccountModal = ({ openModal, handleClose, selectAccount, selectedAccount }) => {
    const title = "Daftar Akun";

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
                            {selectedAccount
                                ? selectedAccount[0] === tablemeta.rowData[0]
                                    ? "show"
                                    : "hide"
                                : ""}
                            <CButton
                                color="primary"
                                variant="outline"
                                className="me-2"
                                hidden={tablemeta.rowData[5]}
                                onClick={() => {
                                    setState((prevState) => ({
                                        ...prevState,
                                        selectedAccount: tablemeta.rowData,
                                    }));
                                    selectAccount(tablemeta.rowData);
                                    handleClose();
                                }}
                            >
                                <CIcon icon={cilCheck}></CIcon>
                                Pilih
                            </CButton>
                        </>
                    );
                },
            },
        },
    ]);

    let initOptions = accTblOpts;

    const [state, setState] = useState({
        isReload: null,
        accountData: [],
        initCols: initCols,
        initOptions: initOptions,
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

    return (
        <>
            <CModal size="xl" className="show" keyboard={false} portal={false} visible={openModal}>
                <CModalHeader closeButton={false}>
                    <CButton
                        className="btn btn-close"
                        onClick={handleClose}
                        aria-label="close"
                    ></CButton>
                </CModalHeader>
                <CModalBody>
                    <MUIDataTable
                        title={title}
                        data={state.accountData}
                        columns={state.initCols}
                        options={state.initOptions}
                    />
                </CModalBody>
            </CModal>
        </>
    );
};

export default AccountModal;
