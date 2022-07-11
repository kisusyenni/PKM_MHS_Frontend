import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const EditStore = React.lazy(() => import("./views/store/EditStore"));
const ProfitLoss = React.lazy(() => import("./views/reports/profitloss/ProfitLoss"));

const Supplier = React.lazy(() => import("./views/supplier/Supplier"));

const Inventory = React.lazy(() => import("./views/inventory/Inventory"));
const AddInventory = React.lazy(() => import("./views/inventory/AddInventory"));
const EditInventory = React.lazy(() => import("./views/inventory/EditInventory"));

const Purchase = React.lazy(() => import("./views/purchase/purchase-list/Purchase"));
const PurchaseDetail = React.lazy(() => import("./views/purchase/purchase-detail/PurchaseDetail"));
const AddPurchase = React.lazy(() => import("./views/purchase/purchase-form/AddPurchase"));

const Sales = React.lazy(() => import("./views/sales/sales-list/Sales"));
const SalesDetail = React.lazy(() => import("./views/sales/sales-detail/SalesDetail"));
const AddSales = React.lazy(() => import("./views/sales/sales-form/AddSales"));

const Expense = React.lazy(() => import("./views/expense/Expense"));
const AddExpense = React.lazy(() => import("./views/expense/AddExpense"));

const StockOpname = React.lazy(() => import("./views/stock-opname/StockOpname"));
const StockOpnameDetail = React.lazy(() => import("./views/stock-opname/StockOpnameDetail"));
const AddStockOpname = React.lazy(() =>
    import("./views/stock-opname/stock-opname-form/AddStockOpname"),
);

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/edit-toko", name: "Edit Toko", element: EditStore },
    { path: "/laporan/laba-rugi", name: "Laporan Laba Rugi", element: ProfitLoss },
    { path: "/supplier", name: "Supplier", element: Supplier },

    { path: "/inventaris", name: "Inventaris", element: Inventory },
    { path: "/inventaris/tambah", name: "Tambah Inventaris", element: AddInventory },
    { path: "/inventaris/ubah/:id", name: "Ubah Inventaris", element: EditInventory },

    { path: "/pembelian", name: "Pembelian", element: Purchase },
    { path: "/pembelian/:id", name: "Detail Pembelian", element: PurchaseDetail },
    { path: "/pembelian/tambah", name: "Tambah Pembelian", element: AddPurchase },

    { path: "/penjualan", name: "Penjualan", element: Sales },
    { path: "/penjualan/:id", name: "Detail Penjualan", element: SalesDetail },
    { path: "/penjualan/tambah", name: "Tambah Penjualan", element: AddSales },

    { path: "/pengeluaran", name: "Pengeluaran", element: Expense },
    { path: "/pengeluaran/tambah", name: "Tambah Pengeluaran", element: AddExpense },

    { path: "/stock-opname", name: "Stock Opname", element: StockOpname },
    { path: "/stock-opname/:id", name: "Detail Stock Opname", element: StockOpnameDetail },
    { path: "/stock-opname/tambah", name: "Tambah Stock Opname", element: AddStockOpname },
];

export default routes;
