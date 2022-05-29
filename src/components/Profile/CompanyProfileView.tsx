import React, {useEffect, useState} from "react";
import defaultProfile from "../../resources/images/profile-placeholder.svg";
import {useHistory} from "react-router";
import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {Failure, Success} from "../../util/toasts";
import {fire} from "../../index";
import {ICompany, ICompanyProfileUpdate} from "../../store/type";
import {
    COMPANY_PROFILE_UPDATE_DEFAULT,
    COMPANY_PROFILE_UPDATE_FAILED,
    COMPANY_PROFILE_UPDATE_SUCCESS
} from "../../store/actionTypes";
import {updateCompanyProfile} from "../../store/actions/companyActions";
import {StarRatingView} from "../Common/Other/StarRatingView";

export function CompanyProfileView(): JSX.Element {

    const history = useHistory();
    const { user : {email} } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [company, setCompany] = useState<ICompany>({
        name: "",
        email: "",
        contactNumber: "",
        address: ""
    });
    const [validation, setValidation] = useState({
        nameReq: false,
        addressReq: false,
        contactNumberReq: false
    });

    // load company profile data
    useEffect(() => {
        setLoading(true);
        const db = fire.firestore();
        const companyCollectionPath = "companies";
        db.collection(companyCollectionPath).doc((email as string).trim()).get().then(
            (doc) => {
            if(doc.exists) {
                let _company : ICompany  = doc.data() as ICompany;
                setCompany(_company);
                setLoading(false);
            } else {
                // not found
                setLoading(false);
                history.push('#dashbord/not-found');
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const dispatch = useDispatch();
    const { type, message, error } = useSelector((state: RootState) => state.companyProfileUpdate);
    useEffect(() => {
        if(processing && type === COMPANY_PROFILE_UPDATE_SUCCESS) {
            Success(message as string);
            dispatch({
                type : COMPANY_PROFILE_UPDATE_DEFAULT
            });
            setProcessing(false);
        } else if(processing && type === COMPANY_PROFILE_UPDATE_FAILED) {
            Failure(error as string);
            dispatch({
                type : COMPANY_PROFILE_UPDATE_DEFAULT
            });
            setProcessing(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type, message, error]);

    function onSubmit() {

        setValidation(prevState => ({
            ...prevState,
            addressReq : !company.address,
            contactNumberReq : !company.contactNumber,
            nameReq: !company.name
        }));

        if(company.address && company.contactNumber && company.name) {
            setProcessing(true);
            // update admin profile
            let updatedCompany : ICompanyProfileUpdate = {
                email : company.email,
                address : company.address,
                contactNumber : company.contactNumber,
                name : company.name
            };
            dispatch({
                type : COMPANY_PROFILE_UPDATE_DEFAULT
            });
            dispatch(updateCompanyProfile(updatedCompany));
        }
    }

    if(loading) {
        return (
            <Skeleton count={20} duration={20}/>
        )
    }

    return (
        <div className="mb-30">
            <div className="row">
                <div className="col-lg-12 mb-30">
                    <div className="card-box">
                        <div className="row pd-t-30-l-30-r-30-b-0">
                            <div className="col-xl-4">
                                <div className="profile-photo img-fluid ">
                                    <img className="shadow-sm border border-dark profile-custom"
                                         src={company?.logoUrl || defaultProfile} alt="Company Profile Identity"/>
                                </div>
                                <h6 className="text-center text-muted">{company?.email}</h6>
                                <h5 className="text-center h5 mb-0">{`${company?.name}`}</h5>
                                <div className="text-center">
                                    {/*<Rating ratingValue={rating}*/}
                                    {/*        initialValue={rating}*/}
                                    {/*        onClick={handleRating}*/}
                                    {/*/>*/}
                                    <StarRatingView ratingNumber={4}/>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label htmlFor="">Company Name </label>
                                    <input className="form-control" type="text" placeholder="Company Name"
                                           value={company?.name}
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
                                    <label>Email </label>
                                    <input className="form-control " type="email"
                                           placeholder="employee@example.com"
                                           value={company?.email}
                                           readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label>Contact Number </label>
                                    <input className="form-control" type="text" placeholder="+94xxxxxxxxx"
                                           value={company?.contactNumber}
                                           onChange={(e) => {
                                               setCompany(prevState => ({
                                                   ...prevState,
                                                   contactNumber : e.target.value
                                               }));
                                               setValidation(prevState => ({
                                                   ...prevState,
                                                   contactNumberReq : !e.target.value
                                               }));
                                           }}
                                    />
                                    {
                                        validation.contactNumberReq &&
                                        <small className="invalid-feedback">The contact number is required.</small>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input className="form-control" placeholder="" type="text"
                                           value={company?.address}
                                           onChange={(e) => {
                                               setCompany(prevState => ({
                                                   ...prevState,
                                                   address : e.target.value
                                               }));
                                               setValidation(prevState => ({
                                                   ...prevState,
                                                   addressReq : !e.target.value
                                               }));
                                           }}
                                    />
                                    {
                                        validation.addressReq &&
                                        <small className="invalid-feedback">The address is required.</small>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end pd-t-0-l-30-r-30-b-30 pt-2">
                            <button className="btn btn-primary" onClick={()=> {onSubmit();}} disabled={processing}>
                                Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
