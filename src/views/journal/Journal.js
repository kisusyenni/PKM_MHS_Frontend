import React from "react";
import MUIDataTable from "mui-datatables";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { useNavigate } from "react-router-dom";

const Journal = () => {
    const title = "Jurnal Umum";
    const navigate = useNavigate();
    const journalList = {
        startDate: "",
        endDate: "",
        data: [
            {
                trans_id: "1",
                created_at: "05/05/2022",
                ref_no: "INV/00029",
                memo: "Tagihan Penjualan",
                total_credit: 398.0,
                total_debit: 398000,
                journals: [
                    {
                        account_id: 1,
                        account_name: "Pendapatan",
                        account_ref_code: "4-40000",
                        credit: 398000,
                        desc: "Perum Adriansyah Nuraini Persero Tbk Maida Cinthia Padmasari Purnawati Moslem Green Shirt Ukuran S",
                    },
                    {
                        account_id: 1,
                        account_name: "Piutang Usaha",
                        account_ref_code: "1-10100",
                        debit: 398000,
                        desc: "Perum Adriansyah Nuraini Persero Tbk Maida Cinthia Padmasari Purnawati Moslem Green Shirt Ukuran S",
                    },
                ],
            },
        ],
    };

    const journalTableCols = [
        {
            name: "transId",
            label: "transId",
            options: {
                filter: false,
                sort: false,
            },
        },
    ];

    const journalTableOptions = {
        selectableRows: "single",
        selectableRowsHideCheckboxes: true,
        elevation: 1,
        download: false,
        print: false,
        viewColumns: false,
        sort: true,
        customToolbar: () => (
            <>
                <CButton
                    onClick={() => {
                        navigate("/jurnal/tambah");
                    }}
                >
                    <CIcon className="me-2" icon={cilPlus} /> Input Jurnal
                </CButton>
            </>
        ),
    };
    return (
        <MUIDataTable
            title={title}
            data={journalList.data}
            columns={journalTableCols}
            options={journalTableOptions}
        />
    );
};

export default Journal;
