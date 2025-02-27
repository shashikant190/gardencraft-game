// src/App.jsx
import React from 'react';
import PhaserGame from './components/PhaserGame';
import './styles/styles.css';

const App = () => {
  return (
    <div className="App">
      {/* <h1>Identify the plant game</h1> */}
      <PhaserGame />
    </div>
  );
};

export default App;
