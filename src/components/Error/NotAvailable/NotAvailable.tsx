import React from "react";

export function NotAvailable() {
    return (
        <div className="error-page heigh-fix  d-flex align-items-center flex-wrap justify-content-center pd-20">
            <div className="pd-10">
                <div className="error-page-wrap text-center">

                    <h3>Error: Resources not available</h3>
                    <p>
                        Sorry, the file you’re looking is not available.
                    </p>
                </div>
            </div>
        </div>
    )
}
