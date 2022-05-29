import {
    TableActions, TableState,
} from "../type";
import {
    APPLICANTS_TABLE,
    JOB_TABLE,
    LOADING, PAYMENT_HISTORY_TABLE,
    QUIZ_TABLE
} from "../actionTypes";

const initQuizState : TableState = {
    loading : true,
    data : []
};

export const quizTableReducer = ( state: TableState = initQuizState, action: TableActions) => {
    switch (action.type) {
        case QUIZ_TABLE :
            return  {
                ...state,
                loading: false,
                data : action.data
            };
        case LOADING:
            return {
                ...state,
                loading : true,
                data : []
            };
        default: return state
    }
};

const initJobState : TableState = {
    loading : true,
    data : []
};

export const jobReducer = ( state: TableState = initJobState, action: TableActions) => {
    switch (action.type) {
        case JOB_TABLE :
            return  {
                ...state,
                loading: false,
                data : action.data
            };
        case LOADING:
            return {
                ...state,
                loading : true,
                data : []
            };
        default: return state
    }
};

const initPaymentHistoryState : TableState = {
    loading : true,
    data : []
};

export const paymentHistoryReducer = ( state: TableState = initPaymentHistoryState, action: TableActions) => {
    switch (action.type) {
        case PAYMENT_HISTORY_TABLE:
            return  {
                ...state,
                loading: false,
                data : action.data
            };
        case LOADING:
            return {
                ...state,
                loading : true,
                data : []
            };
        default: return state
    }
};

const initApplicantsState : TableState = {
    loading : true,
    data : []
};

export const applicantsReducer = ( state: TableState = initApplicantsState, action: TableActions) => {
    switch (action.type) {
        case APPLICANTS_TABLE:
            return  {
                ...state,
                loading: false,
                data : action.data
            };
        case LOADING:
            return {
                ...state,
                loading : true,
                data : []
            };
        default: return state
    }
};