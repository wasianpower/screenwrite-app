import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Slug from './components/Slug';

const Hello = () => {
  return (
    <div>
      <form>
        <input className="slug" />
        <input className="action" />
      </form>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slug />} />
      </Routes>
    </Router>
  );
}
