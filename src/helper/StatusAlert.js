/* eslint-disable react/prop-types */
import { cilCheckCircle, cilInfo, cilWarning } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CAlert } from "@coreui/react";
import React from "react";

const StatusAlert = ({ showAlert, closeAlert, type, content }) => {
    const alertIcon = (alertType) => {
        switch (alertType) {
            case "success":
                return cilCheckCircle;

            case "danger":
                return cilWarning;

            default:
                return cilInfo;
        }
    };
    return (
        <>
            <CAlert
                color={type ? type : "primary"}
                className="d-flex align-items-center shadow-sm"
                visible={showAlert}
                dismissible
                onClose={closeAlert}
            >
                {type ? (
                    <CIcon
                        icon={alertIcon(type)}
                        className="flex-shrink-0 me-2"
                        width={24}
                        height={24}
                    />
                ) : (
                    ""
                )}
                <div>{content}</div>
            </CAlert>
        </>
    );
};

export default StatusAlert;
