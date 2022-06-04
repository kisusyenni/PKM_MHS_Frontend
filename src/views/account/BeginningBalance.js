import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { accTblCols, accTblOpts } from "src/helper/AccountTable";
import StatusAlert from "src/helper/StatusAlert";
import { get } from "src/network/api/network";
import { Controller, useForm } from "react-hook-form";
import { CButton, CForm, CFormInput } from "@coreui/react";
import BeginningBalanceForm from "./BeginningBalanceForm";
import CIcon from "@coreui/icons-react";
import { cilPen, cilSave } from "@coreui/icons";

const BeginningBalance = () => {
    /**
     * NOTES
     * Butuh get account yang details saja
     * Total nominal input
     * Api untuk post/get
     */

    const title = "Saldo Awal";

    // Edit / Save Beginning Balance Action

    const actionButton = () => {
        setState((prevState) => ({
            ...prevState,
            onEdit: !state.onEdit,
        }));

        console.log(!state.onEdit);
    };
    let initCols = accTblCols.concat([
        {
            name: "debit",
            label: "Debit",
            options: {
                sort: false,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return tablemeta.rowData[5] ? (
                        <></>
                    ) : (
                        <>
                            <BeginningBalanceForm data={tablemeta.rowData} />
                        </>
                    );
                },
            },
        },
        {
            name: "kredit",
            label: "Kredit",
            options: {
                sort: false,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return tablemeta.rowData[5] ? (
                        <></>
                    ) : (
                        <>
                            <BeginningBalanceForm data={tablemeta.rowData} />
                        </>
                    );
                },
            },
        },
    ]);

    let initOptions = accTblOpts;

    initOptions.customToolbar = () => (
        <>
            <CButton color="secondary" onClick={() => actionButton()}>
                <CIcon icon={state.onEdit ? cilSave : cilPen} />
                <span className="ms-2">{state.onEdit ? "Save" : "Edit"}</span>
            </CButton>
        </>
    );

    const [state, setState] = useState({
        showAlert: false,
        alertContent: null,
        alertType: null,
        isReload: null,
        accountData: [],
        initCols: initCols,
        initOptions: initOptions,
        onEdit: false,
    });

    useEffect(() => {
        getBeginningBalance();
    }, [state.isReload]);

    useEffect(() => {}, [state.initOptions]);

    // Get account
    const getBeginningBalance = async () => {
        const result = await get("/account");
        if (result.status === 200) {
            setState((prevState) => ({
                ...prevState,
                accountData: result.data,
            }));
        }
    };

    // Handle alert

    const handleShowAlert = (type, content) => {
        setState((prevState) => ({
            ...prevState,
            showAlert: true,
            alertContent: content,
            alertType: type,
            isReload: Math.random(),
        }));

        setTimeout(() => handleCloseAlert(), 3000);
    };

    const handleCloseAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
            alertContent: null,
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
        </>
    );
};

export default BeginningBalance;
