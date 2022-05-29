import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import {IQuestion} from "../../store/type";

export function CreateQuestionModal({onQuestionComplete , initQuestion, isOpen, isEdit, onClose} :
                                        {onQuestionComplete : any , initQuestion : IQuestion, isOpen : boolean,
                                            isEdit: boolean, onClose: any}) {

    const location = useLocation();
    let id: string;
    if(!isEdit) {
        id = location.hash.split("#quiz/create/add-question?id=")[1];
    } else {
        id = location.hash.split("#quiz/create/edit-question?id=")[1];
    }

    const history = useHistory();
    const [valid, setValid] = useState<boolean>(true);
    const [question, setQuestion] = useState<IQuestion>({
        question: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        correctOption: 0
    });

    const [validation, setValidation] = useState({
        questionReq: false,
        optionOneReq: false,
        optionTwoReq: false,
        optionThreeReq: false
    });

    useEffect(()=> {
        if((question.correctOption > 0 && question.correctOption < 4)) {
            setValid(true);
        }
        else
            setValid(false);
    },[question]);

    useEffect(()=> {
        setQuestion(initQuestion)
    },[initQuestion]);

    function onSubmit() {

        setValidation(prevState => ({
            ...prevState,
            questionReq: !question.question,
            optionOneReq: !question.optionOne,
            optionTwoReq: !question.optionTwo,
            optionThreeReq: !question.optionThree
        }));

        if(valid && question.question && question.optionOne && question.optionTwo &&
        question.optionThree) {
            onQuestionComplete({"quiz": question, "id": id});
            history.goBack();
        }
    }

    return (
        <div className={`modal fade ${isOpen ? "show d-block" : ""}`} id="exampleModal"  role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{isEdit ? "Edit" : "Add"} Question</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => {
                                    history.goBack();
                                    onClose();
                                }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        {
                            !valid && <small className="invalid-feedback">Select a correct option.</small>
                        }

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Question<sup>*</sup></label>
                                    <input className="form-control" type="text" placeholder="Question" required
                                           value={question.question}
                                           onChange={(e) => {
                                               setQuestion(prevState => ({
                                                   ...prevState,
                                                   question : e.target.value
                                               }));
                                               setValidation(prevState => ({
                                                   ...prevState,
                                                   questionReq : !e.target.value
                                               }));
                                           }}
                                    />
                                    {
                                        validation.questionReq &&
                                        <small className="invalid-feedback">Question is required.</small>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Option 01<sup>*</sup></label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" id="radio-option-1" name="options"
                                           onChange={(e)=> {if(e.target.checked)
                                               setQuestion(prevState => ({
                                                   ...prevState,
                                                   correctOption: 1
                                               }));}}
                                    />
                                    <input className="form-control" type="text" placeholder="Option 01" required
                                           value={question.optionOne}
                                           onChange={(e) => {
                                               setQuestion(prevState => ({
                                                   ...prevState,
                                                   optionOne : e.target.value
                                               }));
                                               setValidation(prevState => ({
                                                   ...prevState,
                                                   optionOneReq : !e.target.value
                                               }));
                                           }}
                                    />
                                    {
                                        validation.optionOneReq &&
                                        <small className="invalid-feedback">Option 01 is required.</small>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Option 02<sup>*</sup></label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" id="radio-option-2" name="options"
                                           onChange={(e)=> {if(e.target.checked)
                                               setQuestion(prevState => ({
                                                   ...prevState,
                                                   correctOption: 2
                                               }));}}
                                    />
                                    <input className="form-control" type="text" placeholder="Option 02" required
                                           value={question.optionTwo}
                                           onChange={(e) => {
                                               setQuestion(prevState => ({
                                                   ...prevState,
                                                   optionTwo : e.target.value
                                               }));
                                               setValidation(prevState => ({
                                                   ...prevState,
                                                   optionTwoReq : !e.target.value
                                               }));
                                           }}
                                    />
                                    {
                                        validation.optionTwoReq &&
                                        <small className="invalid-feedback">Option 02 is required.</small>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Option 03<sup>*</sup></label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" id="radio-option-3" name="options"
                                        onChange={(e)=> {if(e.target.checked)
                                            setQuestion(prevState => ({
                                                ...prevState,
                                                correctOption: 3
                                            }));}}
                                    />
                                    <input className="form-control" type="text" placeholder="Option 03" required
                                           value={question.optionThree}
                                           onChange={(e) => {
                                               setQuestion(prevState => ({
                                                   ...prevState,
                                                   optionThree : e.target.value
                                               }));
                                               setValidation(prevState => ({
                                                   ...prevState,
                                                   optionThreeReq : !e.target.value
                                               }));
                                           }}
                                    />
                                    {
                                        validation.optionThreeReq &&
                                        <small className="invalid-feedback">Option 03 is required.</small>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" data-dismiss="modal" className="btn btn-outline-warning"
                                onClick={() =>
                                    setQuestion(prevState => ({
                                        ...prevState,
                                        question: "",
                                        optionOne: "",
                                        optionTwo: "",
                                        optionThree: ""
                                    }))
                                }
                        >Clear</button>
                        <button type="button" data-dismiss="modal" className="btn btn-primary"
                                onClick={() => onSubmit()}
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}