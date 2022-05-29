import React, {useEffect} from "react";
import jobIcon from "../../resources/icons/job_icon.svg";
import employeeIcon from "../../resources/icons/employee_icon.svg";
import runningIcon from "../../resources/icons/running_icon.svg";
import doneIcon from "../../resources/icons/done_icon.svg";
import {useDispatch, useSelector} from "react-redux";
import {getStats, unsubscribedStatsFun} from "../../store/actions/statsActions";
import {RootState} from "../../store/reducers/rootReducer";
import Skeleton from "react-loading-skeleton";

const Card01 = ({loading, count}: {loading: boolean, count: number}) => {

    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                {!loading ? <h1>{count || 0}</h1> : <Skeleton />}
                <h5>Total Jobs</h5>
            </div>
        </div>
    )
};

const Card02 = ({loading, count}: {loading: boolean, count: number}) => {

    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                {!loading ? <h1>{count || 0}</h1> : <Skeleton />}
                <h5>Open Jobs</h5>
            </div>
        </div>
    )
};

const Card03 = ({loading, count}: {loading: boolean, count: number}) => {

  return (
      <div className="col-9 col-md-10 col-xl-9">
          <div className="m-4 card-details">
              {!loading ? <h1>{count || 0}</h1> : <Skeleton />}
              <h5>Active Workers</h5>
          </div>
      </div>
  )
};

const Card04 =  ({loading, count}: {loading: boolean, count: number}) => {
    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                {!loading ? <h1>{count || 0}</h1> : <Skeleton />}
                <h5>Completed Jobs</h5>
            </div>
        </div>
    )
};

export function Dashboard() {

    const { user : {email} } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getStats(email));

        return () => {
            unsubscribedStatsFun();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const { loading, openJobs, totalJobs, closedJobs } = useSelector((state: RootState) => state.statsReducer);

    return (
        <div className="pd-ltr-20">
            <div className="row">
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <Card01 count={totalJobs} loading={loading}/>
                            <div className="col-3 col-md-2 col-xl-3 bg-dblue card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={jobIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <Card02 count={openJobs} loading={loading}/>
                            <div className="col-3 col-md-2 col-xl-3 bg-dcyan card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={employeeIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <Card03 count={5} loading={loading}/>
                            <div className="col-3 col-md-2 col-xl-3 bg-dpurple card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={runningIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <Card04 count={closedJobs} loading={loading}/>
                            <div className="col-3 col-md-2 col-xl-3 bg-dgreen card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={doneIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-xl-6 mb-30 ">
                </div>

                <div className="col-xl-6 mb-30">
                </div>
            </div>
        </div>
    );
}
