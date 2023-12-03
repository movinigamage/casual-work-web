import React, {useEffect, useState} from "react";
import casualWorkLogo from "../../resources/images/logo.png";
import {ICompany} from "../../store/type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {
    USER_ALREADY_EXISTS,
    USER_REGISTRATION_COMPLETED,
    USER_REGISTRATION_DEFAULT,
    USER_REGISTRATION_FAILED,
    USER_REGISTRATION_PROGRESS,
    USER_REGISTRATION_SUCCESS,
    COMPANY_LOGO_UPLOAD_SUCCESS,
    COMPANY_PROFILE_UPDATE_FAILED
} from "../../store/actionTypes";
import {Failure, Success} from "../../util/toasts";
import {validateEmail} from "../../util/regex";
import {registerCompany} from "../../store/actions/companyActions";

export function CompanyRegistration() {

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initAutocomplete&libraries=places&v=weekly";
    //     script.async = true;
    //     document.body.appendChild(script);
    //
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);

    const [validation,setValidation] = useState({
        nameReq: false,
        addressReq: false,
        contactNoReq: false,
        emailReq: false,
        passwordReq: false,
        emailFormatInvalid: false,
        passwordLenInvalid: false
    });

    const [company, setCompany] = useState<ICompany>({
        name: "",
        address: "",
        contactNumber: "",
        email: ""
    });

    const [logo,setLogo] = useState<File|null>();
    const [password, setPassword] = useState<string>();

    const dispatch = useDispatch();
    const { processing, type, error , message, progress } = useSelector((state: RootState) =>
        state.companyRegistration);

    useEffect(() => {
        dispatch({
            type: USER_REGISTRATION_DEFAULT
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if(processing && type === USER_REGISTRATION_SUCCESS) {
            Success(message as string);
        } else if(processing && (type === COMPANY_LOGO_UPLOAD_SUCCESS)) {
            Success(message as string);
        } else if(processing && (type === COMPANY_PROFILE_UPDATE_FAILED ||
            type === COMPANY_PROFILE_UPDATE_FAILED)) {
            Failure(error as string);
        }
        else if(!processing && (type === USER_ALREADY_EXISTS || type === USER_REGISTRATION_FAILED)) {
            Failure(error as string);
            dispatch({
                type: USER_REGISTRATION_DEFAULT
            });
        } else if(!processing && type === USER_REGISTRATION_COMPLETED) {
            dispatch({
                type: USER_REGISTRATION_DEFAULT
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[processing,type, error, message, progress, dispatch]);

    function onSubmit() {

        setValidation(prevState => ({
            ...prevState,
            nameReq: !company.name,
            addressReq: !company.address,
            emailReq: !company.email,
            emailFormatInvalid: !validateEmail(company.email),
            contactNoReq: !company.contactNumber,
            passwordReq: !password,
            passwordLenInvalid: (password ? password.length < 6: true)
        }));

        // validation
        if(company.name && company.email && company.address && company.contactNumber && validateEmail(company.email) &&
        password && (password.length >= 6)) {
            dispatch({
                type: USER_REGISTRATION_PROGRESS,
                progress : 0
            });
            // create user account
            dispatch(registerCompany(company, password, logo));
        }
    }

    function onClear() {
        setCompany(prevState => ({
            ...prevState,
            name : "",
            address : "",
            contactNumber : "",
            email : ""
        }));

        setValidation(prevState => ({
            ...prevState,
            nameReq : false,
            addressReq : false,
            emailReq : false,
            contactNoReq : false,
            emailFormatInvalid: false,
            passwordReq: false,
            passwordLenInvalid: false
        }));

        setLogo(null);

        dispatch({
            type: USER_REGISTRATION_DEFAULT
        });
    }

    return (
      <>
          <div className="fix-menu">
              <section className="login d-flex">
                     <div className="container">
                      <div className="row">
                          <div className="col-md-12">
                              <div className="register-card card-block auth-body mr-auto ml-auto">
                                  <form className="md-float-material">
                                      <div className="auth-box m-2">
                                          <img className="img-fluid" src={casualWorkLogo} alt="logo"/>
                                          <div className="row p-o m-0">
                                              <div className="col-md-12 text-center">
                                                  <h3 className="text-dark m-0 p">Sign Up</h3>
                                                  <hr/>
                                                  {
                                                      processing &&
                                                      <div className="progress custom-progress">
                                                          <div className={"progress-bar bg-dgreen progress-bar-striped progress-bar-animated custom-progress-bar-" + progress?.toString()}
                                                               role="progressbar" aria-valuemin={0} aria-valuemax={100}>
                                                          </div>
                                                      </div>
                                                  }
                                                  <br/>
                                                  <div className="row">
                                                      <div className="col-md-6">
                                                          <div className="form-group">
                                                              <label htmlFor="">Company Name <sup>*</sup></label>
                                                              <input className="form-control" type="text" placeholder="Company Name" required
                                                                     onChange={(e) => {
                                                                         setCompany(prevState => ({
                                                                             ...prevState,
                                                                             name : e.target.value
                                                                         }));
                                                                         setValidation(prevState => ({
                                                                             ...prevState,
                                                                             nameReq : !e.target.value
                                                                         }));
                                                                     }}
                                                              />
                                                              {
                                                                  validation.nameReq &&
                                                                  <small className="invalid-feedback">The company name is required.</small>
                                                              }
                                                          </div>
                                                          <div className="form-group">
                                                              <label>Email <sup>*</sup></label>
                                                              <input className="form-control " type="text" placeholder="Email" required
                                                                     onChange={(e)=> {
                                                                         setCompany(prevState => ({
                                                                             ...prevState,
                                                                             email : e.target.value
                                                                         }));
                                                                         setValidation(prevState => ({
                                                                             ...prevState,
                                                                             emailReq : !e.target.value
                                                                         }));
                                                                     }}
                                                              />
                                                              {
                                                                  validation.emailReq &&
                                                                  <small className="invalid-feedback">The email is required.</small>
                                                              }
                                                              {
                                                                  validation.emailFormatInvalid &&
                                                                  <small className="invalid-feedback">Invalid email address format.</small>
                                                              }
                                                          </div>

                                                          <div className="form-group">
                                                              <label>Address <sup>*</sup></label>
                                                              <textarea className="form-control " required
                                                                        placeholder="Enter company address"
                                                                        onChange={(e)=> {
                                                                            setCompany(prevState => ({
                                                                                ...prevState,
                                                                                address : e.target.value
                                                                            }));
                                                                            setValidation(prevState => ({
                                                                                ...prevState,
                                                                                addressReq : !e.target.value,
                                                                            }));
                                                                        }}
                                                              />
                                                              {
                                                                  validation.addressReq &&
                                                                  <small className="invalid-feedback">The address is required.</small>
                                                              }
                                                          </div>

                                                      </div>
                                                      <div className="col-md-6">

                                                          <div className="form-group">
                                                              <label>Contact Number <sup>*</sup></label>
                                                              <input className="form-control " type="text" placeholder="Contact Number" required
                                                                     onChange={(e)=> {
                                                                         setCompany(prevState => ({
                                                                             ...prevState,
                                                                             contactNumber : e.target.value
                                                                         }));
                                                                         setValidation(prevState => ({
                                                                             ...prevState,
                                                                             contactNoReq : !e.target.value
                                                                         }));
                                                                     }}
                                                              />
                                                              {
                                                                  validation.contactNoReq &&
                                                                  <small className="invalid-feedback">The contact number is required.</small>
                                                              }
                                                          </div>

                                                          <div className="form-group">
                                                              <label>Password <sup>*</sup></label>
                                                              <input type="password" className="form-control " required
                                                                     placeholder={"Password"}
                                                                     onChange={(e)=> {
                                                                         setPassword(e.target.value);
                                                                         setValidation(prevState => ({
                                                                             ...prevState,
                                                                             passwordReq : !e.target.value,
                                                                         }));
                                                                     }}
                                                              />
                                                              {
                                                                  validation.passwordReq &&
                                                                  <small className="invalid-feedback">The password is required.</small>
                                                              }
                                                              {
                                                                  validation.passwordLenInvalid &&
                                                                  <small className="invalid-feedback">The password must contains at
                                                                      least 6 characters.</small>
                                                              }
                                                          </div>

                                                          <div className="form-group">
                                                              <div className="row">
                                                                  <div className="form-group col-12">
                                                                      <label>Company Logo</label>
                                                                      <div className="custom-file">
                                                                          <input type="file" className="custom-file-input"
                                                                                 accept=".jpg, .jpeg, .png"
                                                                                 onChange={(e) => {
                                                                                     setLogo(e.target.files?.item(0));
                                                                                 }}
                                                                          />
                                                                          <label className="custom-file-label">{!logo ? "Choose file":
                                                                              logo.name}</label>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>

                                                      </div>
                                                  </div>
                                                  <div className="input-group text-center mt-4">
                                                      <a className="w-100" href={"/login"}>Back To Login</a>
                                                  </div>
                                                  <div className="d-flex justify-content-end">
                                                      <button type="reset" className="btn btn-danger mr-3"
                                                              onClick={ () => onClear() }
                                                      >Clear</button>
                                                      <button  className="btn btn-primary" disabled={processing}
                                                               onClick={() => {
                                                                   onSubmit();
                                                               }}
                                                      >Register</button>
                                                  </div>
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
      </>
    );
}
