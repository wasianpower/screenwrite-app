import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WorkingText from './classes/WorkingText';
import Scene from './components/Scene';
import Slug from './components/Slug';

export default function App() {
  return (
    <div>
      <Scene />
    </div>
  );
}
