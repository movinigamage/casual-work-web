import React from "react";
import logo from "../../../resources/images/logo.png";

export function Loader() {

    return (
        <div className="pre-loader">
            <div className="pre-loader-box">
                <div className="loader-logo">
                    <img height="50px" width="280px" src={logo}
                         alt=""/>
                </div>
                <div className='loader-progress bg-dgreen' id="progress_div">
                    <div className='bar bar-custom' id='bar1'/>
                </div>
                <div className="loading-text">
                    Loading...
                </div>
            </div>
        </div>
    )
}
