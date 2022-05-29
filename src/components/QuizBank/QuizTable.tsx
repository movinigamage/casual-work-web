import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import MUIDataTable from "mui-datatables";
import {TableLoading} from "../Common/Other/TableLoading";
import {getQuizSets} from "../../store/actions/tableActions";

export function QuizTable() {

    const columns = [
        {
            label: 'No.',
            name: 'id',
            options : {
                filter : false
            }
        },
        {
            label: 'Title',
            name: 'title',
            options : {
                filter : false
            }
        },
        {
            label: 'Number of Questions',
            name: 'numberOfQuestions',
            options : {
                filter : false
            }
        },
        {
            label: 'Total Time (Minutes)',
            name: 'totalTime',
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
    const {loading, data } = useSelector((state: RootState) => state.quizTable);

    useEffect(() => {
        dispatch(getQuizSets(email));
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
                title={"Quiz Sets"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
