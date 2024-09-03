import { useContext, useEffect, useState } from "react";
import allQuestions from "../../context/questions";
import AppContext from "../../context/appcontext";

const List = () => {

    const questions = allQuestions;
    const { setSummary, setActiveComponent } = useContext(AppContext);
    const [answers, setAnswers] = useState(Array(questions.length).fill(""));
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState({});
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [isFirstQuestion, setIsFirstQuestion] = useState(true);
    const [error, setError] = useState("");

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
    }, [questions, activeQuestionIndex]);

    const nextQuestion = () => {
        if (answers[activeQuestionIndex] !== '') {
            if (activeQuestionIndex < questions.length - 1) {
                setActiveQuestionIndex(activeQuestionIndex + 1);
                document.getElementById(questions[activeQuestionIndex].id + '-answer').focus();
            }
            else {
                setSummary({
                    answers: answers,
                });
                setActiveComponent('summary');
            }
            setError("");
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

    return (
        <>
            <div className="grid grid-cols-1 gap-4 m-10 bg-white">
                <div className="">
                    <div className="flex justify-center">
                        <div className="text-center">
                            <h1 className="text-md text-2xl">Release Checklist ({activeQuestionIndex + 1}/{questions.length})</h1>
                        </div>
                    </div>
                </div >
                <div className="bg-white px-10 py-10">
                    {activeQuestion !== undefined ?
                        <div className="mb-4">
                            <label className="block text-gray-700 text-xl font-bold mb-5" htmlFor="purpose">
                                {activeQuestion.question}
                            </label>
                            {activeQuestion.isLongInput ? <textarea
                                className="shadow appearance-none border rounded w-6/12 py-2 px-3 focus:outline-none focus:shadow-outline"
                                id={activeQuestion.id + '-answer'}
                                type="text"
                                placeholder={activeQuestion.placehoder}
                                onInput={updateAnswer}
                                value={answers[activeQuestionIndex]}
                                autoFocus="true"
                                rows={5}
                            /> : <input
                                className="shadow appearance-none border rounded w-6/12 py-2 px-3 focus:outline-none focus:shadow-outline"
                                id={activeQuestion.id + '-answer'}
                                type="text"
                                placeholder={activeQuestion.placehoder}
                                onInput={updateAnswer}
                                value={answers[activeQuestionIndex]}
                                autoFocus="true"
                            />}

                            <div className="mt-5 mb-5">
                                <div className="text-red-500 text-xs italic">{error ? error : " "}</div>
                            </div>
                            <div className="text-center">
                                <button type="button" className=
                                    {isFirstQuestion ? "rounded border border-gray-300 px-3 py-1 text-xl mr-2 cursor-not-allowed bg-gray-200"
                                        : "rounded border border-gray-300 px-3 py-1 text-xl mr-2"}
                                    disabled={isFirstQuestion} onClick={previousQuestion} tabIndex={1}> Prev </button>
                                {!isLastQuestion ?
                                    <button type="button" className=
                                        {isLastQuestion ? "rounded border border-gray-300 px-3 py-1 text-xl mr-2 cursor-not-allowed bg-gray-200"
                                            : "rounded border border-gray-300 px-3 py-1 text-xl mr-2"}
                                        disabled={isLastQuestion} onClick={nextQuestion} tabIndex={0}> Next </button>
                                    : ''}
                                {isLastQuestion ?
                                    <button type="button" className="rounded border border-gray-300 px-3 py-1 text-xl mr-2"
                                        onClick={nextQuestion}> Submit </button>
                                    : ""}
                            </div>
                        </div>
                        : "No questions"}
                </div>
            </div >
        </>
    );
}

export default List;