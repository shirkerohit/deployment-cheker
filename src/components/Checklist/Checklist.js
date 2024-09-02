import { useEffect, useState } from "react";

const Checklist = () => {

    const [showChecklist, setShowChecklist] = useState(true);

    return (
        <>
            <div className="grid text-center mt-5">
                {showChecklist ?
                    <List></List>
                    : <div>Click "add" to start a new release</div>
                }
            </div>
        </>
    );
}

const List = (props) => {

    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "Project Name?",
            placehoder: "Which project this build belong to?",
            summaryKeyValue: "Project",
            isReleaseKey: true,
            isReleaseNoteKey: false,
        },
        {
            id: 2,
            question: "What is the purpose of the build?",
            placehoder: "Explain in short what is this build about",
            summaryKeyValue: "Requirement",
            isReleaseKey: true,
            isReleaseNoteKey: true,
        },
        {
            id: 3,
            question: "Do you have jira id?",
            placehoder: "Add jira link or confluence link",
            summaryKeyValue: "Jira",
            isReleaseKey: true,
            isReleaseNoteKey: true,
        },
        {
            id: 4,
            question: "What is the branch name?",
            placehoder: `Should follow "dev-<dev-name>-feature-name" syntax`,
            summaryKeyValue: "Branch Name",
            isReleaseKey: true,
            isReleaseNoteKey: false,
        },
        {
            id: 5,
            question: "Have you synced branch with master?",
            placehoder: `git fetch origin master/main?`,
            summaryKeyValue: "Synced with master",
            isReleaseKey: true,
            isReleaseNoteKey: false,
        },
        {
            id: 5,
            question: "Is dev unit testing done for this feature?",
            placehoder: "Are enough cases covered? Any edge cases?",
            summaryKeyValue: "Dev Unit testing",
            isReleaseKey: true,
            isReleaseNoteKey: false,
        },
        {
            id: 6,
            question: "Do we have QA sign-off?",
            placehoder: "",
            summaryKeyValue: "QA sign-off",
            isReleaseKey: true,
            isReleaseNoteKey: false,
        },
        {
            id: 7,
            question: "Are there any DB changes?",
            placehoder: "",
            summaryKeyValue: "DB Changes",
            isReleaseKey: true,
            isReleaseNoteKey: false,
        },
        {
            id: 8,
            question: "Are there any Saparate CSS/JS/Images changes?",
            placehoder: "",
            summaryKeyValue: "Any CSS/JS/Images",
            isReleaseKey: true,
            isReleaseNoteKey: false,
        },
        {
            id: 9,
            question: "Any remarks you think should be added?",
            placehoder: "",
            summaryKeyValue: "Note",
            isReleaseKey: true,
            isReleaseNoteKey: true,
        }
    ]
    );

    const [answers, setAnswers] = useState(Array(questions.length).fill(""));

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState({});
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [isFirstQuestion, setIsFirstQuestion] = useState(true);
    const [error, setError] = useState("");
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        if (questions[activeQuestionIndex] !== undefined) {
            setActiveQuestion(questions[activeQuestionIndex]);
            if (questions.length - 1 === activeQuestionIndex) {
                setIsLastQuestion(true);
            } else {
                setIsLastQuestion(false);
            }
            if (activeQuestionIndex === 0) {
                setIsFirstQuestion(true);
            } else {
                setIsFirstQuestion(false);
            }
        }
    }, [activeQuestionIndex]);

    const nextQuestion = () => {
        if (answers[activeQuestionIndex] !== '') {
            if (activeQuestionIndex < questions.length - 1) {
                setActiveQuestionIndex(activeQuestionIndex + 1);
                document.getElementById(questions[activeQuestionIndex].id + '-answer').focus();
            }
            else {
                toggleSummary();
            }
        } else {
            setError("Please fill the answer");
        }
    }

    const previousQuestion = () => {
        if (activeQuestionIndex > 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    }

    const updateAnswer = (event) => {
        const newAnswers = [...answers];
        newAnswers[activeQuestionIndex] = event.target.value;
        setAnswers(newAnswers);
    }

    const toggleSummary = () => {
        setShowSummary(!showSummary);
    }

    return (
        <>
            {!showSummary ?
                <div className="grid grid-cols-1 gap-4 m-10">
                    <div className="">
                        <div className="flex justify-center">
                            <div className="text-center">
                                <h1 className="text-md">Release Checklist ({activeQuestionIndex + 1}/{questions.length})</h1>
                            </div>
                        </div>
                    </div >
                    <div className="bg-white px-10 py-10">
                        {activeQuestion != undefined ?
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-5" htmlFor="purpose">
                                    {activeQuestion.question}
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-6/12 py-2 px-3 focus:outline-none focus:shadow-outline"
                                    id={activeQuestion.id + '-answer'}
                                    type="text"
                                    placeholder={activeQuestion.placehoder}
                                    onInput={updateAnswer}
                                    value={answers[activeQuestionIndex]}
                                    autoFocus="true"
                                />
                                <div className="mt-5 mb-5">
                                    <div className="text-red-500 text-xs italic">{error ? error : " "}</div>
                                </div>
                                <div className="text-center">
                                    <button type="button" className=
                                        {isFirstQuestion ? "rounded border border-gray-300 px-3 py-1 text-xs mr-2 cursor-not-allowed bg-gray-200"
                                            : "rounded border border-gray-300 px-3 py-1 text-xs mr-2"}
                                        disabled={isFirstQuestion} onClick={previousQuestion} tabIndex={1}> Prev </button>
                                    {!isLastQuestion ?
                                        <button type="button" className=
                                            {isLastQuestion ? "rounded border border-gray-300 px-3 py-1 text-xs mr-2 cursor-not-allowed bg-gray-200"
                                                : "rounded border border-gray-300 px-3 py-1 text-xs mr-2"}
                                            disabled={isLastQuestion} onClick={nextQuestion} tabIndex={0}> Next </button>
                                        : ''}
                                    {isLastQuestion ?
                                        <button type="button" className="rounded border border-gray-300 px-3 py-1 text-xs mr-2"
                                            onClick={nextQuestion}> Submit </button>
                                        : ""}
                                </div>
                            </div>
                            : "No questions"}
                    </div>
                </div >
                : <Summary question={questions} answers={answers}></Summary >}
        </>
    );
}

