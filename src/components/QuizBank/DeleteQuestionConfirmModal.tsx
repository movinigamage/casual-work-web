import {useHistory, useLocation} from "react-router";

export function DeleteQuestionConfirmModal({handleConfirm, _show}: {handleConfirm: any, _show: boolean}) {

    const location = useLocation();
    const history = useHistory();

    const id = location.hash.split("#quiz/create/delete-question?id=")[1];

    return (
        <div className={`modal fade ${_show ? "show d-block" : ""}`} id="exampleModal"  role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Confirm It</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => {
                                    history.goBack();
                                }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">

                    </div>

                    <div className="modal-footer">
                        <button type="button" data-dismiss="modal" className="btn btn-warning"
                                onClick={() => {history.goBack();}}
                        >Close</button>
                        <button type="button" data-dismiss="modal" className="btn btn-danger"
                                onClick={() => {handleConfirm(id); history.goBack();}}
                        >Yes, Confirm It</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

