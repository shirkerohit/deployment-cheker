import { useEffect, useState } from "react";
import { useContext } from "react";
import AppContext from "../../context/appcontext";

const History = () => {

    const context = useContext(AppContext);
    const { setActiveComponent, setSummary } = context;
    const [releaseHistory, setReleaseHistory] = useState([]);

    useEffect(() => {
        let tempHistory = [];
        const existingHistory = localStorage.getItem('release-history');
        console.log(existingHistory);
        if (existingHistory !== null && existingHistory !== undefined) {
            let localHistory = JSON.parse(existingHistory);
            Object.keys(localHistory).forEach((key) => {
                const objectKey = Object.keys(localHistory[key])[0];
                let objectValue = Object.values(localHistory[key])[0];
                objectValue = atob(objectValue);
                tempHistory.push({ [objectKey]: JSON.parse(objectValue) });
            });
        }
        setReleaseHistory(tempHistory);
    }, []);

    const loadSummary = (item) => {
        const answers = Object.values(item)[0]['answers'];
        const savedAt = Object.values(item)[0]['savedAt'];
        // const questions = JSON.stringify(Object.values(item)[0]['questions']);
        setSummary({
            answers: Array.from(answers),
            savedAt: savedAt
        });
        setActiveComponent('summary');
    }

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear the history?')) {
            localStorage.removeItem('release-history');
            setReleaseHistory([]);
            setActiveComponent('home');
        }
    }

    return (
        <>
            <div className="flex justify-center m-10">
                <h1 className="text-2xl font-bold">Release History</h1>
            </div>
            <div className="flex justify-center m-10">
                {releaseHistory.length > 0 ?
                    <table className="table-fixed w-1/2">
                        <thead>
                            <tr>
                                <th>Release No</th>
                                <th>Details</th>
                                <th>Saved At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                releaseHistory.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{Object.keys(item)[0]}</td>
                                            <td>
                                                <button onClick={() => loadSummary(item)} className="text-blue-600 hover:text-blue-800">
                                                    View Details
                                                </button>
                                            </td>
                                            <td>{item[Object.keys(item)[0]]['savedAt'] ?? "-"}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table> :
                    <div className="flex justify-center m-10">
                        404! No History Found
                    </div>
                }
            </div>
            {releaseHistory.length > 0 ?
                <div className="grid grid-cols-1 gap-4 m-10 bg-white">
                    <div className="bg-white px-10 py-10">
                        <button type="button" className="rounded border border-gray-300 px-3 py-1 text-xl mr-2"
                            onClick={() => clearHistory()}> Clear all
                        </button>
                    </div>
                </div>
                : ""}
        </>
    )
}

export default History;