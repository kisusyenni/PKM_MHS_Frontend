/* eslint-disable react/prop-types */
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CButton, CImage } from "@coreui/react";
import pdfIcon from "src/assets/images/pdf.png";
import NumberFormat from "react-number-format";
import currency from "currency.js";

const DownloadPdf = ({ filename, data }) => {
    const doc = new jsPDF();
    const renderCurrency = (value) => {
        console.log(value);
        let nominal = value;
        <NumberFormat
            value={value}
            displayType="text"
            allowLeadingZeros={false}
            thousandSeparator={true}
            prefix={"Rp"}
            onValueChange={(values) => {
                const { formattedValue } = values;
                console.log(formattedValue);
                nominal = formattedValue;
            }}
        />;
        console.log(nominal);
        return nominal;
    };

    const IDR = (value) => currency(value, { symbol: "Rp", decimal: ",", separator: "." });

    console.log(renderCurrency(1000000));

    autoTable(doc, {
        body: [
            [
                {
                    content: filename,
                    colSpan: 2,
                    styles: { halign: "center", fontStyle: "bold" },
                },
            ],
            [
                {
                    content: "Saldo Periode Sebelum",
                    styles: { halign: "center", fontStyle: "bold" },
                },
                {
                    content: IDR(data?.previousBalance),
                },
            ],
        ],
    });
    const savePdf = () => {
        // autoTable(doc, { html: "#balance-sheet" });
        // autoTable(doc, {
        //     columnStyles: { europe: { halign: "center" } }, // European countries centered
        //     body: [
        //         { europe: "Sweden", america: "Canada", asia: "China" },
        //         { europe: "Norway", america: "Mexico", asia: "Japan" },
        //     ],
        //     columns: [
        //         { header: "Europe", dataKey: "europe" },
        //         { header: "Asia", dataKey: "asia" },
        //     ],
        // });
        doc.save(`${filename}.pdf`);
    };
    return (
        <>
            <CButton className="text-center" onClick={savePdf}>
                <CImage width={20} src={pdfIcon} />
                <small className="ms-2">Download PDF</small>
            </CButton>
        </>
    );
};

export default DownloadPdf;
