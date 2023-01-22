import React, { useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_INIT_GAME } from '../utilities/constants';
import { SecondaryButton, StateInput } from '../components/components';
import { useNavigate } from 'react-router-dom';

// Game creator enters their name and fires off an initGame request to backend.
// Response is stored in game context and consists of gameId, roomCode and memberId.
const CreateRoom = () => {
  const [name, setName] = useState("")
  const gameContext = useGameContext();
  const navigate = useNavigate();

  const initGame = () => {
    console.log(name)
    axios.post(
      BOTN_INIT_GAME,
      { memberName: name }
    ).then((response) => {
      gameContext.setValue("game", {isAdmin: true, ...response.data});
      navigate("/lobby");
    });
  }

  return (
    <div className="main-page">
      <div className="form create-room-form">
        <StateInput
          id="name-input"
          title="Your Name"
          stateVar={name}
          setStateVar={setName}
          autoFocus
        />
        <SecondaryButton
          text={"Create Room"}
          onClick={initGame}
          disabled={!name}
        />
      </div>
    </div>
  )
}

export default CreateRoom;
