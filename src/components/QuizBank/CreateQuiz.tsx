import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IQuestion, IQuiz, IQuizStore} from "../../store/type";
import {RootState} from "../../store/reducers/rootReducer";
import {CreateQuestionModal} from "./CreateQuestionModal";
import {useHistory, useLocation} from "react-router";
import {v4 as uuidv4} from 'uuid';
import {DeleteQuestionConfirmModal} from "./DeleteQuestionConfirmModal";
import {saveQuiz, updateQuiz} from "../../store/actions/quizActions";
import {
    CREATE_QUIZ_DEFAULT,
    CREATE_QUIZ_FAILED,
    CREATE_QUIZ_SUCCESS, UPDATE_QUIZ_FAILED,
    UPDATE_QUIZ_SUCCESS
} from "../../store/actionTypes";
import {Failure, Success} from "../../util/toasts";
import {fire} from "../../index";
import Skeleton from "react-loading-skeleton";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export function CreateQuiz(): JSX.Element {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { user : {email} } = useSelector((state: RootState) => state.auth);
    const {type, error, message} = useSelector((state: RootState) => state.quiz);
    const [loading, setLoading] = useState<boolean>(true);
    const [id, setId] = useState<string>();
    const isUpdate = useRef<Boolean>(false);
    const isViewOnly = useRef<Boolean>(false);

    const [validation,setValidation] = useState({
        titleReq : false
    });

    const [quiz, setQuiz] = useState<IQuiz>({
        title: "",
        companyId: email,
        questions: new Map<string, IQuestion>(),
        totalTime: 1
    });

    const question = useRef<IQuestion>({
        question: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        correctOption: 0
    });

    useEffect(()=> {
        isViewOnly.current = false;
        isUpdate.current = false;
        let docID = location.hash.split('#quiz/update/question?id=');
        if(!docID || docID.length <= 1) {
            docID = location.hash.split("#quiz/view/question?id=");
            if(!!docID && docID.length >= 2)
                isViewOnly.current = true;
        } else if(!!docID && docID.length >= 2){
            isUpdate.current = true;
        }

        if(docID.length >= 2) {
            fire.firestore().collection("quiz_bank").doc(docID[1].trim()).get()
                .then((doc) => {
                    if(doc.exists && (doc.data() as IQuiz).companyId === email) {
                        setId(doc.id);
                        let data: IQuizStore = doc.data() as IQuizStore;
                        let _data: IQuiz = {
                            title: "",
                            companyId: email,
                            questions: new Map<string, IQuestion>(),
                            totalTime: 1
                        };
                        _data.title = data.title;
                        _data.companyId = email;
                        _data.totalTime = data.totalTime;
                        let _questions = new Map<string, IQuestion>();
                        for(const q of data.questions) {
                            _questions.set(uuidv4(), q);
                        }
                        _data.questions = _questions;
                        setQuiz(_data);
                        setLoading(false);
                    } else {
                        // not found
                        setLoading(false);
                        history.push('#dashbord/not-found');
                    }
                });
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if (type === CREATE_QUIZ_SUCCESS) {
            Success(message as string);
            dispatch({
                type: CREATE_QUIZ_DEFAULT
            });
            history.push("#quiz/bank");
        } else if(type === CREATE_QUIZ_FAILED) {
            Failure(error as string);
            dispatch({
                type : CREATE_QUIZ_DEFAULT
            });
        } else if(type === UPDATE_QUIZ_SUCCESS) {
            Success(message as string);
            dispatch({
                type : CREATE_QUIZ_DEFAULT
            });
            history.push("#quiz/bank");
        } else if(type === UPDATE_QUIZ_FAILED) {
            Failure(error as string);
            dispatch({
                type : CREATE_QUIZ_DEFAULT
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type, error, message, dispatch]);

    function onSubmit(isUpdate: React.MutableRefObject<Boolean>) {
        setValidation(prevState => ({
            ...prevState,
            titleReq: !quiz.title
        }))

        if(!!quiz.title) {
            if(!isUpdate.current.valueOf()) {
                dispatch(saveQuiz(quiz));
            } else {
                dispatch(updateQuiz(quiz, id || ""));
            }
        }
    }

    function onDelete() {
        confirmAlert({
            title: "Confirm Your Action",
            message: `Are sure want to delete ?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fire.firestore().collection("quiz_bank").doc(id)
                            .delete()
                            .then(()=> {
                                Success("Quiz has been deleted successfully!");
                                history.push("#quiz/bank");
                            })
                            .catch((error)=> {
                                Failure(error as string);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        // do nothing
                    }
                }
            ]
        });
    }

    return (
        <>
            {
                loading &&
                <Skeleton count={20} duration={20}/>
            }
            { !loading &&
                <>
            <div className="pd-20 card-box mb-30">
                    <form className="needs-validation">

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Title<sup>*</sup></label>
                                    <input className="form-control" type="text" placeholder="Title" required
                                           disabled={isViewOnly.current.valueOf()}
                                           value={quiz.title}
                                           onChange={(e) => {
                                               setQuiz(prevState => ({
                                                   ...prevState,
                                                   title: e.target.value
                                               }));
                                               setValidation(prevState => ({
                                                   ...prevState,
                                                   titleReq: !e.target.value
                                               }));
                                           }}
                                    />
                                    {
                                        validation.titleReq &&
                                        <small className="invalid-feedback">Title is required.</small>
                                    }
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Total Time Duration (Minutes)<sup>*</sup></label>
                                    <input className="form-control"
                                           type="number"
                                           placeholder="Total Time Duration (Minutes)"
                                           required
                                           disabled={isViewOnly.current.valueOf()}
                                           value={quiz.totalTime}
                                           onChange={(e) => {
                                               setQuiz(prevState => ({
                                                   ...prevState,
                                                   totalTime: Number(e.target.value)
                                               }));
                                           }}
                                    />
                                    {
                                        quiz.totalTime < 1 &&
                                        <small className="invalid-feedback">Minimum time duration is one minute!</small>
                                    }
                                </div>
                            </div>

                        </div>
                    </form>

                    <div className="view-content">

                        {
                            !!quiz && Array.from(quiz.questions.entries()).map((value, index) =>
                            {
                                return (
                                    <div key={`${value[0]}-question-block`}>
                                        <div className="row-1 views-row" key={`${value[0]}-row`}>
                                            <div className="col-md-12" key={`${value[0]}-col`}>
                                                <h4 key={`${value[0]}-title`}
                                                    className="views-field views-field-field-questionn">
                                                    {index+1}. {value[1].question}</h4>
                                                <ol key={`${value[0]}-options-list`}>
                                                    <li key={`${value[0]}-option-1`}
                                                        className="views-field views-field-field">
                                                        1. {value[1].optionOne}</li>
                                                    <li key={`${value[0]}-option-2`}
                                                        className="views-field views-field-field">
                                                        2. {value[1].optionTwo}</li>
                                                    <li key={`${value[0]}-option-3`}
                                                        className="views-field views-field-field">
                                                        3. {value[1].optionThree}</li>
                                                </ol>
                                                <h6 className="views-field views-field-field-answer"
                                                    key={`${value[0]}-correct-option`}>Correct Option
                                                    - {value[1].correctOption}</h6>
                                            </div>
                                        </div>
                                        {
                                            !isViewOnly.current.valueOf() &&
                                            <div className="d-flex justify-content-start" key={`${value[0]}-button-group`}>
                                                <button type="button" className="btn btn-warning btn-left-margin"
                                                        key={`${value[0]}-button-group-edit`}
                                                        onClick={() => {
                                                            question.current = value[1];
                                                            history.push(`#quiz/create/edit-question?id=${value[0]}`);
                                                        }}
                                                >Edit
                                                </button>
                                                {/*  apply processing param here for disabled */}
                                                <button className="btn btn-danger btn-left-margin"
                                                        key={`${value[0]}-button-group-delete`}
                                                        onClick={() => {
                                                            history.push(`#quiz/create/delete-question?id=${value[0]}`);
                                                        }}
                                                >Delete
                                                </button>
                                            </div>
                                        }
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                 {
                    !isViewOnly.current.valueOf() && <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-warning mr-3"
                                onClick={() => history.push(`#quiz/create/add-question?id=${uuidv4()}`)}
                        >Add Question
                        </button>
                        {
                            isUpdate.current.valueOf() && <>
                            <button className="btn btn-outline-danger" disabled={loading}
                                    onClick={() => {
                                        onDelete();
                                    }}
                            >Delete
                            </button>
                                &nbsp;
                                &nbsp;
                            </>
                        }
                        <button className="btn btn-primary" disabled={loading}
                                onClick={() => {
                                    onSubmit(isUpdate);
                                }}
                        >Save
                        </button>
                    </div>
                 }
                </div>

                    {
                        !isViewOnly.current.valueOf() &&
                            <>
                                <CreateQuestionModal onQuestionComplete={(returnedQuestion: any)=> {
                                    quiz.questions.set(returnedQuestion["id"], returnedQuestion["quiz"]);
                                }}
                                                     initQuestion={question.current}
                                                     isOpen={location.hash.startsWith("#quiz/create/add-question?id=")
                                                     || location.hash.startsWith('#quiz/create/edit-question?id=')}
                                                     isEdit={location.hash.startsWith('#quiz/create/edit-question?id=')}
                                                     onClose={()=> {
                                                         question.current = {
                                                             question: "",
                                                             optionOne: "",
                                                             optionTwo: "",
                                                             optionThree: "",
                                                             correctOption: 0
                                                         }
                                                     }}
                                />

                                <DeleteQuestionConfirmModal handleConfirm={(id: string)=> {
                                    quiz.questions.delete(id);
                                }} _show={location.hash.startsWith("#quiz/create/delete-question?id=")}
                                />
                            </>

                    }
                </>
            }
        </>
    )
}