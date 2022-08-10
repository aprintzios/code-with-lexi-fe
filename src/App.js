import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Headliner from './components/Headliner/Headliner';
import Tutoring from './components/Tutoring/Tutoring';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="main-container">
            <Headliner />
            <Tutoring />
          </div>
        } />
      </Routes>

    </div>
  );
}

export default App;
