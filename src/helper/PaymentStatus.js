import { CBadge } from "@coreui/react";
import React from "react";

const PaymentStatus = (value) => {
    switch (value.status) {
        case 1:
            return <CBadge color="danger">Belum Dibayar</CBadge>;
        case 2:
            return <CBadge color="warning">Dibayar Sebagian</CBadge>;
        case 3:
            return <CBadge color="success">Lunas</CBadge>;
        default:
            return "-";
    }
};

export default PaymentStatus;
