import { Route, Routes } from 'react-router';
import Home from './components/Home/Home.jsx';
import TrackForm from './components/TrackForm/TrackForm.jsx';
import './App.css';


const App = () => {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-track" element={<TrackForm />} />
          <Route path="/edit-track/:trackId" element={<TrackForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
