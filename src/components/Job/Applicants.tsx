import React from "react";
import MUIDataTable from "mui-datatables";
import {TableLoading} from "../Common/Other/TableLoading";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";

export function Applicants({isClosed}: {isClosed: boolean}) {

    const {loading, data} = useSelector((state: RootState) => state.applicantsTable);

    let columns = [
        {
            label: 'No.',
            name: 'id',
            options : {
                filter : false
            }
        },
        {
            label: 'Applicant ID',
            name: 'applicantId'
        },
        {
            label: 'Full Name',
            name: 'fullName',
            options : {
                filter : false
            }
        },
        {
            label: 'Phone Number',
            name: 'phoneNumber',
            options : {
                filter : false
            }
        },
        {
            label: 'DOB',
            name: 'dob',
            options : {
                filter : false,
                display: false
            }
        },
        {
            label: 'Gender',
            name: 'gender'
        },
        {
            label: 'Test Score',
            name: 'testScore',
            options: {
                filter: false
            }
        },
        {
          label: 'Status',
          name: 'statusView'
        }
    ];

    if(!isClosed) {
        columns.push({
            label: 'Actions',
            name: 'action',
            options: {
                filter: false
            }
        });
    }

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
                title={"Applicants"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}