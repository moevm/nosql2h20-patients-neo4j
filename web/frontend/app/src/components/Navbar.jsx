import React from "react";

function Navbar() {
    return (
        <div className="w3-bar w3-black">
            <a className="w3-bar-item w3-button" href="/">
                MedStatistics
            </a>
            <div style={{ float: "right" }}>
                <a className="w3-bar-item w3-button" href="/login">
                    Admin
                </a>
            </div>
        </div>
    );
}

export default Navbar;