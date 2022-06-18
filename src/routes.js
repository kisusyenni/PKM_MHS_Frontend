import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const EditStore = React.lazy(() => import("./views/store/EditStore"));
const Report = React.lazy(() => import("./views/reports/Report"));
const Inventory = React.lazy(() => import("./views/inventory/Inventory"));
const AddInventory = React.lazy(() => import("./views/inventory/AddInventory"));
const EditInventory = React.lazy(() => import("./views/inventory/EditInventory"));
const Supplier = React.lazy(() => import("./views/supplier/Supplier"));
const Purchase = React.lazy(() => import("./views/purchase/purchase-list/Purchase"));
const PurchaseDetail = React.lazy(() => import("./views/purchase/purchase-detail/PurchaseDetail"));
const AddPurchase = React.lazy(() => import("./views/purchase/purchase-form/AddPurchase"));
const Expense = React.lazy(() => import("./views/expense/Expense"));
const AddExpense = React.lazy(() => import("./views/expense/AddExpense"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/edit-toko", name: "Edit Toko", element: EditStore },
    { path: "/laporan", name: "Laporan", element: Report },
    { path: "/inventaris", name: "Inventaris", element: Inventory },
    { path: "/inventaris/tambah", name: "Tambah Inventaris", element: AddInventory },
    { path: "/inventaris/ubah/:id", name: "Ubah Inventaris", element: EditInventory },
    { path: "/supplier", name: "Supplier", element: Supplier },
    { path: "/pembelian", name: "Pembelian", element: Purchase },
    { path: "/pembelian/:id", name: "Detail Pembelian", element: PurchaseDetail },
    { path: "/pembelian/tambah", name: "Tambah Pembelian", element: AddPurchase },
    { path: "/pengeluaran", name: "Pengeluaran", element: Expense },
    { path: "/pengeluaran/tambah", name: "Tambah Pengeluaran", element: AddExpense },
];

export default routes;
