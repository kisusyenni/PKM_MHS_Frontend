import React from "react";

const PaymentStatusText = (value) => {
    switch (value.status) {
        case 1:
            return <span style={{ color: "red" }}>Belum Dibayar</span>;
        case 2:
            return <span style={{ color: "yellow" }}>Dibayar Sebagian</span>;
        case 3:
            return <span style={{ color: "green" }}>Lunas</span>;
        default:
            return "-";
    }
};

export default PaymentStatusText;