const Summary = (props) => {

    const questions = props.question;
    const answers = props.answers;

    const [summary, setSummary] = useState("");
    const [releaseNote, setReleaseNote] = useState("");

    useEffect(() => {
        let summary = questions.map((question, index) => {
            return question.summaryKeyValue + " : " + answers[index] + "\n";
        }).join('');
        setSummary(summary);
        localStorage.setItem('release-summary', JSON.stringify(summary));

        let releaseNote = questions.map((question, index) => {
            if (question.isReleaseNoteKey) {
                return question.summaryKeyValue + " : " + answers[index] + "\n";
            }
        }).join('');
        setReleaseNote(releaseNote);
        localStorage.setItem('release-note', JSON.stringify(releaseNote));

    }, [questions, answers]);

    const copyReleaseSummary = () => {
        navigator.clipboard.writeText(summary);
        alert('Copied!');
    }

    const copyReleaseNote = () => {
        navigator.clipboard.writeText(releaseNote);
        alert('Copied!');
    }


    return (
        <div className="grid grid-cols-1 gap-4 ">
            <div className="flex justify-center">
                <div className="text-center">
                    <h1 className="text-xl underline">Release Checklist Summary</h1>
                </div>
            </div >
            <div className="bg-white shadow px-5 py-5" id="summary">
                {questions.map((question, index) => (
                    <div className="mb-2" key={index}>
                        <label className="block text-gray-700 text-md" htmlFor="purpose">
                            Q : {question.question}
                        </label>
                        <label className="block text-green-600 text-sm" htmlFor="purpose">
                            A : {answers[index]}
                        </label>
                    </div>
                ))}
                <div className="text-center mt-5">
                    <button type="button" className="rounded border border-gray-300 px-3 py-1 text-xs mr-2"
                        onClick={copyReleaseNote}> Copy release note </button>
                    <button type="button" className="rounded border border-gray-300 px-3 py-1 text-xs mr-2"
                        onClick={copyReleaseSummary}> Copy release summary </button>
                </div>
            </div>
        </div >

    );
}


export default Checklist;