/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";

function totalCal(results) {
    // console.log(results);
    let totalValue = 0;

    // for (let i = 0; i < results.length; i++) {
    //     let totalRow = 0;
    //     if (typeof (results[i].total === "string")) {
    //         totalRow =
    //     } else {

    //     }

    // }

    // for (const key in results) {
    //     // console.log(key);
    //     console.log(results[key] === "string");
    //     if (typeof results[key] === "string") {
    //         // const output = parseInt(results[key], 10);
    //         // const quantity = parseInt(results["quantity"], 10);
    //         // const price = parseInt(results["pricePerUnit"], 10);
    //         // const output = quantity * price;
    //         // console.log(quantity);
    //         const output = parseInt(results["amount"]);
    //         totalValue = totalValue + (Number.isNaN(output) ? 0 : output);
    //     } else {
    //         totalValue = totalValue + totalCal(results[key], totalValue);
    //     }
    // }

    return totalValue;
}

const CalcPurchaseDetail = ({ control, setValue }) => {
    const results = useWatch({ control, name: "item" });
    const output = totalCal(results);
    // console.log(results);

    useEffect(() => {
        setValue("total", output);
    }, [results]);

    return <></>;
};

export default CalcPurchaseDetail;
