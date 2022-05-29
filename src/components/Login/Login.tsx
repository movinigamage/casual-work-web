import React, {useEffect, useState} from "react";
import logo from "../../resources/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {setError, signIn} from "../../store/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(setError(''));
        }
        return () => {
            if(error) {
                dispatch(setError(''));
            }
        }
    },[error,dispatch]);

    const submitHandler = () => {
        setLoading(true);
        dispatch(signIn({ email, password }, () => setLoading(false)));
    };

    return (
        <>
            <div className="fix-menu">
                <section className="login d-flex">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="login-card card-block auth-body mr-auto ml-auto">
                                    <form className="md-float-material">
                                        <div className="auth-box m-2">
                                            <img className="img-fluid" src={logo} alt="logo"/>
                                            <div className="row p-o m-0">
                                                <div className="col-md-12 text-center">
                                                    <h3 className="text-dark m-0 p">Sign In</h3>
                                                </div>
                                            </div>
                                            <hr/>

                                            <div className="input-group">
                                                <input type="email" className="form-control"
                                                       onChange={(e) => setEmail(e.target.value)}
                                                       placeholder="Your email address" />
                                            </div>

                                            <div className="input-group mt-3">
                                                <input type="password" className="form-control"
                                                       onChange={(e) => setPassword(e.target.value)}
                                                       placeholder="Password" autoComplete="on"/>
                                            </div>

                                            <div className="input-group text-center mt-4">
                                                <a className="w-100" href={"/register"}>Register Your Company</a>
                                                <p className="w-100">or</p>
                                                <a className="w-100" href={"/forgot-password"}>Forgot Your Password?</a>
                                            </div>

                                            <div className="row mt-2">
                                                <div className="col-md-12">
                                                    <button type="button" className="btn btn-primary btn-block"
                                                          onClick={submitHandler}  disabled={loading}>Sign In
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer/>
        </>
    );
}
