import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CImage, CNav, CNavItem, CNavLink, CRow, CTabContent } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "src/network/api/network";
import PurchaseTable from "./PurchaseTable";
import emptyGraphic from "src/assets/images/empty.svg";

const Purchase = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        activeKey: 1,
        data: [],
    });

    const getPurchaseList = async () => {
        const response = await get("/purchase");
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
    };

    useEffect(() => {
        switch (state.activeKey) {
            case 1:
                console.log("semua");
                getPurchaseList();
                break;

            case 2:
                console.log("belum dibayar");
                break;

            case 3:
                console.log("dibayar sebagian");
                break;

            case 4:
                console.log("jatuh tempo");
                break;

            case 5:
                console.log("lunas");
                break;

            default:
                break;
        }
    }, [state.activeKey, state.isReload]);

    return (
        <>
            {state.data.length > 0 ? (
                <>
                    <CNav variant="pills" role="tablist">
                        <CNavItem>
                            <CNavLink
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
                        <PurchaseTable data={state.data} />
                    </CTabContent>
                </>
            ) : (
                <CRow className="align-items-center justify-content-center">
                    <CCol md={7} className="text-center">
                        <h1 className="h3">Belum ada data pembelian</h1>
                        <div>
                            <CButton
                                className="mb-5 mt-3"
                                onClick={() => {
                                    navigate("/pembelian/tambah");
                                }}
                            >
                                <CIcon className="me-2" icon={cilPlus} /> Tambah Pembelian
                            </CButton>
                        </div>

                        <CImage className="w-100" src={emptyGraphic} height={200} />
                    </CCol>
                </CRow>
            )}
        </>
    );
};

export default Purchase;
