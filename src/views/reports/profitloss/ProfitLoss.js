/* eslint-disable react-hooks/exhaustive-deps */
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CSpinner,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHeaderCell,
    CTableRow,
    CTooltip,
} from "@coreui/react";
import { cilPrint, cilSearch } from "@coreui/icons";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import DownloadExcel from "./DownloadExcel";
import DownloadPdf from "./DownloadPdf";
import { post } from "src/network/api/network";
import StatusAlert from "src/helper/StatusAlert";
import { getToday, getPriorMonths } from "src/helper/generate_date";

const ProfitLoss = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            startDate: getPriorMonths(1),
            endDate: getToday(),
        },
        mode: "all",
    });

    const [state, setState] = useState({
        data: null,
        isReload: null,
        filename: `Laporan Laba Rugi ${getPriorMonths(3)} - ${getToday()}`,
        loading: false,
        disabled: true,
        showAlert: false,
        alertType: null,
        alertContent: "",
    });

    const closeAlert = () => {
        setState((prevState) => ({
            ...prevState,
            showAlert: false,
        }));
    };

    const onSubmit = async ({ data }) => {
        getProfitLoss(data);
    };

    const getProfitLoss = async (data) => {
        const response = await post("/report/profit-loss", data);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                disabled: false,
                showAlert: true,
                alertType: "success",
                alertContent: response.data,
                filename: `Laporan Laba Rugi ${response.data?.startDate} - ${response.data?.endDate}`,
            }));
            setTimeout(() => {
                closeAlert();
            }, 2000);
        } else {
            // show error
            setState((prevState) => ({
                ...prevState,
                loading: false,
                disabled: false,
                showAlert: true,
                alertType: "danger",
                alertContent: response.data,
            }));
            setTimeout(() => {
                closeAlert();
            }, 2000);
        }
    };

    useEffect(() => {
        getProfitLoss({
            startDate: getPriorMonths(1),
            endDate: getToday(),
        });
    }, [state.isReload]);

    return (
        <>
            <CCard className="my-3">
                <CCardHeader>
                    <CRow className="align-items-center justify-content-around">
                        <CCol>
                            <h1>Laporan Laba Rugi</h1>
                        </CCol>
                        <CCol className="text-end">
                            <CTooltip content="Print">
                                <CButton
                                    className="me-2"
                                    onClick={() => {
                                        window.open(
                                            `/print/laba-rugi?startDate=${state.data?.startDate}&endDate=${state.data?.endDate}`,
                                            "_blank",
                                            "noopener,noreferrer",
                                        );
                                    }}
                                >
                                    <CIcon icon={cilPrint} />
                                </CButton>
                            </CTooltip>
                            <DownloadExcel data={state.data} filename={state.filename} />
                            <DownloadPdf data={state.data} filename={state.filename} />
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow className="mb-3">
                        <CCol md={6}>
                            <CForm onSubmit={handleSubmit(onSubmit)}>
                                <CInputGroup>
                                    <CInputGroupText>Periode</CInputGroupText>
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormInput
                                                type="date"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="endDate"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CFormInput
                                                type="date"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                            />
                                        )}
                                    />
                                    <CButton type="submit">
                                        <CIcon icon={cilSearch} />
                                    </CButton>
                                </CInputGroup>
                            </CForm>
                        </CCol>
                    </CRow>
                    <StatusAlert
                        showAlert={state.showAlert}
                        type={state.alertType}
                        content={state.alertContent}
                        closeAlert={closeAlert}
                    />
                    {state.data ? (
                        <CTable bordered id="profit-loss">
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2} className="h3 text-center">
                                        {state.filename}
                                    </CTableHeaderCell>
                                </CTableRow>
                                <CTableRow color="secondary">
                                    <CTableHeaderCell>Saldo Periode Sebelum</CTableHeaderCell>
                                    <CTableDataCell>
                                        <NumberFormat
                                            value={state?.data?.previousBalance}
                                            displayType="text"
                                            allowLeadingZeros={false}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow color="secondary">
                                    <CTableHeaderCell colSpan={2}>Pendapatan</CTableHeaderCell>
                                </CTableRow>
                                {state.data?.income?.list.map((value, index) => {
                                    return (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{value.name}</CTableDataCell>
                                            <CTableDataCell>
                                                <NumberFormat
                                                    value={value.nominal}
                                                    displayType="text"
                                                    allowLeadingZeros={false}
                                                    thousandSeparator={true}
                                                    prefix={"Rp"}
                                                />
                                            </CTableDataCell>
                                        </CTableRow>
                                    );
                                })}
                                <CTableRow>
                                    <CTableHeaderCell>Total</CTableHeaderCell>
                                    <CTableDataCell className="text-success">
                                        <NumberFormat
                                            value={state.data?.income?.total}
                                            displayType="text"
                                            allowLeadingZeros={false}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow color="secondary">
                                    <CTableHeaderCell colSpan={2}>Pengeluaran</CTableHeaderCell>
                                </CTableRow>

                                {state.data?.expense?.list.map((value, index) => {
                                    return (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{value.name}</CTableDataCell>
                                            <CTableDataCell>
                                                <NumberFormat
                                                    value={value.nominal}
                                                    displayType="text"
                                                    allowLeadingZeros={false}
                                                    thousandSeparator={true}
                                                    prefix={"Rp"}
                                                />
                                            </CTableDataCell>
                                        </CTableRow>
                                    );
                                })}

                                <CTableRow>
                                    <CTableHeaderCell>Total</CTableHeaderCell>
                                    <CTableDataCell className="text-danger">
                                        <NumberFormat
                                            value={state.data?.expense?.total}
                                            displayType="text"
                                            allowLeadingZeros={false}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow color="dark">
                                    <CTableHeaderCell>Total Laba Rugi</CTableHeaderCell>
                                    <CTableHeaderCell className="text-success">
                                        <NumberFormat
                                            value={state.data?.profitLoss}
                                            displayType="text"
                                            allowLeadingZeros={false}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        />
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    ) : (
                        <CSpinner className="me-2" size="sm" hidden={!state.loading}></CSpinner>
                    )}
                </CCardBody>
            </CCard>
        </>
    );
};

export default ProfitLoss;
