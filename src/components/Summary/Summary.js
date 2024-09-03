import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/appcontext";
import allQuestions from "../../context/questions";


const Summary = () => {
    const context = useContext(AppContext);
    const finalSummary = context.summary;

    const questions = allQuestions;
    const answers = finalSummary.answers ?? [];

    const [releaseSummary, setReleaseSummary] = useState("");
    const [releaseNote, setReleaseNote] = useState("");

    const uniqueKey = () => {
        return Math.floor(Math.random() * 1000000) + "-" + new Date().getTime();
    }

    const copyReleaseSummary = () => {
        let stringSummary = questions.map((question, index) => {
            return question.summaryKeyValue + " : " + answers[index] + "\n";
        }).join('');
        setReleaseSummary(stringSummary);
        navigator.clipboard.writeText(stringSummary);
        alert('Copied!');
    }

    const copyReleaseNote = () => {
        let releaseNote = questions.map((question, index) => {
            if (question.isReleaseNoteKey) {
                return question.summaryKeyValue + " : " + answers[index] + "\n";
            }
        }).join('');
        setReleaseNote(releaseNote);
        navigator.clipboard.writeText(releaseNote);
        alert('Copied!');
    }

    const save = () => {

        const storeObject =
        {
            questions: questions,
            answers: answers,
            releaseNote: releaseNote,
            releaseSummary: releaseSummary,
        };

        saveLocalStorage('release-history', storeObject);
        alert('Saved!');
        return;
    }

    const saveLocalStorage = (keyName, value) => {
        let savedValue = JSON.parse(localStorage.getItem(keyName));
        if (savedValue === null || savedValue == []) {
            savedValue = [];
        }

        const keyId = uniqueKey();
        const objectToStore = value;
        const base64Object = btoa(JSON.stringify(objectToStore));

        savedValue.push({ [keyId]: base64Object });
        localStorage.setItem(keyName, JSON.stringify(savedValue));
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
                    <button type="button" className="rounded border border-gray-300 px-3 py-1 text-xs mr-2"
                        onClick={save}> Save </button>
                </div>
            </div>
        </div >
    );
}

export default Summary;