import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {menuReducer} from "./otherReducer";
import {companyProfileUpdateReducer, companyRegistrationReducer} from "./companyReducer";
import {quizReducer} from "./quizReducer";
import {applicantsReducer, jobReducer, paymentHistoryReducer, quizTableReducer} from "./tableReducer";
import {postJobReducer} from "./jobReducer";
import {statsReducer} from "./statsReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    menu: menuReducer,
    companyRegistration: companyRegistrationReducer,
    companyProfileUpdate: companyProfileUpdateReducer,
    quiz: quizReducer,
    quizTable: quizTableReducer,
    postJob: postJobReducer,
    jobTable: jobReducer,
    paymentHistoryTable: paymentHistoryReducer,
    applicantsTable: applicantsReducer,
    statsReducer: statsReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;
