import React, {useState} from "react";
import logo from "../../resources/images/logo.png";
import {fire} from "../../index";
import {ToastContainer} from "react-toastify";
import {Failure, Success} from "../../util/toasts";

export function ForgotPassword() {

    const [email,setEmail] = useState<string>();
    const [emailReq, setEmailReq] = useState<boolean>(false);

    function onSubmit() {
        if(email) {
            fire.auth().sendPasswordResetEmail(email)
                .then(() => {
                    // Password reset email sent!
                    Success("Password reset email sent!\nPlease check your mail box");
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    Failure(errorMessage);
                });
        }
    }

    return (
        <div className="fix-menu">
            <section className="login d-flex">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="login-card card-block auth-body mr-auto ml-auto">
                                <div className="md-float-material needs-validation">
                                    <div className="auth-box m-2">
                                        <img className="img-fluid" src={logo} alt="logo"/>
                                            <div className="row p-o m-0">
                                                <div className="col-md-12 text-center">
                                                    <h3 className="text-dark m-0 p">Forgot Password</h3>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <p>Enter your email address to reset your password</p>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control"
                                                       placeholder="Your email address" required
                                                       onChange={(e) =>
                                                            {
                                                                setEmail(e.target.value);
                                                                setEmailReq(!e.target.value);
                                                            }
                                                        }
                                                />
                                                {
                                                    emailReq && <small className="invalid-feedback text-left">Please enter your
                                                        email address.</small>
                                                }
                                            </div>
                                            <div className="input-group text-center mt-4">
                                                <a className="w-100" href={"/login"}>Back to Login</a>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-md-12">
                                                    <button  className="btn btn-primary btn-block"
                                                             onClick={() => {onSubmit();}}
                                                    >Submit
                                                    </button>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </div>
    )
}
