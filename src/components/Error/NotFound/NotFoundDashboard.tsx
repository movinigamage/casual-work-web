import React from "react";

export function NotFoundDashboard() {

    return (
        <div className="pd-ltr-20 ">
            <div className="row ">
                <div className="col-xl-12 mb-30 ">
                    <div className="card-box height-100-p pd-20 ">
                        <div className="error-page d-flex align-items-center flex-wrap justify-content-center pd-20">
                            <div className="pd-10">
                                <div className="error-page-wrap text-center">
                                    <h1>?</h1>
                                    <h3>Error: Component loading</h3>
                                    <p>
                                        Sorry, the page you’re looking for cannot be proceed.
                                        <br/> Try again.
                                    </p>
                                    <div className="pt-20 mx-auto max-width-200">
                                        <a href="/" className="btn btn-primary btn-lg">Refresh</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}