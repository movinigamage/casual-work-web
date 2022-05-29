import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import {MenuAction} from "../type";
import {MENU_CLOSE, MENU_OPEN} from "../actionTypes";

export const menuOpen = (open : boolean) : ThunkAction<void, RootState, null, MenuAction> => {

    return async dispatch => {
                dispatch({
                    type : open ? MENU_OPEN : MENU_CLOSE
                });
    }
};
