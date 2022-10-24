import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BOTN_INIT_GAME } from './constants.js'
import { FaBeer, FaBars } from 'react-icons/fa';

function App() {
  const [game, setGame] = useState({});

  console.log(process.env);

  const initGame = () => {
    axios.post(
      BOTN_INIT_GAME
    ).then((result) => {
      setGame(result.data);
    });
  }

  return (
    <div className="App">
      <div className="top-bar">
        <div className="logo"><FaBeer/></div>
        <div className="top-bar-item">Beer Of The Night</div>
        <div className="flex-spacer"/>
        <div className="top-bar-menu top-bar-item">
          <FaBars/>
        </div>
      </div>
      <header className="App-header">
        <div style={{display: "flex", alignItems: "baseline"}}>
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
