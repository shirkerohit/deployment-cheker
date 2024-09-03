import { useContext } from "react";

import AppContext from "../../context/appcontext";
import List from "../List/List";
import Summary from "../Summary/Summary";
import History from "../History/History";

const Home = () => {

    const context = useContext(AppContext);

    const { activeComponent } = context;

    return (
        <>
            <div className="grid text-center mt-5">
                {
                    (() => {
                        if (activeComponent.toLowerCase() === 'home') {
                            return (<List></List>)
                        }
                        else if (activeComponent.toLowerCase() === 'history') {
                            return <History></History>
                        }
                        else if (activeComponent.toLowerCase() === 'summary') {
                            return <Summary></Summary>
                        }
                        else {
                            return (<div className="h-80 grid grid-cols-1 gap-4 content-center">
                                <h4 className="text-2xl">Click "New Release" to start!</h4>
                            </div>)
                        }
                    })()
                }
            </div>
        </>
    );
}

export default Home;