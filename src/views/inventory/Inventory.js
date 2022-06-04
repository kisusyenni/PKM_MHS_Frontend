import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus, cilTrash } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";

const Inventory = () => {
    const [state, setState] = useState({
        data: [
            {
                id: 1,
                name: "Nama Inventaris",
                quantity: 10,
                sellingPrice: 15000,
            },
            {
                id: 2,
                name: "Nama Inventaris",
                quantity: 20,
                sellingPrice: 10000,
            },
        ],
    });

    const navigate = useNavigate();

    const tableCols = [
        {
            name: "id",
            label: "id",
            options: {
                display: false,
                filter: false,
                sort: false,
            },
        },
        {
            name: "name",
            label: "Nama",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "quantity",
            label: "Jumlah",
            options: {
                sort: true,
                filter: false,
                filterList: [],
            },
        },
        {
            name: "sellingPrice",
            label: "Harga Jual",
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
            name: "action",
            label: "Aksi",
            options: {
                sort: false,
                filter: false,
                filterList: [],
                customBodyRender: (value, tablemeta) => {
                    return (
                        <>
                            <CButton
                                color="primary"
                                variant="outline"
                                className="me-2"
                                onClick={() => {
                                    handleEdit(tablemeta.rowData[0]);
                                }}
                            >
                                <CIcon icon={cilPen}></CIcon>
                            </CButton>
                            <CButton
                                color="primary"
                                variant="outline"
                                onClick={() => {
                                    handleDelete(tablemeta.rowData[0]);
                                }}
                            >
                                <CIcon icon={cilTrash}></CIcon>
                            </CButton>
                        </>
                    );
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
        customToolbar: () => (
            <>
                <CButton
                    onClick={() => {
                        navigate("/inventaris/tambah");
                    }}
                >
                    <CIcon className="me-2" icon={cilPlus} /> Tambah Inventaris
                </CButton>
            </>
        ),
    };

    const handleEdit = (id) => {
        navigate(`/inventaris/ubah/${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete ${id}`);
    };

    return (
        <MUIDataTable
            title={"Daftar Inventaris"}
            data={state.data}
            columns={tableCols}
            options={tableOptions}
        />
    );
};

export default Inventory;
