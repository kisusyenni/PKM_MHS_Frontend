import { CNav, CNavItem, CNavLink, CTabContent } from "@coreui/react";
import React, { useEffect, useState } from "react";
import PurchaseTable from "./PurchaseTable";

const Purchase = () => {
    const [activeKey, setActiveKey] = useState(1);

    const all = [];

    const [state, setState] = useState({
        data: {
            total: 0,
            data: [
                {
                    purchaseId: 371,
                    refNumber: "PU00045",
                    supplierId: 44,
                    transDate: "2022-05-05",
                    dueDate: "2022-05-16",
                    status: 1,
                    totalPayment: 807000,
                    paidNominal: 0,
                    description: "",
                    supplier: {
                        supplierId: 44,
                        name: "Laila Lestari Haryanto",
                        address: "Kpg. Merdeka No. 815, Magelang 97621, Kalbar",
                        telephone: "624547586824",
                        email: "lantar04@gmail.com",
                    },
                },
                {
                    purchaseId: 406,
                    refNumber: "PI/00056",
                    supplierId: 7,
                    transDate: "2022-05-04",
                    dueDate: "2022-05-17",
                    status: 3,
                    totalPayment: 2392000,
                    paidNominal: 2392000,
                    description: "",
                    supplier: {
                        supplierId: 7,
                        name: "Hesti Pratiwi Kusumo",
                        email: "mwahyuni@mandala.web.id",
                        telephone: "626571030831",
                        address: "Kpg. Dago No. 729, Yogyakarta 11828, Sumut",
                    },
                },
                {
                    purchaseId: 348,
                    refNumber: "PI/00043",
                    supplierId: 12,
                    transDate: "2022-05-03",
                    dueDate: "2022-05-09",
                    status: 2,
                    totalPayment: 585780,
                    paidNominal: 10780,
                    description: "",
                    supplier: {
                        supplierId: 12,
                        name: "Carla Nurdiyanti Putra",
                        email: "keisha.wacana@yahoo.com",
                        telephone: "622111660276",
                        address: "Ki. Baja No. 452, Semarang 31164, Pabar",
                    },
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
                <PurchaseTable data={state.data.data} />
            </CTabContent>
        </>
    );
};

export default Purchase;
