import {
    CrudAction,
    CrudState

} from "../type";
import {
    COMPANY_LOGO_UPLOAD_FAILED,
    COMPANY_LOGO_UPLOAD_SUCCESS,
    COMPANY_PROFILE_UPDATE_DEFAULT, COMPANY_PROFILE_UPDATE_FAILED, COMPANY_PROFILE_UPDATE_SUCCESS,
    USER_ALREADY_EXISTS,
    USER_REGISTRATION_DEFAULT,
    USER_REGISTRATION_FAILED, USER_REGISTRATION_PROGRESS,
    USER_REGISTRATION_SUCCESS
} from "../actionTypes";

const initCompanyRegistrationState : CrudState = {
    processing: false,
    type : USER_REGISTRATION_DEFAULT
};

export const companyRegistrationReducer = ( state: CrudState = initCompanyRegistrationState, action: CrudAction) => {
    switch (action.type) {
        case USER_REGISTRATION_SUCCESS :
            return  {
                ...state,
                processing: true,
                type: USER_REGISTRATION_SUCCESS,
                message: "Your company has been registered successfully."
            };
        case USER_REGISTRATION_FAILED :
            return {
                ...state,
                processing: false,
                type: USER_REGISTRATION_FAILED,
                error: "Something went wrong, failed to register your company.\n Try again later!"
            };
        case USER_ALREADY_EXISTS :
            return {
                ...state,
                processing: false,
                type: USER_ALREADY_EXISTS,
                error : "Company already exists."
            };
        case USER_REGISTRATION_PROGRESS :
            return {
                ...state,
                processing: true,
                type: USER_REGISTRATION_PROGRESS,
                progress : action.progress
            };
        case COMPANY_LOGO_UPLOAD_SUCCESS:
            return {
                ...state,
                type: COMPANY_LOGO_UPLOAD_SUCCESS,
                message: "Company logo uploaded!"
            };
        case COMPANY_LOGO_UPLOAD_FAILED:
            return {
                ...state,
                type: COMPANY_LOGO_UPLOAD_FAILED,
                error: "Failed to upload the company logo!!"
            };
        case USER_REGISTRATION_DEFAULT:
            return {
                ...state,
                processing: false,
                type : USER_REGISTRATION_DEFAULT,
                message: "",
                error : ""
            };
        default: return state
    }
};

const initStateAdminProfileUpdate : CrudState = {
    processing: false,
    type: COMPANY_PROFILE_UPDATE_DEFAULT
};

export const companyProfileUpdateReducer = (state : CrudState = initStateAdminProfileUpdate,
                                          action : CrudAction) => {
    switch (action.type) {
        case COMPANY_PROFILE_UPDATE_DEFAULT:
            return {
                ...state,
                type : COMPANY_PROFILE_UPDATE_DEFAULT,
                message : "",
                error : ""
            };
        case COMPANY_PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                type : COMPANY_PROFILE_UPDATE_SUCCESS,
                message : action.message
            };
        case COMPANY_PROFILE_UPDATE_FAILED:
            return {
                ...state,
                type : COMPANY_PROFILE_UPDATE_FAILED,
                error : action.error
            };
        default: return state;
    }
};

