import React from "react";
import profilePhoto from "../../../resources/images/profile-placeholder.svg";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../../store/actions/authActions";
import {RootState} from "../../../store/reducers/rootReducer";
import {menuOpen} from "../../../store/actions/otherActions";
// import Clock from 'react-live-clock';

export function Header() {

    const dispatch = useDispatch();
    const { user: {name, logoUrl} } = useSelector((state: RootState) => state.auth);
    function onMenuClick() {
        dispatch(menuOpen(true))
    }

    const logoutClickHandler = () => {
        dispatch(signOut());
    };

    return (
        <div className="header">
            <div className="header-left" onClick={() => onMenuClick()}>
                <div className={`menu-icon icon ion-ios-menu`} id="top-menu-icon" onClick={() => onMenuClick()}/>
                {/*<div className="ml-3">*/}
                {/*    <h5><Clock format="HH:mm:ss" ticking={true} timezone="Asia/Colombo"></Clock></h5>*/}
                {/*</div>*/}
            </div>
            <div className="header-right">

                <div className="user-info-dropdown mr-3">
                    <div className="dropdown">
                        <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown">
                        <span className="user-icon">
                            <img src={logoUrl || profilePhoto} alt="User Profile Identity"/>
                        </span>
                            <span className="user-name">{`${name}`}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                            <a className="dropdown-item" href={"#company/profile"}><i className="icon ion-md-contact"/>Profile</a>
                            <a className="dropdown-item" href={"$/"} onClick={logoutClickHandler}><i className="icon ion-md-undo "/>Log Out</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
