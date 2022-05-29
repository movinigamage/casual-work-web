import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {Route, Redirect, RouteProps} from 'react-router-dom';

import { RootState} from "../../store/reducers/rootReducer";

interface Props extends RouteProps {
    component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
    const {authenticated, loading} = useSelector((state: RootState) => state.auth);

    return(
        <Route {...rest} render={props => (
            (loading) ? <Redirect to="/loading" /> :
                ((!authenticated) ? <Redirect to="/login"/> :
                    <Component {...props}/> )
        )} />
    );
};

export default PrivateRoute;
