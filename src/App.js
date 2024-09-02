import './App.css';
import Checklist from './components/Checklist/Checklist';
import AppHeader from './components/Header/AppHeader';


function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <Checklist></Checklist>
    </div>
  );
}

export default App;
