/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";

const CalcSalesDetail = ({ control, setValue }) => {
    const results = useWatch({ control, name: "itemDetail" });
    const discount = useWatch({ control, name: "discount" });
    let total = 0 - discount;
    const output = () => {
        let totalValue = 0;

        for (let i = 0; i < results.length; i++) {
            let count = results[i].quantity * results[i].pricePerUnit;
            totalValue += count;
        }

        total = totalValue - discount;
        return totalValue;
    };

    useEffect(() => {
        setValue("subtotal", output);
        setValue("total", total);
    }, [results, discount]);

    return <></>;
};

export default CalcSalesDetail;
