import React from "react";
import CIcon from "@coreui/icons-react";
import {
    cilBook,
    cilCart,
    cilFaceDead,
    cilList,
    cilMoney,
    cilShareBoxed,
    cilSpeedometer,
    cilTruck,
    cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
    {
        component: CNavItem,
        name: "Dashboard",
        to: "/dashboard",
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: "Transaksi",
    },
    {
        component: CNavGroup,
        name: "Inventaris",
        to: "/inventaris",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: "Daftar Inventaris",
                to: "/inventaris",
            },
            {
                component: CNavItem,
                name: "Tambah Inventaris",
                to: "/inventaris/tambah",
            },
        ],
    },
    {
        component: CNavGroup,
        name: "Penjualan",
        to: "/penjualan",
        icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: "Daftar Penjualan",
                to: "/penjualan",
            },
            {
                component: CNavItem,
                name: "Tambah Penjualan",
                to: "/penjualan/tambah",
            },
        ],
    },
    {
        component: CNavGroup,
        name: "Pembelian",
        to: "/pembelian",
        icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: "Daftar Pembelian",
                to: "/pembelian",
            },
            {
                component: CNavItem,
                name: "Tambah Pembelian",
                to: "/pembelian/tambah",
            },
        ],
    },
    {
        component: CNavGroup,
        name: "Pengeluaran",
        to: "/pengeluaran",
        icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: "Daftar Pengeluaran",
                to: "/pengeluaran",
            },
            {
                component: CNavItem,
                name: "Tambah Pengeluaran",
                to: "/pengeluaran/tambah",
            },
        ],
    },
    {
        component: CNavItem,
        name: "Stock Opname",
        to: "/stock-opname",
        icon: <CIcon icon={cilFaceDead} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: "Laporan",
    },

    {
        component: CNavItem,
        name: "Laporan",
        to: "/laporan",
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: "Kontak",
    },
    {
        component: CNavItem,
        name: "Supplier",
        to: "/supplier",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
];

export default _nav;
