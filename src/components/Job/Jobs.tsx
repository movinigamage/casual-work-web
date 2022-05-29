import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import MUIDataTable from "mui-datatables";
import {TableLoading} from "../Common/Other/TableLoading";
import {getJobs} from "../../store/actions/tableActions";

export function Jobs() {

    const columns = [
        {
            label: 'No.',
            name: 'id',
            options : {
                filter : false
            }
        },
        {
            label: 'Field',
            name: 'field',
            options : {
                filter : true
            }
        },
        {
            label: 'Title',
            name: 'title',
            options : {
                filter : true
            }
        },
        {
            label: 'Hourly Rate (LKR)',
            name: 'hourlyRate',
            options : {
                filter : false
            }
        },
        {
            label: 'Date',
            name: 'date',
            options : {
                filter : false
            }
        },
        {
            label: 'Shift On',
            name: 'shiftOn',
            options : {
                filter : false
            }
        },
        {
            label: 'Shift Off',
            name: 'shiftOff',
            options : {
                filter : false
            }
        },
        {
            label: 'Total Estimated Cost (LKR)',
            name: 'totalEstimatedCost',
            options : {
                filter : false,
                display : false
            }
        },
        {
            label: 'Address',
            name: 'address',
            options: {
                filter: false,
                display: false
            }
        },
        {
            label: 'Location',
            name: 'locationView',
            options: {
                filter: false,
                display: false
            }
        },
        {
            label: 'Status',
            name: 'statusView',
            options : {
                filter : false
            }
        },
        {
            label: 'Actions',
            name : 'action',
            options : {
                filter : false
            }
        }
    ];

    const dispatch = useDispatch();
    const { user : {email} } = useSelector((state: RootState) => state.auth);
    const {loading, data } = useSelector((state: RootState) => state.jobTable);


    useEffect(() => {
        dispatch(getJobs(email));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const options = {
        searchPlaceholder : "search ...",
        selectableRowsHeader : false,
        selectableRowsHideCheckboxes : true,
        textLabels: {
            body: {
                noMatch: loading ?
                    <TableLoading/> :
                    'Sorry, there is no matching data to display',
            },
        }
    };

    return (
        <div className="card-box mb-30 ">
            <MUIDataTable
                title={"Jobs"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
