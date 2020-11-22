import React, { Component } from "react";

function Navbar() {


    let isAdmin = localStorage.getItem("access_token");
    return (
        <div className="w3-bar w3-black">
            <a className="w3-bar-item w3-button" href="/">
                MedStatistics
            </a>
            {isAdmin ? (
                <div style={{ float: "right" }}>
                    <a className="w3-bar-item w3-button" href="/menu">
                        Menu
                    </a>
                    <a className="w3-bar-item w3-button" href="/logout">
                        Logout
                    </a>
                </div>
            ) 
            : (
                <div style={{ float: "right" }}>
                    <a className="w3-bar-item w3-button" href="/login">
                        Admin
                    </a>
                </div>
            )}
        </div>
    );
}

export default Navbar;