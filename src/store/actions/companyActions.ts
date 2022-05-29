import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import {fire} from "../../index";
import {
    COMPANY_LOGO_UPLOAD_FAILED, COMPANY_LOGO_UPLOAD_SUCCESS,
    COMPANY_PROFILE_UPDATE_FAILED,
    COMPANY_PROFILE_UPDATE_SUCCESS,
    USER_ALREADY_EXISTS, USER_REGISTRATION_COMPLETED, USER_REGISTRATION_FAILED, USER_REGISTRATION_PROGRESS,
    USER_REGISTRATION_SUCCESS
} from "../actionTypes";
import {
    CrudAction, ICompany,
    ICompanyProfileUpdate,
} from "../type";
import {v4 as uuidv4} from 'uuid';

const companyCollectionPath = "companies";
const logoStoragePath = "company_logos"

function getProgressStep(progress : number) {
    if(progress <= 10)
        progress = 10;
    else if(progress <= 20)
        progress = 20;
    else if(progress <= 30)
        progress = 30;
    else if(progress <= 40)
        progress = 40;
    else if(progress <= 50)
        progress = 50;
    else if(progress <= 60)
        progress = 60;
    else if(progress <= 70)
        progress = 70;
    else if(progress <= 80)
        progress = 80;
    else if(progress <= 90)
        progress = 90;
    else
        progress = 100;
    return progress;
}

const uploadCompanyLogo = (logo : any, email : string, password: string, dispatch : any) => {
    const storage = fire.storage();
    const db = fire.firestore();
    if(logo != null) {
        const temp = logo.name.split('.');
        const storageRefPassport = storage.ref(`${logoStoragePath}/${uuidv4()}.${temp[temp.length-1]}`);
        const uploadTaskPassport = storageRefPassport.put(logo);
        uploadTaskPassport.on('state_changed',
            (snapshot) => {
                const progress =  20 + (((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 2) * (4/5);

                dispatch({
                    type : USER_REGISTRATION_PROGRESS,
                    progress : getProgressStep(progress)
                });
            },
            () => {
                dispatch({
                    type : COMPANY_LOGO_UPLOAD_FAILED
                });
                return signUp(email, password, dispatch);
            },
            () => {
                storageRefPassport.getDownloadURL()
                    .then((url)=> {
                        db.collection(companyCollectionPath).doc(email).set({
                            logoUrl: url
                        },{ merge: true })
                            .then(() => {
                                dispatch({
                                    type : COMPANY_LOGO_UPLOAD_SUCCESS
                                });
                                return signUp(email, password, dispatch);
                            })
                            .catch(() => {
                                dispatch({
                                    type : COMPANY_LOGO_UPLOAD_FAILED
                                });
                                return signUp(email, password, dispatch);
                            });
                    })
                    .catch(()=> {
                        dispatch({
                            type : COMPANY_LOGO_UPLOAD_FAILED
                        });
                        return signUp(email, password, dispatch);
                    });
            }
        );
    } else {
        return signUp(email, password, dispatch);
    }
};

const signUp = (email: string, password: string, dispatch : any) => {
    fire.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        if(user?.email) {
            dispatch({
                type : USER_REGISTRATION_COMPLETED
            });
        } else {
            dispatch({
                type : USER_REGISTRATION_FAILED,
                error : "Something went wrong!"
            });
        }
    })
    .catch((error) => {
        const errorMessage = error.message;
        dispatch({
            type : USER_REGISTRATION_FAILED,
            error : errorMessage
        });
    });
};

export const registerCompany = (company: ICompany, password: string, logo: any):
    ThunkAction<void, RootState, null, CrudAction> => {

    const db = fire.firestore();

    return async dispatch => {
        const user = await db.collection(companyCollectionPath).doc(company.email.trim()).get();
        if(!user.exists) {
            db.collection(companyCollectionPath).doc(company.email).set(company)
                .then(() => {
                    // successfully added
                    dispatch({
                        type: USER_REGISTRATION_SUCCESS,
                        progress: 20
                    });
                    return uploadCompanyLogo(logo, company.email, password, dispatch);
                })
                .catch((error : any) => {
                    // something went wrong
                    dispatch({
                        type : USER_REGISTRATION_FAILED,
                        error : error
                    });
                });
        } else {
            // user exists
            dispatch({
                type : USER_ALREADY_EXISTS
            })
        }
    }
};

export const updateCompanyProfile = (company : ICompanyProfileUpdate): ThunkAction<void, RootState, null,
    CrudAction> => {

    const db = fire.firestore();

    return async dispatch => {
        db.collection(companyCollectionPath).doc(company.email).set({
            address: company.address,
            name: company.name,
            contactNumber: company.contactNumber
        },{ merge: true })
            .then(() => {
                dispatch({
                    type : COMPANY_PROFILE_UPDATE_SUCCESS,
                    message : "Successfully updated your profile"
                })
            })
            .catch(() => {
                dispatch({
                    type : COMPANY_PROFILE_UPDATE_FAILED,
                    message : "Something went wrong!.Failed to updated your profile. Try again!"
                })
            });
    }
};
