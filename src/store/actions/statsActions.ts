import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import {StatActions} from "../type";
import {fire} from "../../index";
import {CLOSED_JOBS, LOADING, OPEN_JOBS, TOTAL_JOBS} from "../actionTypes";

const jobCollectionPath = "jobs";

let unsubscribedStatsTotalJobs : Function;
let unsubscribedStatsActiveWorkers : Function;
let unsubscribedStatsOpenJobs : Function;
let unsubscribedStatsCloseJobs : Function;

export function unsubscribedStatsFun()  {
    if(!!unsubscribedStatsTotalJobs)
        unsubscribedStatsTotalJobs();

    if(!!unsubscribedStatsActiveWorkers)
        unsubscribedStatsActiveWorkers();

    if(!!unsubscribedStatsOpenJobs)
        unsubscribedStatsOpenJobs();

    if(!!unsubscribedStatsCloseJobs)
        unsubscribedStatsCloseJobs();
}

export const getStats = (companyId: string) : ThunkAction<void, RootState, null, StatActions> => dispatch  => {

    const db = fire.firestore();

    dispatch({
        type : LOADING,
        count: 0
    });

    unsubscribedStatsTotalJobs = db.collection(jobCollectionPath)
        .where("companyId","==", companyId)
        .onSnapshot((querySnapshot) => {
            dispatch({
                type : TOTAL_JOBS,
                count: querySnapshot.size
            });
        });

    unsubscribedStatsOpenJobs = db.collection(jobCollectionPath)
        .where("companyId","==", companyId)
        .where("status", "==", "OPEN")
        .onSnapshot((querySnapshot) => {
            dispatch({
                type : OPEN_JOBS,
                count: querySnapshot.size
            });
        });

    unsubscribedStatsCloseJobs = db.collection(jobCollectionPath)
        .where("companyId","==", companyId)
        .where("status", "==", "CLOSED")
        .onSnapshot((querySnapshot) => {
            dispatch({
                type : CLOSED_JOBS,
                count: querySnapshot.size
            });
        });
};