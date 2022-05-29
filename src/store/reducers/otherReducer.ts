import {MenuAction, MenuState} from "../type";
import {MENU_CLOSE, MENU_DEFAULT, MENU_OPEN} from "../actionTypes";

const initMenuState : MenuState = {
    type : MENU_DEFAULT
};

export const menuReducer = (state : MenuState = initMenuState, action : MenuAction) => {
    switch (action.type) {
        case MENU_OPEN:
            return {
                type : action.type
            };
        case MENU_CLOSE:
            return {
                type : action.type
            };
        default: return state;
    }
};
