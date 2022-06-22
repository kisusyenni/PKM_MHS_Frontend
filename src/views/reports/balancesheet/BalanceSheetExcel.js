/* eslint-disable react/prop-types */
import { CButton, CImage } from "@coreui/react";
import React from "react";
import ReactExport from "react-export-excel";
// import excel from "./../../assets/images/excel.png";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const BalanceSheetExcel = ({ data, filename }) => {
    const multiDataSet = [
        {
            columns: ["Name", "Salary", "Sex"],
            data: [
                ["Johnson", 30000, "Male"],
                ["Monika", 355000, "Female"],
                ["Konstantina", 20000, "Female"],
                ["John", 250000, "Male"],
                ["Josef", 450500, "Male"],
            ],
        },
        {
            xSteps: 1, // Will start putting cell with 1 empty cell on left most
            ySteps: 5, //will put space of 5 rows,
            columns: ["Name", "Department"],
            data: [
                ["Johnson", "Finance"],
                ["Monika", "IT"],
                ["Konstantina", "IT Billing"],
                ["John", "HR"],
                ["Josef", "Testing"],
            ],
        },
    ];

    const styledMultiDataSet = [
        {
            columns: [
                {
                    value: "Headings",
                    widthPx: 160,
                    style: { font: { sz: "24", bold: true } },
                },
                {
                    value: "Text Style",
                    widthPx: 180,
                    style: { font: { sz: "24", bold: true } },
                },
                {
                    value: "Colors",
                    widthPx: 64,
                    style: { font: { sz: "24", bold: true } }, // if no width set, default excel column width will be used ( 64px )
                },
            ],
            data: [
                [
                    { value: "H1", style: { font: { sz: "24", bold: true } } },
                    { value: "Bold", style: { font: { bold: true } } },
                    {
                        value: "Red",
                        style: {
                            fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
                        },
                    },
                ],
                [
                    { value: "H2", style: { font: { sz: "18", bold: true } } },
                    { value: "underline", style: { font: { underline: true } } },
                    {
                        value: "Blue",
                        style: {
                            fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } },
                        },
                    },
                ],
                [
                    { value: "H3", style: { font: { sz: "14", bold: true } } },
                    { value: "italic", style: { font: { italic: true } } },
                    {
                        value: "Green",
                        style: {
                            fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
                        },
                    },
                ],
                [
                    { value: "H4", style: { font: { sz: "12", bold: true } } },
                    { value: "strike", style: { font: { strike: true } } },
                    {
                        value: "Orange",
                        style: {
                            fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } },
                        },
                    },
                ],
                [
                    { value: "H5", style: { font: { sz: "10.5", bold: true } } },
                    { value: "outline", style: { font: { outline: true } } },
                    {
                        value: "Yellow",
                        style: {
                            fill: { patternType: "solid", fgColor: { rgb: "FFFFFF00" } },
                        },
                    },
                ],
                [
                    { value: "H6", style: { font: { sz: "7.5", bold: true } } },
                    { value: "shadow", style: { font: { shadow: true } } },
                    {
                        value: "Light Blue",
                        style: {
                            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
                        },
                    },
                ],
            ],
        },
    ];

    return (
        <ExcelFile element={<button>Download Data With Styles</button>}>
            <ExcelSheet dataSet={styledMultiDataSet} name="Organization" />
        </ExcelFile>
    );
};

export default BalanceSheetExcel;
