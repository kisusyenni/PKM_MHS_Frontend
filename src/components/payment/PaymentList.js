/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import NumberFormat from "react-number-format";
import { get } from "src/network/api/network";

const PaymentList = ({ type, id }) => {
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
            name: "tbl_payment_method",
            label: "Metode",
            options: {
                sort: true,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return value?.name;
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
        data: [],
        isReload: null,
        columns: tableCols,
        options: tableOptions,
    });

    const getPaymentList = async () => {
        const response = await get(`/${type}/payment/${id}`);
        if (response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
            }));
        }
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
