import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import SalesTable from "./SalesTable";

const Sales = () => {
    const [activeKey, setActiveKey] = useState(1);

    const all = [];

    const [state, setState] = useState({
        data: {
            total: 0,
            data: [
                {
                    purchaseId: 371,
                    refNumber: "SA00045",
                    transDate: "2022-05-05",
                    dueDate: "2022-05-16",
                    status: 1,
                    totalPayment: 807000,
                    dueNominal: 807000,
                    discount: 0,
                },
                {
                    purchaseId: 406,
                    refNumber: "SA00056",
                    transDate: "2022-05-04",
                    dueDate: "2022-05-17",
                    status: 3,
                    totalPayment: 2392000,
                    dueNominal: 0,
                    discount: 0,
                },
                {
                    purchaseId: 348,
                    refNumber: "SA00043",
                    transDate: "2022-05-03",
                    dueDate: "2022-05-09",
                    status: 2,
                    totalPayment: 585780,
                    dueNominal: 100780,
                    discount: 0,
                },
            ],
        },
    });

    useEffect(() => {
        switch (activeKey) {
            case 1:
                console.log("semua");
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
    }, [activeKey]);

    return (
        <>
            <CNav variant="pills" role="tablist">
                <CNavItem>
                    <CNavLink
                        href={undefined}
                        active={activeKey === 1}
                        onClick={() => setActiveKey(1)}
                    >
                        Semua
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        href={undefined}
                        active={activeKey === 2}
                        onClick={() => setActiveKey(2)}
                    >
                        Belum Dibayar
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        href={undefined}
                        active={activeKey === 3}
                        onClick={() => setActiveKey(3)}
                    >
                        Dibayar Sebagian
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        href={undefined}
                        active={activeKey === 4}
                        onClick={() => setActiveKey(4)}
                    >
                        Jatuh Tempo
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        href={undefined}
                        active={activeKey === 5}
                        onClick={() => setActiveKey(5)}
                    >
                        Lunas
                    </CNavLink>
                </CNavItem>
            </CNav>
            <CTabContent>
                <SalesTable data={state.data.data} />
            </CTabContent>
        </>
    );
};

export default Sales;
