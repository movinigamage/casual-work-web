import {CrudAction, CrudState} from "../type";
import {
    CREATE_QUIZ_DEFAULT,
    CREATE_QUIZ_FAILED,
    CREATE_QUIZ_SUCCESS,
    UPDATE_QUIZ_FAILED,
    UPDATE_QUIZ_SUCCESS,
} from "../actionTypes";

const initQuizState : CrudState = {
    processing: false,
    type : CREATE_QUIZ_DEFAULT
};

export const quizReducer = (state : CrudState = initQuizState,
                                            action : CrudAction) => {
    switch (action.type) {
        case CREATE_QUIZ_DEFAULT:
            return {
                ...state,
                type : CREATE_QUIZ_DEFAULT,
                message : "",
                error : ""
            };
        case CREATE_QUIZ_SUCCESS:
            return {
                ...state,
                type : CREATE_QUIZ_SUCCESS,
                message : "Quiz has been created successfully!"
            };
        case CREATE_QUIZ_FAILED:
            return {
                ...state,
                type : CREATE_QUIZ_FAILED,
                error : action.error
            };
        case UPDATE_QUIZ_SUCCESS:
            return {
                ...state,
                type : UPDATE_QUIZ_SUCCESS,
                message : "Quiz has been updated successfully!"
            };
        case UPDATE_QUIZ_FAILED:
            return {
                ...state,
                type : UPDATE_QUIZ_FAILED,
                error : action.error
            };
        default: return state;
    }
};
