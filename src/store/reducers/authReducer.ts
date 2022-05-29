import {AuthAction, AuthState} from '../type';
import {SET_ERROR, SET_LOADING, SET_SUCCESS, SET_USER, SIGN_OUT} from '../actionTypes';

const initialState: AuthState = {
    user : {
        name : "",
        email : "",
        contactNumber : "",
        address : ""
    },
    authenticated: false,
    loading: true,
    error: '',
    success: ''
};

export const authReducer = (state = initialState, action: AuthAction) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SIGN_OUT:
            return {
                ...state,
                user:  {
                    name : "",
                    email : "",
                    contactNumber : "",
                    address : ""
                },
                authenticated: false,
                loading: false
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            };
        default:
            return state;
    }
};
