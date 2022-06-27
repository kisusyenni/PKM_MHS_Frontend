import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import SalesTable from "./SalesTable";
import { get } from "src/network/api/network";

const Sales = () => {
    const [activeKey, setActiveKey] = useState(1);

    const [state, setState] = useState({
        data: [],
        activeKey: 1,
    });

    const getSalesList = async () => {
        const response = await get("/sales");
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
                getSalesList();
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
                <SalesTable data={state.data} />
            </CTabContent>
        </>
    );
};

export default Sales;
