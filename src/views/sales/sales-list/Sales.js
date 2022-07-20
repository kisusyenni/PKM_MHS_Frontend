import React, { useEffect, useState } from "react";
import { CButton, CCol, CImage, CNav, CNavItem, CNavLink, CRow, CTabContent } from "@coreui/react";
import SalesTable from "./SalesTable";
import { get } from "src/network/api/network";
import { useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import emptyGraphic from "src/assets/images/empty.svg";

const Sales = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        activeKey: 1,
        data: [],
        originalData: [],
        total: 0,
        title: "Penjualan - MHS SOFT",
    });

    useEffect(() => {
        document.title = state.title || "";
    }, [state.title]);

    const getSalesList = async () => {
        const response = await get("/sales");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
                originalData: response.data,
                total: response.data.length,
            }));
        }
    };

    useEffect(() => {
        switch (state.activeKey) {
            case 1:
                const allData = state.originalData;
                setState((prevState) => ({
                    ...prevState,
                    data: allData,
                }));
                break;

            case 2:
                const unpaidSales = state.originalData.filter((item) => item.status === 1);
                setState((prevState) => ({
                    ...prevState,
                    data: unpaidSales,
                }));
                break;

            case 3:
                const halfPaidSales = state.originalData.filter((item) => item.status === 2);
                setState((prevState) => ({
                    ...prevState,
                    data: halfPaidSales,
                }));
                break;

            case 4:
                const dueDateSales = state.originalData.filter(
                    (item) => item.status === 1 || item.status === 2,
                );
                setState((prevState) => ({
                    ...prevState,
                    data: dueDateSales,
                }));
                break;

            case 5:
                const paidSales = state.originalData.filter((item) => item.status === 3);
                setState((prevState) => ({
                    ...prevState,
                    data: paidSales,
                }));
                break;

            default:
                break;
        }
    }, [state.activeKey, state.isReload]);

    useEffect(() => {
        getSalesList();
    }, [state.isReload]);

    return (
        <>
            {state.total > 0 ? (
                <>
                    <CNav variant="pills" role="tablist">
                        <CNavItem>
                            <CNavLink
                                type="button"
                                className="pointer"
                                href={undefined}
                                active={state.activeKey === 1}
                                onClick={() =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        activeKey: 1,
                                    }))
                                }
                            >
                                Semua
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink
                                type="button"
                                href={undefined}
                                active={state.activeKey === 2}
                                onClick={() =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        activeKey: 2,
                                    }))
                                }
                            >
                                Belum Dibayar
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink
                                type="button"
                                href={undefined}
                                active={state.activeKey === 3}
                                onClick={() =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        activeKey: 3,
                                    }))
                                }
                            >
                                Dibayar Sebagian
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink
                                type="button"
                                href={undefined}
                                active={state.activeKey === 4}
                                onClick={() =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        activeKey: 4,
                                    }))
                                }
                            >
                                Jatuh Tempo
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink
                                type="button"
                                href={undefined}
                                active={state.activeKey === 5}
                                onClick={() =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        activeKey: 5,
                                    }))
                                }
                            >
                                Lunas
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                    <CTabContent>
                        <SalesTable data={state.data} />
                    </CTabContent>
                </>
            ) : (
                <CRow className="align-items-center justify-content-center">
                    <CCol md={7} className="text-center">
                        <h1 className="h3">Belum ada data penjualan</h1>
                        <div>
                            <CButton
                                className="mb-5 mt-3"
                                onClick={() => {
                                    navigate("/penjualan/tambah");
                                }}
                            >
                                <CIcon className="me-2" icon={cilPlus} /> Tambah Penjualan
                            </CButton>
                        </div>

                        <CImage className="w-100" src={emptyGraphic} height={200} />
                    </CCol>
                </CRow>
            )}
        </>
    );
};

export default Sales;
