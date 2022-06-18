/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import NumberFormat from "react-number-format";

const PaymentList = ({ type, status }) => {
    const tableCols = [
        {
            name: "purchasePaymentId",
            options: {
                display: false,
                filter: false,
                sort: false,
            },
        },
        {
            name: "purchaseId",
            options: {
                display: false,
                filter: false,
                sort: false,
            },
        },
        {
            name: "date",
            label: "Tanggal Pembayaran",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "code",
            label: "Nomor Pembayaran",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },

        {
            name: "nominal",
            label: "Jumlah",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return (
                        <NumberFormat
                            value={value}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp"}
                        />
                    );
                },
            },
        },
        {
            name: "methodId",
            label: "Metode",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    switch (value) {
                        case 1:
                            return "Cash";

                        case 2:
                            return "Kartu Debit";

                        case 3:
                            return "Kartu Kredit";

                        case 4:
                            return "E-money/Qris";

                        default:
                            return "Tidak tercatat";
                    }
                },
            },
        },
    ];

    const tableOptions = {
        selectableRows: "single",
        selectableRowsHideCheckboxes: true,
        elevation: 1,
        download: false,
        print: false,
        viewColumns: false,
        sort: true,
        filter: false,
    };

    const [state, setState] = useState({
        data: [
            {
                purchasePaymentId: "1",
                purchaseId: "1",
                methodId: 1,
                date: "6/16/2022",
                code: "PY001",
                nominal: 100000,
            },
        ],
        isReload: null,
        columns: tableCols,
        options: tableOptions,
    });

    const getPaymentList = () => {
        console.log(type);
    };

    useEffect(() => {
        getPaymentList();
    }, [state.isReload]);

    return (
        <>
            <MUIDataTable
                title={"Transaksi"}
                data={state.data}
                columns={tableCols}
                options={tableOptions}
            />
        </>
    );
};

export default PaymentList;
