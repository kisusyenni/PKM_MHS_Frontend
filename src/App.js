import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import "./scss/style.scss";

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const PrintPurchase = React.lazy(() => import("./views/pages/print/PrintPurchase"));
const PrintSales = React.lazy(() => import("./views/pages/print/PrintSales"));
const PrintProfitLoss = React.lazy(() => import("./views/pages/print/PrintProfitLoss"));
const SetupStore = React.lazy(() => import("./views/store/SetupStore"));

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={loading}>
                    <Routes>
                        <Route exact path="/login" name="Login Page" element={<Login />} />
                        <Route exact path="/register" name="Register Page" element={<Register />} />
                        <Route exact path="/404" name="Page 404" element={<Page404 />} />
                        <Route exact path="/500" name="Page 500" element={<Page500 />} />
                        <Route
                            exact
                            path="/print/pembelian/:id"
                            name="Print Pembelian"
                            element={<PrintPurchase />}
                        />
                        <Route
                            exact
                            path="/print/penjualan/:id"
                            name="Print Penjualan"
                            element={<PrintSales />}
                        />
                        <Route
                            exact
                            path="/print/laba-rugi"
                            name="Print Laporan Laba Rugi"
                            element={<PrintProfitLoss />}
                        />
                        {/* <Route
                            exact
                            path="/print/stock-opname"
                            name="Print Stock Opname"
                            element={<PrintProfitLoss />}
                        /> */}
                        <Route exact path="/atur-toko" name="Atur Toko" element={<SetupStore />} />
                        <Route path="*" element={<RequireAuth />}>
                            <Route path="*" name="Home" element={<DefaultLayout />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        );
    }
}

export default App;
