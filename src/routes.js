import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Account = React.lazy(() => import("./views/account/Account"));
const EditStore = React.lazy(() => import("./views/store/EditStore"));
const BeginningBalance = React.lazy(() => import("./views/account/BeginningBalance"));
const Transaction = React.lazy(() => import("./views/transaction/Transaction"));
const Report = React.lazy(() => import("./views/reports/Report"));
const Journal = React.lazy(() => import("./views/journal/Journal"));
const AddJournal = React.lazy(() => import("./views/journal/AddJournal"));
const Supplier = React.lazy(() => import("./views/supplier/Supplier"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/akun", name: "Akun", element: Account },
    { path: "/edit-toko", name: "Edit Toko", element: EditStore },
    { path: "/akun/saldo-awal", name: "Saldo Awal", element: BeginningBalance },
    { path: "/transaksi", name: "Transaksi", element: Transaction },
    { path: "/laporan", name: "Laporan", element: Report },
    { path: "/jurnal", name: "Jurnal", element: Journal },
    { path: "/jurnal/tambah", name: "Tambah", element: AddJournal },
    { path: "/supplier", name: "Supplier", element: Supplier },
];

export default routes;
