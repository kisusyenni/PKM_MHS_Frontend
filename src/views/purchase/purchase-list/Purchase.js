import { CCard, CCardBody, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
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
                    id: 371,
                    ref_number: "PI/00045",
                    supplier_id: 44,
                    trans_date: "2022-05-05",
                    due_date: "2022-05-16",
                    status_id: 1,
                    due: 807000,
                    amount_after_tax: 807000,
                    memo: "",
                    currency_rate: 1,
                    currency_id: 0,
                    supplier: {
                        id: 44,
                        name: "Laila Lestari Haryanto",
                        email: "lantar04@gmail.com",
                        phone: "624547586824",
                        company: "UD Nainggolan",
                        address: "Kpg. Merdeka No. 815, Magelang 97621, Kalbar",
                        country_id: null,
                        province_id: null,
                        city_id: null,
                        finance_contact_emails: [],
                    },
                },
                {
                    id: 406,
                    ref_number: "PI/00056",
                    supplier_id: 7,
                    trans_date: "2022-05-04",
                    due_date: "2022-05-17",
                    status_id: 3,
                    due: 0,
                    amount_after_tax: 2392000,
                    memo: "",
                    currency_rate: 1,
                    currency_id: 0,
                    supplier: {
                        id: 7,
                        name: "Hesti Pratiwi Kusumo",
                        email: "mwahyuni@mandala.web.id",
                        phone: "626571030831",
                        company: "UD Puspita Siregar (Persero) Tbk",
                        address: "Kpg. Dago No. 729, Yogyakarta 11828, Sumut",
                        country_id: null,
                        province_id: null,
                        city_id: null,
                        finance_contact_emails: [],
                    },
                    tags: [],
                },
                {
                    id: 348,
                    ref_number: "PI/00043",
                    supplier_id: 12,
                    trans_date: "2022-05-03",
                    due_date: "2022-05-09",
                    status_id: 2,
                    due: 10780,
                    amount_after_tax: 585780,
                    memo: "",
                    currency_rate: 1,
                    currency_id: 0,
                    supplier: {
                        id: 12,
                        name: "Carla Nurdiyanti Putra",
                        email: "keisha.wacana@yahoo.com",
                        phone: "622111660276",
                        company: "PD Hakim Tbk",
                        address: "Ki. Baja No. 452, Semarang 31164, Pabar",
                        country_id: null,
                        province_id: null,
                        city_id: null,
                        finance_contact_emails: [],
                    },
                    tags: [],
                },
            ],
        },
        activeKey: 1,
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
