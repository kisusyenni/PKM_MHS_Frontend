import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CLink,
    CProgress,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip,
} from "@coreui/react";
import React from "react";

const OutOfStockTable = () => {
    const data = [
        {
            name: "Barang 02",
            total: 0,
        },
        {
            name: "Barang 05",
            total: 1,
        },
        {
            name: "Barang 07",
            total: 3,
        },
        {
            name: "Barang 01",
            total: 5,
        },
        {
            name: "Barang 11",
            total: 9,
        },
    ];
    return (
        <>
            <CCard className="mb-4">
                <CCardHeader>Persediaan Inventaris akan/telah Habis </CCardHeader>
                <CCardBody>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead color="light">
                            <CTableRow>
                                <CTableHeaderCell className="text-center">
                                    <small>Inventaris</small>
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                    <small>Stok</small>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {data.map((item, index) => (
                                <CTableRow v-for="item in tableItems" key={index}>
                                    <CTableDataCell className="text-center">
                                        {item.name}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div className="clearfix">
                                            <div className="float-start">
                                                <strong>{item.total}</strong>
                                                <small>/10</small>
                                            </div>
                                        </div>
                                        <CProgress
                                            thin
                                            color="primary"
                                            value={(item.total / 10) * 100}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CTooltip content="Pembelian Stok">
                                            <CLink
                                                type="button"
                                                color="info"
                                                size="sm"
                                                variant="ghost"
                                                href={`/pembelian/tambah`}
                                            >
                                                <CIcon icon={cilPlus} />
                                            </CLink>
                                        </CTooltip>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </>
    );
};

export default OutOfStockTable;
