import React from "react";

export function NotFound() {
    return (
        <div className="error-page heigh-fix  d-flex align-items-center flex-wrap justify-content-center pd-20">
            <div className="pd-10">
                <div className="error-page-wrap text-center">
                    <h1>404</h1>
                    <h3>Error: 404 Page Not Found</h3>
                    <p>
                        Sorry, the page you’re looking for cannot be accessed.
                        <br/> Either check the URL
                    </p>
                    <div className="pt-20 mx-auto max-width-200">
                        <a href="/" className="btn btn-primary btn-lg">Refresh</a>
                    </div>
                </div>
            </div>
        </div>
    )
}