import React, {useEffect} from 'react';
import './App.css';
import {HomePage} from "./components/HomePage/HomePage";
import {createBrowserHistory} from "history";
import {Switch, Router} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/reducers/rootReducer";
import {getUserById, setLoading} from "./store/actions/authActions";
import {fire} from "./index";
import {Loader} from "./components/Common/Loader/Loader";
import PublicRoute from "./components/Auth/PublicRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import {NotFound} from "./components/Error/NotFound/NotFound";
import {ForgotPassword} from "./components/ForgotPassword/ForgotPassword";
import {NotAvailable} from "./components/Error/NotAvailable/NotAvailable";
import {CompanyRegistration} from "./components/Registration/CompanyRegistration";

const history = createBrowserHistory();

function App() {

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = fire.auth().onAuthStateChanged(async (user) => {
      if(user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.email as string));
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if(loading) {
    return <Loader/>;
  }

  return (
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/" component={HomePage} exact/>
          <PublicRoute path="/login" component={Login} exact />
          <PublicRoute path="/register" component={CompanyRegistration} exact />
          <PrivateRoute path="/loading" component={Login} exact />
          <PublicRoute path="/forgot-password" component={ForgotPassword} exact/>
          <PrivateRoute path="/not-available" component={NotAvailable} exact/>
          <PublicRoute path="*" component={NotFound} exact/>
        </Switch>
      </Router>
  );
}

export default App;
