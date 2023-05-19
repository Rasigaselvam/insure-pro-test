import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard/dashboard';

function App() {
  return (
    <div>
        <div className="container mx-auto px-2 max-w-5xl pt-10 md:pt-32">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
