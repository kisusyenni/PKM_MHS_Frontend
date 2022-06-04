/* eslint-disable react/prop-types */
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from "@coreui/react";
import React from "react";

const ConfirmationModal = ({
    openModal,
    title,
    content,
    type,
    buttonLeft,
    buttonRight,
    proceed,
    handleClose,
}) => {
    const modalButtonColor = (modalType) => {
        switch (modalType) {
            case "delete":
                return "danger";

            default:
                return "primary";
        }
    };

    return (
        <CModal className="show" keyboard={false} portal={false} visible={openModal}>
            <CModalHeader closeButton={false}>
                <CModalTitle>{title}</CModalTitle>
                <CButton
                    className="btn btn-close"
                    onClick={handleClose}
                    aria-label="close"
                ></CButton>
            </CModalHeader>
            <CModalBody>{content}</CModalBody>
            <CModalFooter>
                <CButton onClick={handleClose} color="secondary">
                    {buttonLeft}
                </CButton>
                <CButton onClick={proceed} color={modalButtonColor(type)}>
                    {buttonRight}
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default ConfirmationModal;
