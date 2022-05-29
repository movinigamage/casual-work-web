import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import {fire} from "../../index";
import {
    POST_JOB_FAILED,
    POST_JOB_SUCCESS
} from "../actionTypes";
import {
    CrudAction, IJob
} from "../type";

const jobCollectionPath = "jobs";
export const OPEN = "OPEN";
export const CLOSED = "CLOSED";

export const postJob = (job: IJob): ThunkAction<void, RootState, null, CrudAction> => {

    const db = fire.firestore();

    return async dispatch => {
        job.status = OPEN;
        db.collection(jobCollectionPath).doc().set(job)
            .then(() => {
                // successfully added
                dispatch({
                    type: POST_JOB_SUCCESS,
                    message: "Posted your job successfully!"
                });
            })
            .catch((error : any) => {
                // something went wrong
                dispatch({
                    type : POST_JOB_FAILED,
                    error : error
                });
            });
    }
};