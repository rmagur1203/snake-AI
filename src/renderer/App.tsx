import { Game } from 'the-world-engine-react';
import Bootstrapper from './game/bootstrapper';
import './App.css';

export default function App() {
  return <Game bootstrapper={Bootstrapper} handleEvents autoResize />;
}
