import { useContext } from "react";
import AppContext from "../../context/appcontext";

const AppHeader = () => {
    const context = useContext(AppContext);
    const { setActiveComponent } = context;
    return (
        <>
            <div className="grid grid-cols-2 border-y-gray-300 border">
                <div className="text-left py-4 px-10">
                    <h2 onClick={() => { setActiveComponent('default') }}>Deployement Checker</h2>
                </div>
                <div className="text-right py-4 px-10">
                    <button type="button" className="rounded border border-gray-300 px-3 py-1 text-xs"
                        onClick={() => setActiveComponent('home')}
                    >+ New Release
                    </button>

                    <button type="button" className="ml-5 rounded border border-gray-300 px-3 py-1 text-xs"
                        onClick={() => setActiveComponent('history')}>
                        History
                    </button>
                </div>
            </div>
        </>
    );
}

export default AppHeader;