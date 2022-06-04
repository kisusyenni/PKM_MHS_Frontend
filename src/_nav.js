import React from "react";
import CIcon from "@coreui/icons-react";
import {
    cilBook,
    cilCart,
    cilFolder,
    cilList,
    cilMoney,
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
        component: CNavItem,
        name: "Akun",
        to: "/akun",
        icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
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
                to: "/penjualan/daftar",
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
                to: "/pembelian/daftar",
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
        name: "Inventaris",
        to: "/inventaris",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: "Daftar Inventaris",
                to: "/inventaris/daftar",
            },
            {
                component: CNavItem,
                name: "Tambah Inventaris",
                to: "/inventaris/tambah",
            },
            {
                component: CNavItem,
                name: "Daftar Kategori",
                to: "/inventaris/kategori",
            },
        ],
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
