import {StatActions, StatsState} from "../type";
import {CLOSED_JOBS, LOADING, OPEN_JOBS, TOTAL_JOBS} from "../actionTypes";


const initStatsState : StatsState = {
    loading : true,
    totalJobs: 0,
    activeWorkers: 0,
    openJobs: 0,
    closedJobs: 0
};

export const statsReducer = ( state: StatsState = initStatsState, action: StatActions) => {
    switch (action.type) {
        case TOTAL_JOBS:
            return  {
                ...state,
                loading: false,
                totalJobs: action.count
            };
        case OPEN_JOBS:
            return  {
                ...state,
                loading: false,
                openJobs: action.count
            };
        case CLOSED_JOBS:
            return  {
                ...state,
                loading: false,
                closedJobs: action.count
            };
        case LOADING:
            return {
                ...state,
                loading : true
            };
        default: return state
    }
};