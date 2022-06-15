/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

const CalcPurchaseDetail = ({ control, setValue }) => {
    const results = useWatch({ control, name: "item" });
    const output = () => {
        let totalValue = 0;

        for (let i = 0; i < results.length; i++) {
            let count = results[i].quantity * results[i].pricePerUnit;
            totalValue += count;
            // setValue(`item.${i}.amount`, count);
        }
        return totalValue;
    };

    useEffect(() => {
        setValue("total", output);
    }, [results]);

    return <></>;
};

export default CalcPurchaseDetail;
