import React, { useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_INIT_GAME } from '../utilities/constants';
import{ MainButton } from '../components/components';

const CreateRoom = () => {
    const [ name, setName ] = useState("")
    const gameContext = useGameContext();

    const initGame = () => {
        axios.post(
        BOTN_INIT_GAME
        ).then((response) => {
            gameContext.setGame(response.data);
        });
    }

    return (
      <div className="main-page">
        <MainButton text={"Create Room"} onClick={initGame}/>
      </div>
    )
}

export default CreateRoom;