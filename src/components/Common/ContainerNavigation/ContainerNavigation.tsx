import React from "react";

export function ContainerNavigation({title,mainTitle,mainNav} : {title : string, mainTitle : string, mainNav : string})
{
    return (
        <div className="page-header">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="title">
                        <h4>{title}</h4>
                    </div>
                    <nav aria-label="breadcrumb" role="navigation">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={"#dashboard"}>Home</a></li>
                            <li className="breadcrumb-item"><a href={`#${mainNav}`}>{mainTitle}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{title}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    )
}