import { CNav, CNavItem, CNavLink, CTabContent } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { get } from "src/network/api/network";
import PurchaseTable from "./PurchaseTable";

const Purchase = () => {
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
    );
};

export default Purchase;
