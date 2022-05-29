import {
    CrudAction,
    CrudState
} from "../type";
import {
    POST_JOB_DEFAULT, POST_JOB_FAILED, POST_JOB_SUCCESS
} from "../actionTypes";

const initJobState : CrudState = {
    processing: false,
    type : POST_JOB_DEFAULT
};

export const postJobReducer = ( state: CrudState = initJobState, action: CrudAction) => {
    switch (action.type) {
        case POST_JOB_SUCCESS :
            return  {
                ...state,
                processing: true,
                type: POST_JOB_SUCCESS,
                message: action.message
            };
        case POST_JOB_FAILED :
            return {
                ...state,
                processing: false,
                type: POST_JOB_FAILED,
                error: "Something went wrong, failed to post your job.\n Try again later!"
            };
        case POST_JOB_DEFAULT:
            return {
                ...state,
                processing: false,
                type : POST_JOB_DEFAULT,
                message: "",
                error : ""
            };
        default: return state
    }
};