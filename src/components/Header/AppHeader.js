const AppHeader = () => {
    return (
        <>
            <div className="grid grid-cols-2 border-y-gray-300 border">
                <div className="text-left py-4 px-10">
                    <h2>Deployement Checker</h2>
                </div>
                <div className="text-right py-4 px-10">
                    <button type="button" className="rounded border border-gray-300 px-3 py-1 text-xs">History</button>
                </div>
            </div>
        </>
    );
}

export default AppHeader;