import { Game } from 'the-world-engine-react';
import './App.css';
import { Bootstrapper } from './game/bootstrapper';

export default function App() {
  return <Game bootstrapper={Bootstrapper} handleEvents autoResize />;
}
