/* eslint-disable react/prop-types */
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CButton, CImage, CTooltip } from "@coreui/react";
import pdfIcon from "src/assets/images/pdf.png";

const DownloadPdf = ({ filename, data }) => {
    const doc = new jsPDF();
    if (data) {
        const renderCurrency = (value) => {
            let rupiahIDLocale = Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 20,
            });

            return rupiahIDLocale.format(value);
        };

        const income = data.income?.list.map((value) => [
            {
                content: value.name,
            },
            {
                content: renderCurrency(value.nominal),
                colSpan: 2,
            },
        ]);
        const expense = data.expense?.list.map((value) => [
            {
                content: value.name,
            },
            {
                content: renderCurrency(value.nominal),
                colSpan: 2,
            },
        ]);

        const formattedBody = () => {
            const body = [
                [
                    {
                        content: filename,
                        colSpan: 3,
                        styles: { halign: "center", fontStyle: "bold", fontSize: 18 },
                    },
                ],
                [
                    {
                        content: "Periode",
                        styles: { fontStyle: "bold" },
                    },
                    {
                        content: data?.startDate,
                    },
                    {
                        content: data?.endDate,
                    },
                ],
                [
                    {
                        content: "Saldo Sebelumnya",
                        styles: { fontStyle: "bold" },
                    },
                    {
                        content: renderCurrency(data?.previousBalance),
                        colSpan: 2,
                    },
                ],
                [
                    {
                        content: "Pendapatan",
                        colSpan: 3,
                        styles: { fontStyle: "bold", fontSize: 14 },
                    },
                ],
            ];
            const formatBody = body.concat(
                income,
                [
                    [
                        {
                            content: "Total",
                            styles: { fontStyle: "bold" },
                        },
                        {
                            content: renderCurrency(data?.income?.total),
                            colSpan: 2,
                            styles: { fontStyle: "bold", textColor: [32, 201, 151] },
                        },
                    ],
                    [
                        {
                            content: "Pengeluaran",
                            colSpan: 3,
                            styles: { fontStyle: "bold", fontSize: 14 },
                        },
                    ],
                ],
                expense,
                [
                    [
                        {
                            content: "Total",
                            styles: { fontStyle: "bold" },
                        },
                        {
                            content: renderCurrency(data?.expense?.total),
                            colSpan: 2,
                            styles: { fontStyle: "bold", textColor: [237, 0, 10] },
                        },
                    ],
                    [
                        {
                            content: "Laba Rugi",
                            styles: { fontStyle: "bold", fontSize: 16 },
                        },
                        {
                            content: renderCurrency(data?.profitLoss),
                            colSpan: 2,
                            styles: {
                                fontStyle: "bold",
                                fontSize: 16,
                                textColor: data?.profitLoss > 0 ? [32, 201, 151] : [237, 0, 10],
                            },
                        },
                    ],
                ],
            );
            return formatBody;
        };
        autoTable(doc, {
            body: formattedBody(),
        });
    }
    const savePdf = () => {
        doc.save(`${filename}.pdf`);
    };
    return (
        <>
            <CTooltip content="Unduh ke PDF">
                <CButton onClick={savePdf}>
                    <CImage width={20} src={pdfIcon} />
                </CButton>
            </CTooltip>
        </>
    );
};

export default DownloadPdf;
