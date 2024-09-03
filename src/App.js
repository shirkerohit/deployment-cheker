import './App.css';
import Home from './components/Home/Home';
import AppHeader from './components/Header/AppHeader';
import React, { useState } from 'react';

import AppContext from './context/appcontext';

function App() {
  const [activeComponent, setActiveComponent] = useState('default');
  const [summary, setSummary] = useState({
    answers: [],
  });

  return (
    <div className="App">
      <AppContext.Provider value={{ activeComponent, setActiveComponent, summary, setSummary }}>
        <AppHeader></AppHeader>
        <Home></Home>
      </AppContext.Provider>
    </div>
  );
}

export default App;
