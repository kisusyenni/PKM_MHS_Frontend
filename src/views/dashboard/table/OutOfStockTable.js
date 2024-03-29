/* eslint-disable react/prop-types */
import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CCardBody,
    CCardHeader,
    CImage,
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
import awesomeGraphic from "src/assets/images/awesome.svg";

const OutOfStockTable = ({ data }) => {
    return (
        <>
            <CCardHeader>Persediaan Inventaris akan/telah Habis </CCardHeader>
            {data && data.length > 0 ? (
                <>
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
                                                    <strong>{item.quantity}</strong>
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
                </>
            ) : (
                <>
                    <CCardBody className="text-center">
                        <div className="mb-3">
                            <CImage src={awesomeGraphic} height={100} />
                        </div>
                        <p>Stok inventaris masih tersedia</p>
                    </CCardBody>
                </>
            )}
        </>
    );
};

export default OutOfStockTable;
