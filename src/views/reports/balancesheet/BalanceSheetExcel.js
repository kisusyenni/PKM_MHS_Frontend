/* eslint-disable react/prop-types */
import { CButton, CImage } from "@coreui/react";
import React, { useCallback } from "react";
import * as XLSX from "xlsx-js-style";
import excelIcon from "./../../../assets/images/excel.png";

const BalanceSheetExcel = ({ data, filename }) => {
    const xport = useCallback(async () => {
        const income = data.income.list.map((value) => [value.name, "", value.nominal]);
        const expense = data.expense.list.map((value) => [value.name, "", value.nominal]);

        const format = [
            [
                {
                    v: filename,
                    t: "s",
                    s: {
                        alignment: { horizontal: "center" },
                        font: { sz: "18", bold: true },
                        fill: {
                            patternType: "solid",
                            fgColor: { rgb: "d8dbe0" },
                            bgColor: { rgb: "d8dbe0" },
                        },
                    },
                },
            ],
            ["Periode", data.startDate, data.endDate],
            ["Saldo Sebelumnya", "", data.previousBalance],
            [
                {
                    v: "Pendapatan",
                    t: "s",
                    s: {
                        alignment: { horizontal: "center" },
                        font: { sz: "12", bold: true },
                        fill: {
                            patternType: "solid",
                            fgColor: { rgb: "d8dbe0" },
                            bgColor: { rgb: "d8dbe0" },
                        },
                    },
                },
            ],
        ]
            .concat(income)
            .concat([
                [
                    {
                        v: "Total",
                        t: "s",
                        s: {
                            font: { bold: true },
                        },
                    },
                    "",
                    {
                        v: data.income.total,
                        t: "s",
                        s: {
                            font: { bold: true, color: { rgb: "20c997" } },
                        },
                    },
                ],
                [
                    {
                        v: "Pengeluaran",
                        t: "s",
                        s: {
                            alignment: { horizontal: "center" },
                            font: { sz: "12", bold: true },
                            fill: {
                                patternType: "solid",
                                fgColor: { rgb: "d8dbe0" },
                                bgColor: { rgb: "d8dbe0" },
                            },
                        },
                    },
                ],
            ])
            .concat(expense)
            .concat([
                [
                    {
                        v: "Total",
                        t: "s",
                        s: {
                            font: { bold: true },
                        },
                    },
                    "",
                    {
                        v: data.expense.total,
                        t: "s",
                        s: {
                            font: { bold: true, color: { rgb: "ed000a" } },
                        },
                    },
                ],
                [
                    {
                        v: "Laba Rugi",
                        t: "s",
                        s: {
                            font: { sz: "16", bold: true },
                            fill: {
                                patternType: "solid",
                                fgColor: { rgb: "d8dbe0" },
                                bgColor: { rgb: "d8dbe0" },
                            },
                        },
                    },
                    {
                        v: "",
                        t: "s",
                        s: {
                            fill: {
                                patternType: "solid",
                                fgColor: { rgb: "d8dbe0" },
                                bgColor: { rgb: "d8dbe0" },
                            },
                        },
                    },
                    {
                        v: data.profitLoss,
                        t: "s",
                        s: {
                            font: {
                                sz: "16",
                                bold: true,
                                color: { rgb: data.profitLoss > 0 ? "20c997" : "ed000a" },
                            },
                            fill: {
                                patternType: "solid",
                                fgColor: { rgb: "d8dbe0" },
                                bgColor: { rgb: "d8dbe0" },
                            },
                        },
                    },
                ],
            ]);
        const ws = XLSX.utils.aoa_to_sheet(format);
        ws["!cols"] = [{ wch: 40 }, { wch: 20 }, { wch: 20 }];
        const merge = [
            { s: { c: 0, r: 0 }, e: { c: 2, r: 0 } }, // filename
            { s: { c: 0, r: 3 }, e: { c: 2, r: 3 } }, // pendapatan
            { s: { c: 0, r: 6 }, e: { c: 2, r: 6 } }, // pengeluaran
        ];
        ws["!merges"] = merge;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Dates");

        XLSX.writeFile(wb, `${filename}.xlsx`);
    }, [data, filename]);

    return (
        <>
            {/* <ExcelFile
                element={
                }
                >
                <ExcelSheet dataSet={styledMultiDataSet} name="Organization" />
            </ExcelFile> */}
            <CButton className="me-4" onClick={xport}>
                <CImage className="me-2" src={excelIcon} />
                Download Excel
            </CButton>
        </>
    );
};

export default BalanceSheetExcel;
