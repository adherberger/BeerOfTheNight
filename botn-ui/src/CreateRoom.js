import React from 'react';
import { useGameContext } from './App';
import axios from 'axios';
import { BOTN_INIT_GAME } from './constants';

const CreateRoom = () => {
    const gameContext = useGameContext();

    const initGame = () => {
        axios.post(
        BOTN_INIT_GAME
        ).then((result) => {
            gameContext.setGame(result.data);
        });
    }

    return (
      <div className="main-page">
        <button className="button-main" onClick={() => { initGame() }}>Create Room</button>
      </div>
    )
}

export default CreateRoom;