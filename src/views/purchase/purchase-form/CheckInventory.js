/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";

const CheckInventory = ({ control, setValue, data }) => {
    const watchItem = useWatch({ control, name: "item" });
    const output = () => {
        let totalValue = 0;

        for (let i = 0; i < watchItem.length; i++) {
            let count = (watchItem[i].pricePerUnit - watchItem[i].discount) * watchItem[i].quantity;
            totalValue += count;
        }
        return totalValue;
    };

    useEffect(() => {}, [watchItem]);
    return <></>;
};

export default CheckInventory;
