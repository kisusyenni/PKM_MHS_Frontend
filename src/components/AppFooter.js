import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
    return (
        <CFooter>
            <div>
                <a href="https://multistudi.sch.id/" target="_blank" rel="noopener noreferrer">
                    Multistudi High School
                </a>
                <span className="ms-1">&copy; 2022.</span>
            </div>
            <div className="ms-auto">
                <span className="me-1">Powered by</span>
                UIB &amp; MHS
            </div>
        </CFooter>
    );
};

export default React.memo(AppFooter);
