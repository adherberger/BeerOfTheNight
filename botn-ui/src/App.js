import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BOTN_INIT_GAME } from './constants.js'

function App() {
  const [game, setGame] = useState(undefined);

  const initGame = () => {
    axios.post(
      BOTN_INIT_GAME
    ).then((result) => {
      setGame(result.data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Beer of the Night</h3>
        {
          game ?
            <>
              <p>{"Game ID: " + game.gameId}</p>
              <p>{"Room Code: " + game.roomCode}</p>
            </>
          : <></>
        }
        <button className="button-main" onClick={() => { initGame() }}>Create Room</button>
      </header>
    </div>
  );
}

export default App;
