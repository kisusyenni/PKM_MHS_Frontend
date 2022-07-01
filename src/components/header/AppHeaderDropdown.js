import React from "react";
import {
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from "@coreui/react";
import { cilSettings, cilAccountLogout, cilHouse } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import useAuth from "src/hooks/useAuth";

const AppHeaderDropdown = () => {
    const { logout } = useAuth();
    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                <CIcon icon={cilSettings} />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-light fw-semibold py-2">Pengaturan</CDropdownHeader>
                <CDropdownItem href="/edit-toko">
                    <CIcon icon={cilHouse} className="me-2" />
                    Ubah Toko
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem onClick={logout}>
                    <CIcon icon={cilAccountLogout} className="me-2" />
                    Keluar
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;
