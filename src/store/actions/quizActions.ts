import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import {fire} from "../../index";
import {
    CREATE_QUIZ_FAILED,
    CREATE_QUIZ_SUCCESS, UPDATE_QUIZ_FAILED, UPDATE_QUIZ_SUCCESS

} from "../actionTypes";
import {
    CrudAction, IQuestion,
    IQuiz, IQuizStore
} from "../type";

const quizCollectionPath = "quiz_bank";

export const saveQuiz = (quiz: IQuiz): ThunkAction<void, RootState, null, CrudAction> => {

    let questions: IQuestion[] = [];
    quiz.questions.forEach((value => {
        questions.push(value);
    }));
    const db = fire.firestore();
    const _quiz: IQuizStore = {
        title: quiz.title,
        companyId: quiz.companyId,
        questions: questions,
        totalTime: quiz.totalTime
    };

    return async dispatch => {
        db.collection(quizCollectionPath).doc().set(_quiz)
            .then(() => {
                // successfully added
                dispatch({
                    type: CREATE_QUIZ_SUCCESS,
                });
            })
            .catch((error : any) => {
                // something went wrong
                dispatch({
                    type : CREATE_QUIZ_FAILED,
                    error : error
                });
            });
    }
};

export const updateQuiz = (quiz: IQuiz, docId: string): ThunkAction<void, RootState, null, CrudAction> => {

    let questions: IQuestion[] = [];
    quiz.questions.forEach((value => {
        questions.push(value);
    }));
    const db = fire.firestore();
    const _quiz: IQuizStore = {
        title: quiz.title,
        companyId: quiz.companyId,
        questions: questions,
        totalTime: quiz.totalTime
    };

    return async dispatch => {
        db.collection(quizCollectionPath).doc(docId).set({
            title: _quiz.title,
            questions: _quiz.questions
        },{ merge: true })
            .then(() => {
                dispatch({
                    type : UPDATE_QUIZ_SUCCESS
                })
            })
            .catch(() => {
                dispatch({
                    type : UPDATE_QUIZ_FAILED
                })
            });
    }
};