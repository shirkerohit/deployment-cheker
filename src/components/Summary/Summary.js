import { useState, useContext } from "react";
import AppContext from "../../context/appcontext";
import allQuestions from "../../context/questions";


const Summary = () => {
    const context = useContext(AppContext);
    const finalSummary = context.summary;

    const questions = allQuestions;
    const answers = finalSummary.answers ?? [];
    const savedAt = finalSummary.savedAt ?? null;

    console.log(finalSummary);

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
        let tempReleaseNote = [];
        questions.map((question, index) => {
            if (question.isReleaseNoteKey) {
                tempReleaseNote.push(question.summaryKeyValue + " : " + answers[index] + "\n");
            }
            return question;
        });
        console.log('tempReelase', tempReleaseNote);
        tempReleaseNote = tempReleaseNote.join('');
        setReleaseNote(tempReleaseNote);
        navigator.clipboard.writeText(tempReleaseNote);
        alert('Copied!');
    }

    const save = () => {

        const storeObject =
        {
            questions: questions,
            answers: answers,
            releaseNote: releaseNote,
            releaseSummary: releaseSummary,
            savedAt: new Date().toUTCString(),
        };

        saveLocalStorage('release-history', storeObject);
        alert('Saved!');
        return;
    }

    const saveLocalStorage = (keyName, value) => {
        let savedValue = JSON.parse(localStorage.getItem(keyName));
        if (savedValue === null || savedValue === undefined || (Array.isArray(savedValue) && savedValue.length <= 0)) {
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
            </div>
            <div className="flex justify-center">
                {savedAt ? <div className="text-center">
                    <h6 className="text-sm">({savedAt}) </h6>
                </div> : ""}
            </div>
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