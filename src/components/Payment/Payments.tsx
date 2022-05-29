import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getPaymentHistory} from "../../store/actions/tableActions";
import {TableLoading} from "../Common/Other/TableLoading";
import {validateDateFormat} from "../../util/regex";

console.error = () => {};

export function Payment() {

    const { user : {email} } = useSelector((state: RootState) => state.auth);
    let date_from  = new Date();
    let date_to = new Date();
    date_to.setDate(date_to.getDate()-7);
    const dispatch = useDispatch();
    const {loading, data } = useSelector((state: RootState) => state.paymentHistoryTable);
    const [from, setFrom] = useState<string>(date_from.toISOString().split('T')[0]);
    const [to, setTo] = useState<string>(date_to.toISOString().split('T')[0]);

    const columns = [
        {
            label: 'Date',
            name: 'date',
            options: {
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    logic: (date: any) => {
                        const val1 = new Date(from) as any;
                        const val2 = new Date(to) as any;
                        const val3 = new Date(date) as any;
                        return !(val1 >= val3 && val2 <= val3);

                    },
                    display: (filterList: any, onChange: any, index: any, column: any) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="form-group mb-0">
                                        <label>From</label>
                                        <input type="date" className="form-control"
                                               value={from}
                                               onChange={(e) => {
                                                   setFrom(e.target.value?.trim());
                                                   filterList[index][0] = e.target.value;
                                                   onChange(filterList[index], index, column);
                                               }}
                                        />
                                        {
                                            !validateDateFormat(from) &&
                                            <small className="invalid-feedback">Invalid Date Format</small>
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-0">
                                        <label>To</label>
                                        <input type="date" className="form-control"
                                               value={to}
                                               onChange={(e) => {
                                                   setTo(e.target.value?.trim());
                                                   filterList[index][1] = e.target.value;
                                                   onChange(filterList[index], index, column);
                                               }}
                                        />
                                        {
                                            !validateDateFormat(to) &&
                                            <small className="invalid-feedback">Invalid Date Format</small>
                                        }
                                    </div>
                                </div>
                            </>
                        );
                    }
                }
            }
        },
        {
            label: 'Time',
            name: 'time',
            options : {
                filter : false
            }
        },
        {
            label: 'Full Name',
            name: 'fullName',
            options : {
                filter : false
            }
        },
        {
            label: 'Applicant Email ID',
            name: 'userId',
            options : {
                filter : false
            }
        },
        {
            label: 'Profile',
            name: 'userProfileView',
            options : {
                filter : false
            }
        },
        {
            label: 'Bank Name',
            name: 'bankName'
        },
        {
            label: 'Branch Name',
            name: 'branch'
        },
        {
            label: 'Account Number',
            name: 'accountNo',
            options : {
                filter : false
            }
        },
        {
            label: 'Paid Amount',
            name: 'amount'
        },
        {
            label: 'Action & Status',
            name: 'status',
            options: {
                filter: false
            }
        }
    ];

    useEffect(() => {
        dispatch(getPaymentHistory(email));
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
                title={"Payments"}
                data={data}
                columns={columns as any}
                options={options}
                key={"table-payment"}
            />
        </div>
    )
}
