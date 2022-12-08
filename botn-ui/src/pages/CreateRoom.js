import React, { useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_INIT_GAME } from '../utilities/constants';
import{ MainButton, StateInput } from '../components/components';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [ name, setName ] = useState("")
    const gameContext = useGameContext();
    const navigate = useNavigate();

    const initGame = () => {
      console.log(name)
      axios.post(
        BOTN_INIT_GAME,
            { memberName: name }
	).then((response) => {
            gameContext.setValue("game", response.data);
            navigate("/lobby");
        });
    }

    return (
      <>
        <div className="main-page">
        <StateInput
            id="name-input"
            title="Your Name"
            stateVar={name}
            setStateVar={setName}
            autoFocus
        />
        </div>
      <MainButton
        text={"Create Room"}
        onClick={initGame}
        disabled={!name}
      />
  </>
    )
}

export default CreateRoom;
