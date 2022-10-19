import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BOTN_INIT_GAME } from './constants.js'
import { FaBeer } from 'react-icons/fa';

function App() {
  const [game, setGame] = useState({});

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
        <div style={{display: "flex", alignItems: "baseline"}}>
          <FaBeer/><h3 style={{margin: "0 18px 0 18px"}}>Beer of the Night</h3><FaBeer/>
        </div>
        {
          game.gameId ?
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
