import { ThunkAction } from 'redux-thunk';
import {AuthAction, SignInData, LoggedUser} from '../type';
import {SET_USER, SET_LOADING, SIGN_OUT, SET_ERROR, SET_SUCCESS} from '../actionTypes';
import {fire} from "../../index";
import {RootState} from "../reducers/rootReducer";

const companyCollectionPath = "companies";

// get company by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const user = await fire.firestore().collection(companyCollectionPath).doc(id).get();
            if(user.exists) {
                const userData = user.data() as LoggedUser;
                dispatch({
                    type: SET_USER,
                    payload: userData
                });
            }
        } catch (err : any) {
            dispatch(setError(err.message));
        }
    }
};

// set loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        });
    }
};

// login
export const signIn = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            await fire.auth().signInWithEmailAndPassword(data.email, data.password);
            return getUserById(data.email);
        } catch (err : any) {
            onError();
            dispatch(setError(err.message));
        }
    }
};

// logout
export const signOut = (): ThunkAction<void, RootState, null, AuthAction> => {
    return (dispatch) => {
        return new Promise(() => {
            dispatch(setLoading(true));
            fire
                .auth()
                .signOut()
                .then(() => {
                    dispatch({
                        type: SIGN_OUT
                    });
                })
                .catch(() => {dispatch(setLoading(false));});
        });
    };
};

// set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        });
    }
};

// set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        });
    }
};
